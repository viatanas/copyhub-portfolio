// Imports
import themes from "data/themes";

const ThemeSelection = ({ handleThemeChange, selectedTheme }) => {
  return (
    <div className="flex flex-col w-full mt-6">
      <span className="text-sm font-light text-gray-900 font-inter">Theme</span>

      {/* Buttons */}
      <div className="flex items-center mt-4 space-x-2">
        {themes.map((theme, index) => (
          <button
            onClick={() => handleThemeChange(theme)}
            key={index}
            className={`w-6 h-6 ${theme} rounded-md ${
              selectedTheme === theme && "ring-1 ring-offset-2 ring-gray-900"
            }`}
          ></button>
        ))}
      </div>

      {/* Image Preview */}
      <div
        className={`flex items-end justify-center w-full mt-5  rounded-lg ${selectedTheme} h-80`}
      >
        <div className="flex flex-col w-9/12 overflow-hidden bg-white rounded-tl-lg rounded-tr-lg h-5/6">
          <div className="flex justify-start w-full p-2 space-x-1 bg-gray-200 bg-opacity-50 border-b boder-gray-200">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex flex-col items-start w-full px-10 mt-10">
            <div className="w-3/6 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-5/6 h-2 mt-3 bg-gray-200 rounded-full"></div>
            <div className="w-11/12 h-32 mt-6 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelection;
