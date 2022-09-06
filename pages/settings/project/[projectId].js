// Absolute imports
import Head from "next/head";
import { useState, useEffect } from "react";
import { LongArrowUpLeft, Plus } from "iconoir-react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/router";
import {
  Editor,
  EditorState,
  convertFromRaw,
  convertToRaw,
  ContentState,
} from "draft-js";
import noookies from "nookies";

// Component imports
import Nav from "@/components/Navs/NavPrimary";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Dropdown from "@/components/Dropdown";
import UploadImageDialog from "@/components/Dialogs/UploadImageDialog";
import TextEditorDialog from "@/components/Dialogs/TextEditorDialog";
import ImageCard from "@/components/ImageCard";

// Other imports
import useInput from "lib/hooks/useInput";
import useDialog from "lib/hooks/useDialog";
import industries from "data/industries";
import contentTypes from "data/contentTypes";
import { firebaseAdmin } from "firebaseAdmin";

const EditProject = ({ currentUser }) => {
  const router = useRouter();
  const { projectId } = router.query;

  // Data States
  const [user, setUser] = useState();
  const [title, setTitle, handleTitleChange] = useInput();
  const [client, setClient, handleClientChange] = useInput();
  const [brief, setBrief, handleBriefChange] = useInput();
  const [industry, setIndustry] = useState();
  const [contentType, setContentType] = useState();
  const [images, setImages] = useState([]);
  const [pageTitle, setPageTitle, handlePageTitleChange] = useInput();

  // Other states
  const [primaryEditor, setPrimaryEditor] = useState(() =>
    EditorState.createEmpty()
  );

  const [readOnlyEditor, setReadOnlyEditor] = useState(() =>
    EditorState.createEmpty()
  );
  const [uploadImageDialog, openUploadImageDialog, closeUploadImageDialog] =
    useDialog(false);
  const [textEditorDialog, openTextEditorDialog, closeTextEditorDialog] =
    useDialog(false);
  const [loading, setLoading] = useState(false);

  // Varaibles
  const pageExists = pageTitle || readOnlyEditor.getCurrentContent().hasText();
  const fieldsAreFilled =
    title &&
    client &&
    industry &&
    contentType &&
    brief &&
    (pageExists || images.length > 0);

  useEffect(() => {
    if (!router.isReady) return;

    const fetchData = async () => {
      const res = await fetch(`/api/projects/${projectId}`);
      const { error, message, data } = await res.json();
      const { project } = data;

      setTitle(project.title);
      setClient(project.client);
      setBrief(project.brief);
      setIndustry(project.industry);
      setContentType(project.contentType);
      setImages(project.images);
      setPageTitle(project.page.title);

      setReadOnlyEditor(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(project.page.content))
        )
      );

      setPrimaryEditor(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(project.page.content))
        )
      );

      setUser(project.user);
    };

    fetchData();
  }, [router.isReady]);

  // Image Functions
  const addImage = (image) => {
    setImages((oldArray) => [...oldArray, image]);
  };

  const moveImageUp = (index) => {
    const temp = images;
    const imageToMove = temp[index];
    temp[index] = temp[index - 1];
    temp[index - 1] = imageToMove;

    setImages([]);
    temp.map((item) => setImages((oldArray) => [...oldArray, item]));
  };

  const moveImageDown = (index) => {
    const temp = images;
    const imageToMove = temp[index];
    temp[index] = temp[index + 1];
    temp[index + 1] = imageToMove;

    setImages([]);
    temp.map((item) => setImages((oldArray) => [...oldArray, item]));
  };

  const deleteImage = (url) => {
    setImages(images.filter((image) => image.url !== url));
  };

  const saveEditorContent = () => {
    const content = primaryEditor.getCurrentContent();
    setReadOnlyEditor(EditorState.createWithContent(content));

    closeTextEditorDialog();
  };

  const onDeletePage = () => {
    setPrimaryEditor(
      EditorState.push(primaryEditor, ContentState.createFromText(""))
    );
    setReadOnlyEditor(
      EditorState.push(readOnlyEditor, ContentState.createFromText(""))
    );
    setPageTitle();
  };

  // Project Functions
  const deleteProject = async () => {
    setLoading(true);
    await fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
    });

    toast.success("Project deleted!");
    router.push(`/p/${user.username}`);
    setLoading(false);
  };

  const updateProject = async () => {
    setLoading(true);

    let formData = new FormData();
    let temp = [];

    for (const object of images) {
      if (object.blob) {
        formData.append("image", object.blob);
        const res = await fetch(`/api/upload-image`, {
          method: "POST",
          body: formData,
        });
        const { url } = await res.json();

        temp.push({ title: object.title, url });
      } else {
        temp.push({ title: object.title, url: object.url });
      }
    }

    // Transform editor content
    const pageContent = readOnlyEditor.getCurrentContent();
    const rawPageContent = JSON.stringify(convertToRaw(pageContent));

    const body = {
      title,
      client,
      industry,
      contentType,
      brief,
      images: temp,
      page: { title: pageTitle, content: rawPageContent },
    };

    await fetch(`/api/projects/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    toast.success("Project updated!");
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen">
      <Head>
        <title>Copyhub - Edit Project</title>
        <meta name="description" content="Copyhub - New Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Back */}
      <button
        onClick={() => router.push(`/p/${user.username}/projects/${projectId}`)}
        className="absolute p-1 rounded-md lg:fixed top-20 left-4 hover:bg-gray-900 hover:bg-opacity-5 group"
      >
        <LongArrowUpLeft className="w-6 h-6 text-gray-400 group-hover:text-gray-900" />
      </button>

      <Toaster position="bottom-center" />
      <Nav slug="settings" currentUser={currentUser} />

      <aside>
        <UploadImageDialog
          isOpen={uploadImageDialog}
          closeDialog={closeUploadImageDialog}
          addImage={addImage}
          theme={user?.theme}
        />
        <TextEditorDialog
          isOpen={textEditorDialog}
          closeDialog={closeTextEditorDialog}
          title={pageTitle}
          handleTitleChange={handlePageTitleChange}
          editorState={primaryEditor}
          setEditorState={setPrimaryEditor}
          saveEditorContent={saveEditorContent}
        />
      </aside>

      {/* Main */}
      <main className="z-10 flex justify-center w-full px-6 py-24 mt-14 lg:px-0">
        <div className="flex flex-col w-full h-full max-w-lg">
          <h1 className="text-xl font-normal text-gray-900 font-inter">
            Edit Project
          </h1>
          <div className="flex flex-col mt-10 space-y-6">
            <Input
              label="Title*"
              value={title}
              placeholder={"My Great Project"}
              onChangeHandler={handleTitleChange}
            />
            <Input
              label="Client"
              value={client}
              placeholder={"My Great Client"}
              onChangeHandler={handleClientChange}
            />
            <Dropdown
              label="Industry"
              value={industry}
              list={industries}
              onChangeHandler={setIndustry}
            />
            <Dropdown
              label="Content Type"
              value={contentType}
              list={contentTypes}
              onChangeHandler={setContentType}
            />
            <Textarea
              label="Project Brief"
              value={brief}
              placeholder={"Add a short brief about your project."}
              maxLength={400}
              onChangeHandler={handleBriefChange}
            />
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-sm font-light text-gray-900 font-inter">
                  Images
                </span>
                {images.length > 0 && (
                  <button
                    onClick={() => openUploadImageDialog()}
                    className="flex items-center px-2 text-xs font-light text-gray-700 border border-gray-200 rounded-lg h-7 font-inter hover:border-gray-300"
                  >
                    Add image
                  </button>
                )}
              </div>
              {/* Empty container */}
              {images.length < 1 && (
                <button
                  onClick={() => openUploadImageDialog()}
                  className="flex items-center justify-center w-full h-40 mt-2 space-x-2 border-2 border-gray-200 border-dashed rounded-lg hover:border-gray-300 group"
                >
                  <Plus className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                  <span className="text-sm font-light text-gray-500 font-inter group-hover:text-gray-700">
                    Add images
                  </span>
                </button>
              )}

              {images.length > 0 && (
                <>
                  <div className="w-full h-px my-4 bg-gray-200"></div>
                  <div className="flex flex-col w-full space-y-4">
                    {images.map((image, index) => (
                      <ImageCard
                        key={image.url}
                        image={image}
                        index={index}
                        images={images}
                        deleteImage={deleteImage}
                        moveImageUp={moveImageUp}
                        moveImageDown={moveImageDown}
                        theme={user?.theme}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Page */}
            <section className="flex flex-col items-start space-y-3">
              <span className="text-sm font-light text-gray-900 font-inter">
                Page
              </span>
              {!pageExists && (
                <button
                  onClick={() => openTextEditorDialog()}
                  className="flex items-center h-8 px-3 space-x-2 border border-gray-200 rounded-full"
                >
                  <Plus className="w-4 h-4 text-gray-900 " />
                  <span className="text-sm font-normal text-gray-900 font-inter">
                    Add page
                  </span>
                </button>
              )}

              {pageExists && (
                <div className="flex items-center justify-start w-full space-x-4">
                  <div className="flex flex-col justify-start w-16 h-20 p-2 space-y-1 overflow-hidden bg-white border border-gray-200 rounded filter drop-shadow-sm">
                    <span className="font-inter text-gray-900 font-normal text-[3px]">
                      {pageTitle}
                    </span>
                    <div className="w-full h-auto overflow-hidden editor-illustration-sm">
                      <Editor editorState={readOnlyEditor} readOnly />
                    </div>
                  </div>
                  <div className="flex flex-col items-start space-y-1">
                    <span className="text-sm font-normal text-gray-900 font-inter">
                      {pageTitle}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openTextEditorDialog()}
                        className="text-sm font-light text-gray-500 font-inter hover:underline"
                      >
                        Edit
                      </button>
                      <span className="text-sm text-gray-500">·</span>
                      <button
                        onClick={() => onDeletePage()}
                        className="text-sm font-light text-gray-500 font-inter hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          <div className="flex items-center justify-end w-full mt-10 space-x-4">
            <button
              onClick={() => deleteProject()}
              className="text-sm font-light text-gray-500 font-inter hover:text-red-700"
            >
              Delete project
            </button>
            <button
              onClick={() => updateProject()}
              className={`${
                (loading || !fieldsAreFilled) &&
                "opacity-50 pointer-events-none"
              } flex items-center h-8 px-4 text-sm font-normal text-white bg-gray-900 border rounded-full w-max font-inter hover:bg-gray-700`}
            >
              {loading ? "Updating" : "Update"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProject;

export const getServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);

    const currentUser = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    return {
      props: {
        currentUser,
      },
    };
  } catch (err) {
    return {
      props: {
        currentUser: null,
      },
    };
  }
};
