// Absolute imports
import { Listbox } from "@headlessui/react";
import { NavArrowDown } from "iconoir-react";

const Dropdown = ({ value, list, onChangeHandler, label }) => {
  return (
    <div className="relative flex flex-col w-full">
      <span className="text-sm font-light text-gray-900 font-inter">
        {label}
      </span>
      <Listbox value={value} onChange={onChangeHandler}>
        <Listbox.Button className="flex items-center justify-between w-full px-4 py-3 mt-2 bg-gray-900 rounded-lg outline-none bg-opacity-5">
          {value ? (
            <span className="text-sm font-light text-gray-900 font-inter">
              {value}
            </span>
          ) : (
            <span className="text-sm font-light text-gray-400 font-inter">
              Select type
            </span>
          )}
          <NavArrowDown className="w-4 h-4 text-gray-500" />
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 w-full p-1 mt-3 bg-white border border-gray-200 rounded-lg top-16">
          {list.map((item) => (
            <Listbox.Option
              key={item}
              value={item}
              className="flex items-center justify-between w-full px-2 py-3 text-sm font-light text-gray-900 rounded cursor-pointer font-inter hover:bg-gray-900 hover:bg-opacity-5"
            >
              {item}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default Dropdown;
