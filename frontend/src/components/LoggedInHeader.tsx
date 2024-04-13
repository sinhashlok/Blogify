import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Prop {
  handleModalClick?: () => void;
}

const LoggedInHeader: React.FC<Prop> = ({ handleModalClick }) => {
  interface userData {
    fullName: string;
    userName: string;
  }
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<userData>();
  useEffect(() => {
    const fullName = localStorage.getItem("fullName");
    const userName = localStorage.getItem("userName");

    setUserDetails({
      fullName: fullName || "",
      userName: userName || "",
    });
  }, []);

  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div className="px-8 py-4 flex flex-row items-center justify-between">
      <div className="font-bebasNeue text-2xl md:text-3xl lg:text-4xl">
        <Link to="/dashboard">Blogify</Link>
      </div>
      <div className="text-md lg:text-lg font-poppins flex flex-row items-center">
        <div
          className="hover:bg-black hidden md:flex hover:text-white rounded-full px-3 py-2 text-sm mr-4 cursor-pointer border-2 border-black"
          onClick={handleModalClick}
        >
          Add Blog
        </div>
        <div
          className="hover:bg-black flex md:hidden hover:text-white rounded-full px-2 py-1 text-sm mr-4 cursor-pointer border-2 border-black"
          onClick={handleModalClick}
        >
          +
        </div>
        <div className="text-xl underline hidden md:flex">
          {userDetails?.fullName}
        </div>
        <div className="ml-4">
          <button
            className="border-2 border-black rounded-lg py-2 px-3 hover:text-white hover:bg-black"
            onClick={handleClick}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoggedInHeader;
