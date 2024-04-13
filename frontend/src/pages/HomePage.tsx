import Header from "../components/Header";
import heroImg from "../assets/blog-homepage.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import checkLoggedIn from "../hooks/useCheckLoggedIn";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const loggedIn: boolean = checkLoggedIn();
    if (loggedIn) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div>
      <Header code={0} />
      <div className="mx-8 lg:mx-24 font-poppins">
        <div className="flex flex-col-reverse mt-32 lg:mt-0 md:flex-row justify-between">
          <div className="align-middle my-auto">
            <h1 className="text-5xl mt-12 lg:mt-0 lg:text-8xl font-bebasNeue">
              Blogify
            </h1>
            <h2 className="text-xl">
              A Page for those who want to write and share their experiences
            </h2>
            <button className="mt-6 text-lg border-2 border-black rounded-lg py-2 px-3 text-white bg-black">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
          <div className="hidden md:flex">
            <img src={heroImg} width={900} alt="hero-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
