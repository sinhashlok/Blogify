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
import { resType as ErrorType } from "../utils/config";
import { checkSignInValidation } from "../utils/validate";

const SignIn = () => {
  type requestType = {
    username: string;
    password: string;
  };

  const navigate = useNavigate();
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
    const validateForm: resType = checkSignInValidation({
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
      };

      const response = await fetch(
        "http://localhost:8000/blogify/user/signin",
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
        setFormFail({ mssg: "", errorCode: 0 });
        localStorage.setItem("token", json.token);
        localStorage.setItem(
          "fullName",
          json.user.firstName + " " + json.user.lastName
        );
        localStorage.setItem("userName", json.user.username);
        navigate("/dashboard");
      }
    }
    fetchData();
  };

  return (
    <div className="w-full">
      <Header code={1} />
      <div className="mx-8 pt-20 sm:mx-auto md:w-2/3 lg:w-1/4 md:pt-32 lg:pt-40 font-poppins">
        <form
          className="border-2 border-black py-8 px-6 rounded-xl"
          onSubmit={handleSubmit}
        >
          <Heading title="Sign In" />
          <SubHeading title="Login to your account" />
          <InputForm
            id={3}
            type="text"
            label="UserName"
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
            type={showPassword ? "password" : "text"}
            label="Password"
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
          <Footer text="Don't have an account?" code={1} />
          {formFail.errorCode === 1 && (
            <div className="text-center mt-4 font-bold text-red-500">
              {formFail.mssg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
