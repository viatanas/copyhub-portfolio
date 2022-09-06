// Absolute Imports
import Image from "next/image";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

// Components
import Input from "../Input";

// Other imports
import useInput from "lib/hooks/useInput";

const UploadImageDialog = ({ isOpen, closeDialog, addImage, theme }) => {
  const [file, setFile] = useState();
  const [title, setTitle, handleTitleChange] = useInput();
  const fileInput = useRef();

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile({
        blob: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      return;
    }
  };

  const saveImage = () => {
    addImage({ title, blob: file.blob, url: file.url });
    setFile();
    setTitle();
    closeDialog();
  };

  return (
    <Transition
      as={Fragment}
      show={isOpen}
      enter="ease-out duration-100"
      enterFrom="opacity-10"
      enterTo="opacity-100"
      leave="ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog
        open={isOpen}
        onClose={() => null}
        className="fixed inset-0 z-40 overflow-y-auto"
      >
        <div className="flex items-center justify-center h-full mx-2 lg:h-screen lg:my-0">
          <Dialog.Overlay className="fixed inset-0 z-20 bg-gray-900 opacity-30" />
          <div className="relative z-50 flex flex-col w-full max-w-lg p-6 bg-white lg:p-8 rounded-2xl">
            <Input
              placeholder="My Great Project"
              label="Title *"
              onChangeHandler={handleTitleChange}
            />

            {/* Empty container */}
            <div className="flex flex-col w-full mt-10">
              <span className="text-sm font-light text-gray-900 font-inter">
                Image *
              </span>
              {!file && (
                <button
                  onClick={() => fileInput.current.click()}
                  className="flex items-center justify-center w-full mt-2 border-2 border-gray-200 border-dashed rounded-lg h-80 hover:border-gray-300 group"
                >
                  <span className="text-sm font-light text-gray-500 font-inter group:text-gray-700">
                    Add jpg, png, or svg file
                  </span>
                </button>
              )}
              {file && (
                <div
                  className={`flex items-center justify-center w-full p-10 mt-2 overflow-hidden h-96 ${theme} rounded`}
                >
                  <div className="w-full h-full overflow-hidden">
                    <img
                      className="object-contain w-full h-full rounded"
                      src={file.url}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}

            <div className="flex justify-between w-full mt-10">
              <>
                <button
                  onClick={() => fileInput.current.click()}
                  className="flex items-center h-8 px-3 text-sm font-light text-gray-900 border border-gray-200 rounded-lg font-inter hover:border-gray-300"
                >
                  Upload
                </button>
                <input
                  onChange={(e) => handleFileChange(e)}
                  ref={fileInput}
                  type="file"
                  className="hidden"
                />
              </>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    closeDialog();
                    setFile();
                    setTitle();
                  }}
                  className="text-sm font-light text-gray-500 font-inter hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => saveImage()}
                  className={`${
                    (!title || !file) && "opacity-50 pointer-events-none"
                  } flex items-center h-8 px-3 text-sm font-light text-gray-900 border border-gray-200 rounded-lg font-inter hover:border-gray-300`}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UploadImageDialog;
