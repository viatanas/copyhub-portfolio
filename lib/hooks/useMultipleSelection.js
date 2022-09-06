// Absolute imports
import { useState } from "react";

const useMultipleSelection = (initialValue) => {
  const [selection, setSelection] = useState(initialValue);

  const add = (value) => {
    setSelection((oldArray) => [...oldArray, value]);
  };

  const remove = (value) => {
    let filteredArray = selection.filter((item) => item !== value);
    setSelection(filteredArray);
  };

  return [selection, setSelection, add, remove];
};

export default useMultipleSelection;
