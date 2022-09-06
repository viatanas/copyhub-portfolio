const Input = ({ label, value, placeholder, onChangeHandler }) => {
  return (
    <div className="flex flex-col w-full space-y-2">
      <span className="text-sm font-light text-gray-900 font-inter">
        {label}
      </span>
      <input
        placeholder={placeholder}
        onChange={(e) => onChangeHandler(e)}
        value={value}
        className="w-full px-4 py-3 text-sm font-light text-gray-900 bg-gray-900 rounded-lg outline-none font-inter bg-opacity-5"
      />
    </div>
  );
};

export default Input;
