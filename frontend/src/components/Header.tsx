import { Link } from "react-router-dom";

interface Prop {
  code: number;
}

const Header: React.FC<Prop> = ({ code }) => {
  return (
    <div className="px-8 py-4 flex flex-row items-center justify-between">
      <div className="font-bebasNeue text-2xl md:text-3xl lg:text-4xl">
        <Link to="/">Blogify</Link>
      </div>
      <div className="text-md lg:text-lg font-poppins">
        {code === 0 ? (
          <>
            <Link to="/signin" className="mr-8 hover:underline">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="border-2 border-black rounded-lg py-2 px-3 hover:text-white hover:bg-black"
            >
              Sign Up
            </Link>
          </>
        ) : code === 1 ? (
          <Link to="/signup" className="underline">
            Sign Up
          </Link>
        ) : (
          <Link to="/signin" className="underline">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
