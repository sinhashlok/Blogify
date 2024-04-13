interface Prop {
  label: string;
  placeholderText: string;
  onChange: any;
}

const InputForm: React.FC<Prop> = ({ label, placeholderText, onChange }) => {
  return (
    <div className="py-2">
      <div className="text-sm mb-1">{label}</div>
      <input
        onChange={onChange}
        className="w-full p-2 rounded-md border-2 border-gray-300 placeholder:text-sm outline-red-400"
        placeholder={placeholderText}
      />
    </div>
  );
};

export default InputForm;
