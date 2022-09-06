const Tag = ({ service }) => {
  return (
    <div className="flex items-center h-6 px-3 mt-3 mr-4 -ml-2 text-sm font-light text-gray-700 bg-gray-900 rounded-md bg-opacity-5 font-inter">
      {service}
    </div>
  );
};

export default Tag;
