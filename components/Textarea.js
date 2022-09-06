const Textarea = ({
  label,
  value,
  placeholder,
  maxLength,
  onChangeHandler,
}) => {
  return (
    <div className="flex flex-col w-full space-y-2">
      <span className="text-sm font-light text-gray-900 font-inter">
        {label}
      </span>
      <textarea
        maxLength={maxLength}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChangeHandler(e)}
        className="w-full p-4 text-sm font-light text-gray-900 bg-gray-900 rounded-lg outline-none resize-none h-28 font-inter bg-opacity-5"
      />
    </div>
  );
};

export default Textarea;
