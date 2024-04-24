import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Components
import Header from "../components/Header";
import Heading from "../components/Heading";
import InputForm from "../components/InputForm";
import SubHeading from "../components/SubHeading";
import Footer from "../components/Footer";
// Config
import { ERROR_CODE, resType } from "../utils/config";
import checkLoggedIn from "../hooks/useCheckLoggedIn";
import { checkSignUpValidation } from "../utils/validate";
import { resType as ErrorType, INPUT_FORM_CODE } from "../utils/config";

type requestType = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [formError, setFromError] = useState<ErrorType>({
    mssg: "",
    errorCode: 0,
  });
  const [formFail, setFormFail] = useState<resType>({
    mssg: "",
    errorCode: 0,
  });

  useEffect(() => {
    const loggedIn: boolean = checkLoggedIn();
    if (loggedIn) {
      navigate("/dashboard");
    }
  }, []);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const validateForm: resType = checkSignUpValidation({
      firstName,
      lastName,
      userName,
      password,
    });
    if (validateForm.errorCode !== 0) {
      setFromError(validateForm);
      return;
    }

    async function fetchData() {
      const reqBody: requestType = {
        username: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
      };

      const response: Response = await fetch(
        "http://localhost:8000/blogify/user/signup",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }
      );
      const json = await response.json();
      if (json.errorCode !== ERROR_CODE.Success) {
        console.log(json.message, json.errorCode);
        setFormFail({ mssg: json.message, errorCode: 1 });
      } else {
        localStorage.setItem("token", json.token);
        localStorage.setItem("fullName", firstName + " " + lastName);
        localStorage.setItem("userName", userName);
        navigate("/dashboard");
      }
    }
    fetchData();
  };

  return (
    <div className="w-full">
      <Header code={2} />
      <div className="mx-8 pt-20 sm:mx-auto md:w-2/3 lg:w-1/4 md:pt-24 lg:pt-32 font-poppins">
        <form
          className="border-2 border-black py-8 px-6 rounded-xl"
          onSubmit={handleSubmit}
        >
          <Heading title="Sign Up" />
          <SubHeading title="Create a new account" />
          <InputForm
            id={1}
            type="text"
            label="First Name"
            placeholderText="Enter First Name"
            onChange={(e: any) => {
              setFirstName(e.target.value);
            }}
            onClick={() => {}}
            error={formError}
          />
          <InputForm
            id={2}
            type="text"
            label="Last Name"
            placeholderText="Enter Last Name"
            onChange={(e: any) => {
              setLastName(e.target.value);
              setFromError({ mssg: "", errorCode: 0 });
            }}
            onClick={() => {}}
            error={formError}
          />
          <InputForm
            id={3}
            label="UserName"
            type="text"
            placeholderText="Enter User Name"
            onChange={(e: any) => {
              setUserName(e.target.value);
              setFromError({ mssg: "", errorCode: 0 });
            }}
            onClick={() => {}}
            error={formError}
          />
          <InputForm
            id={4}
            label="Password"
            type={showPassword ? "password" : "text"}
            placeholderText="Enter Password"
            onChange={(e: any) => {
              setPassword(e.target.value);
              setFromError({ mssg: "", errorCode: 0 });
            }}
            onClick={handleClick}
            isPasswordField={showPassword}
            error={formError}
          />
          <button
            type="submit"
            className="mt-6 w-full rounded-md text-lg text-white font-semibold bg-green-400 px-8 py-2"
          >
            Submit
          </button>
          {formFail.errorCode === 1 && (
            <div className="text-center mt-4 font-bold text-red-500">
              {formFail.mssg}
            </div>
          )}
          <Footer text="Already have an account?" code={2} />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
