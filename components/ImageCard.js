// Absolute imports
import Image from "next/image";
import { ArrowUp, ArrowDown } from "iconoir-react";

const ImageCard = ({
  image,
  images,
  index,
  moveImageUp,
  moveImageDown,
  deleteImage,
  theme,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center justify-start space-x-6">
        {/* Image */}
        <div
          className={`flex items-center justify-center w-16 h-auto p-4 rounded ${theme}`}
        >
          <div className="w-full h-auto">
            <img src={image.url} />
          </div>
        </div>
        <div className="flex flex-col items-start w-9/12 space-y-1 ">
          <span className="w-full text-sm font-normal text-gray-900 truncate font-inter">
            {image.title}
          </span>
          <button
            onClick={() => deleteImage(image.url)}
            className="text-sm font-light text-gray-500 font-inter hover:text-gray-700"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {index !== 0 && (
          <button onClick={() => moveImageUp(index)}>
            <ArrowUp className="w-4 h-4 text-gray-400 hover:text-gray-700" />
          </button>
        )}
        {index !== images.length - 1 && (
          <button onClick={() => moveImageDown(index)}>
            <ArrowDown className="w-4 h-4 text-gray-400 hover:text-gray-700" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
