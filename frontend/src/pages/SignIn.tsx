import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Components
import Header from "../components/Header";
import Heading from "../components/FormComponent/Heading";
import InputForm from "../components/FormComponent/InputForm";
import SubHeading from "../components/FormComponent/SubHeading";
import Footer from "../components/FormComponent/Footer";
// Config
import { ERROR_CODE } from "../utils/config";
import checkLoggedIn from "../hooks/useCheckLoggedIn";

const SignIn = () => {
  type requestType = {
    username: string;
    password: string;
  };

  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedIn: boolean = checkLoggedIn();
    if (loggedIn) {
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

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
      } else {
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
            label="UserName"
            placeholderText="Enter User Name"
            onChange={(e: any) => {
              setUserName(e.target.value);
            }}
          />
          <InputForm
            label="Password"
            placeholderText="Enter Password"
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="submit"
            className="mt-6 w-full rounded-md text-lg text-white font-semibold bg-green-400 px-8 py-2"
          >
            Submit
          </button>
          <Footer text="Don't have an account?" code={1} />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
