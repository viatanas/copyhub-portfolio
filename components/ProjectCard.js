// Absolute imports
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";

const ProjectCard = ({
  images,
  contentType,
  title,
  client,
  industry,
  projectId,
  slug,
  theme,
  page,
}) => {
  const router = useRouter();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    page &&
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(page.content)))
      );
  }, []);

  return (
    <button
      onClick={() => router.push(`/p/${slug}/projects/${projectId}`)}
      className="flex flex-col w-full overflow-hidden border border-gray-200 rounded-lg "
    >
      <div
        className={`flex items-center justify-center w-full p-8 overflow-hidden h-52 lg:h-80 ${theme} relative overflow-hidden`}
      >
        {/* If there are images, preview the first image */}
        {images.length > 0 && (
          <div className="w-full lg:w-10/12 h-5/6">
            <img className="rounded" src={images[0].url} />
          </div>
        )}

        {/* If there are no images, preview the page with the content inside   */}
        {images.length < 1 && (
          <div className="absolute bottom-0 w-10/12 overflow-hidden bg-white rounded-tl-lg rounded-tr-lg lg:w-9/12 h-5/6">
            <div className="flex items-center justify-start w-full h-4 px-2 space-x-1 bg-gray-100 border-b border-gray-200 ">
              <div className="w-[5px] h-[5px] bg-red-500 rounded-full"></div>
              <div className="w-[5px] h-[5px] rounded-full bg-amber-500"></div>
              <div className="w-[5px] h-[5px] bg-green-500 rounded-full"></div>
            </div>
            <div className="flex flex-col items-start w-full px-8 pt-6 space-y-4 lg:px-10 ">
              <span className="flex flex-wrap text-xs font-normal text-left text-gray-900 font-inter">
                {page.title}
              </span>
              <div className="w-full h-auto overflow-hidden editor-illustration-md">
                <Editor editorState={editorState} readOnly />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col items-start w-full p-4 border-t border-gray-200">
        <div className="px-2 py-1 text-xs font-light text-gray-900 bg-gray-900 rounded-md font-inter bg-opacity-5 w-max">
          {contentType}
        </div>
        <span className="mt-4 text-sm font-light text-left text-gray-900 font-inter">
          {title}
        </span>
        <div className="flex items-center mt-2 space-x-2 text-sm font-light text-gray-400 font-inter">
          <span>{client}</span>
          <span>·</span>
          <span>{industry}</span>
        </div>
      </div>
    </button>
  );
};

export default ProjectCard;
