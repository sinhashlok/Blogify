import { Link } from "react-router-dom";

interface Prop {
  text: string;
  code: number;
}

const Footer: React.FC<Prop> = ({ text, code }) => {
  return (
    <div className="mt-3 text-sm text-center font-semibold">
      {text}{" "}
      {code === 1 ? (
        <Link className="text-blue-600 underline " to="/signup">
          Sign Up
        </Link>
      ) : (
        <Link className="text-blue-600 underline" to="/signin">
          Sign In
        </Link>
      )}
    </div>
  );
};

export default Footer;
