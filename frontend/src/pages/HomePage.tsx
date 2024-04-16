import Header from "../components/Header";
import heroImg from "../assets/blog-homepage.jpg";
import secureImg from "../assets/secure.jpg";
import community from "../assets/community.jpg";
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
      <div className="mx-8 lg:mx-24 font-poppins pb-24">
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
        <div className="mt-32 flex flex-col md:flex-row justify-evenly">
          <div className="border-2 mb-8 md:mb-0 border-slate-300 p-4 pb-8 rounded-lg w-[300px] flex flex-col justify-between">
            <img src={secureImg} width={256} alt="secure-img" />
            <div>
              <div className="text-2xl font-bold text-center">
                Completely Secure
              </div>
              <div className="mt-2 text-center">
                Trust us with your data. We follow the latest standards and give
                highest care to your information.
              </div>
            </div>
          </div>
          <div className="border-2 mb-8 md:mb-0 border-slate-300 p-4 pb-8 rounded-lg w-[300px] flex flex-col justify-between">
            <img src={community} width={256} alt="secure-img" />
            <div>
              <div className="text-2xl font-bold text-center">
                Great Community
              </div>
              <div className="mt-2 text-center">
                We have a large community that helps you to grow by giving
                valuable feedback and share your exprience.
              </div>
            </div>
          </div>
          <div className="border-2 mb-8 md:mb-0 border-slate-300 p-4 pb-8 rounded-lg w-[300px] flex flex-col justify-between">
            <img src={secureImg} width={256} alt="secure-img" />
            <div>
              <div className="text-2xl font-bold text-center">
                Completely Secure
              </div>
              <div className="mt-2 text-center">
                Trust us with your data. We follow the latest standards and give
                highest care to your information.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
