const SettingsTag = ({ services, tag, addService, removeService }) => {
  if (services?.includes(tag)) {
    return (
      <button
        onClick={() => removeService(tag)}
        className="flex items-center px-4 mt-3 ml-2 text-sm font-light text-gray-900 bg-gray-900 border border-gray-900 border-opacity-0 rounded-lg bg-opacity-5 font-inter h-7 "
      >
        {tag}
      </button>
    );
  } else {
    return (
      <button
        onClick={() => addService(tag)}
        className="flex items-center px-4 mt-3 ml-2 text-sm font-light text-gray-900 border border-gray-200 rounded-lg font-inter h-7 hover:border-gray-300"
      >
        {tag}
      </button>
    );
  }
};

export default SettingsTag;
