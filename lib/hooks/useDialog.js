// Absolute imports
import { useState } from "react";

const useDialog = (initialValue) => {
  const [dialog, setDialog] = useState(initialValue);

  const openDialog = () => {
    setDialog(true);
  };

  const closeDialog = () => {
    setDialog(false);
  };

  return [dialog, openDialog, closeDialog];
};

export default useDialog;
