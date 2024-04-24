import errorMssg from "../hooks/useFormError";
import { resType as ErrorType, INPUT_FORM_CODE } from "../utils/config";
interface Prop {
  id: number;
  type: string;
  label: string;
  placeholderText: string;
  onChange: any;
  onClick: () => void;
  isPasswordField?: boolean;
  error: ErrorType;
}

const InputForm: React.FC<Prop> = ({
  id,
  type,
  label,
  placeholderText,
  onChange,
  onClick,
  isPasswordField,
  error,
}) => {
  const errorString = errorMssg(error, id);

  return (
    <div className="md:py-2">
      <div className="text-sm md:mb-1">{label}</div>
      <input
        type={type}
        onChange={onChange}
        className={`w-full p-2 rounded-md border-2 border-gray-300 placeholder:text-sm outline-red-400
        ${error.errorCode !== 0 && errorString !== "" && ` border-red-500 `}`}
        placeholder={placeholderText}
      />
      { isPasswordField !== undefined && (
        <span
          className="flex justify-end text-sm underline cursor-pointer"
          onClick={onClick}
        >
          {isPasswordField ? "Show" : "Hide"} password
        </span>
      )}
      <div className="text-[10px] mt-1">{errorString}</div>
    </div>
  );
};

export default InputForm;
