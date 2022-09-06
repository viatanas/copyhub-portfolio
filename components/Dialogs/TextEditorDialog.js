// Absolute Imports
import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Editor, RichUtils } from "draft-js";
import { ArrowLeft } from "iconoir-react";
import TextareaAutosize from "react-textarea-autosize";

// Component imports
import EditorInlineStyleButton from "@/components/Buttons/EditorInlineStyleButton";
import EditorBlockStyleButton from "@/components/Buttons/EditorBlockStyleButton";

// Util imports
import inlineStyles from "data/inlineStyles";
import blockStyles from "data/blockStyles";

const TextEditorDialog = ({
  isOpen,
  closeDialog,
  title,
  handleTitleChange,
  editorState,
  setEditorState,
  saveEditorContent,
}) => {
  const editorHasText = editorState.getCurrentContent().hasText();

  // Current inline style
  const currentInlineStyle = editorState.getCurrentInlineStyle();

  // Current block style
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  // Toggle inline style
  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  // Toggle block style
  const toggleBlockStyle = (style) => {
    setEditorState(RichUtils.toggleBlockType(editorState, style));
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
          <div className="relative z-50 flex flex-col w-full max-w-3xl overflow-hidden bg-white rounded-2xl">
            {/* Toolbar */}
            <section className="absolute top-0 z-20 flex w-full bg-white border-b border-gray-100 ">
              <button
                onClick={() => closeDialog()}
                className="flex items-center h-12 px-3 border-r border-gray-200 lg:px-4 "
              >
                <ArrowLeft className="w-5 h-5 text-gray-900" />
              </button>

              {/* Block Style Buttons */}
              {blockStyles.map((style) => (
                <EditorBlockStyleButton
                  key={style.label}
                  label={style.label}
                  blockType={blockType}
                  toggleStyle={toggleBlockStyle}
                  Icon={style.Icon}
                />
              ))}

              {/* Inline Style Buttons */}
              {inlineStyles.map((style) => (
                <EditorInlineStyleButton
                  key={style.label}
                  label={style.label}
                  currentInlineStyle={currentInlineStyle}
                  toggleStyle={toggleInlineStyle}
                  Icon={style.Icon}
                />
              ))}
            </section>

            {/* Editor */}
            <section className="w-8/12 h-[600px] mt-12 pt-12 m-auto flex flex-col space-y-4 pb-28 overflow-scroll scrollbar-none">
              <div className="w-full">
                <TextareaAutosize
                  value={title}
                  onChange={(e) => {
                    handleTitleChange(e);
                  }}
                  className="w-full text-xl font-normal text-gray-900 outline-none resize-none font-inter"
                  placeholder="Your Great Copy"
                />
              </div>
              <div className="w-full h-auto editor">
                <Editor
                  placeholder="Type something..."
                  editorState={editorState}
                  onChange={setEditorState}
                />
              </div>
            </section>

            <footer className="absolute bottom-0 z-20 flex justify-end w-full p-3 space-x-4 border-t border-gray-200 backdrop-blur bg-white/70">
              <button
                onClick={() => closeDialog()}
                className="text-sm font-light text-gray-500 font-inter hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => saveEditorContent()}
                className={`${
                  !editorHasText && "opacity-50 pointer-events-none"
                } flex items-center h-8 px-4 text-sm font-light text-gray-900 border border-gray-200 rounded-lg font-inter hover:border-gray-300`}
              >
                Save
              </button>
            </footer>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TextEditorDialog;
