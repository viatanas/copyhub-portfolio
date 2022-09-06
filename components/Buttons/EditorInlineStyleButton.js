const EditorInlineStyleButton = ({
  toggleStyle,
  currentInlineStyle,
  Icon,
  label,
}) => {
  return (
    <button
      onClick={() => toggleStyle(label)}
      className={`${
        currentInlineStyle.has(label) && "bg-gray-900 bg-opacity-5"
      } flex items-center h-12 px-3 lg:px-4 border-r border-gray-200`}
    >
      <div className={Icon.props.className}>{Icon}</div>
    </button>
  );
};

export default EditorInlineStyleButton;
