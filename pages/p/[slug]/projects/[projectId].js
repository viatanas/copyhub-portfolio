// Absolute imports
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import nookies from "nookies";
import { LongArrowUpLeft, Mail, Message } from "iconoir-react";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import copy from "copy-to-clipboard";
import { Toaster, toast } from "react-hot-toast";
import { FeedbackFish } from "@feedback-fish/react";

// Component imports
import NavTertiary from "@/components/Navs/NavTertiary";

// Other imports
import { firebaseAdmin } from "firebaseAdmin";

const Project = ({ currentUser }) => {
  const router = useRouter();
  const { slug, projectId } = router.query;

  const [project, setProject] = useState();
  const [user, setUser] = useState();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (!router.isReady) return;

    const fetchData = async () => {
      const res = await fetch(`/api/projects/${projectId}`);
      const { error, message, data } = await res.json();
      const { project } = data;

      setProject(project);
      setUser(project.user);

      if (project.page) {
        setEditorState(
          EditorState.createWithContent(
            convertFromRaw(JSON.parse(project.page.content))
          )
        );
      }
    };

    fetchData();
  }, [router.isReady]);

  return (
    <div className="w-full min-h-screen">
      <Head>
        <title>Copyhub - Portfolio</title>
        <meta name="description" content="Copyhub - Portfolios That Impress" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster position="bottom-center" />
      <NavTertiary
        slug={user?.username}
        currentUser={currentUser}
        user={user}
        projectId={projectId}
      />
      {currentUser && (
        <div className="fixed bottom-6 right-6">
          <FeedbackFish projectId="17cd1ee16f8c77" userId={currentUser.email}>
            <button className="p-4 bg-gray-900 rounded-full">
              <Message
                strokeWidth={2}
                className="w-6 h-6 text-white fill-current"
              />
            </button>
          </FeedbackFish>
        </div>
      )}

      {/* Back */}
      <button
        onClick={() => router.push(`/p/${user.username}`)}
        className="absolute p-1 rounded-md lg:fixed top-20 left-4 hover:bg-gray-900 hover:bg-opacity-5 group"
      >
        <LongArrowUpLeft className="w-6 h-6 text-gray-400 group-hover:text-gray-900" />
      </button>

      {/* Main */}
      <main className="z-10 flex flex-col items-center w-full px-6 py-24 mt-14 lg:px-0">
        {/* Header */}
        <div className="flex flex-col w-full h-full max-w-4xl">
          <div className="flex flex-col items-start w-full lg:items-center lg:justify-between lg:flex-row lg:px-28">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 border border-gray-200 rounded-full">
                <Image
                  alt="Profile image"
                  src={user?.profilePicture}
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-base font-medium text-gray-900 font-inter">
                  {user?.name}
                </span>
                <span className="text-sm font-light text-gray-500 font-inter">
                  {user?.location}
                </span>
              </div>
            </div>

            <a
              rel="noreferrer"
              target={"_blank"}
              href={`mailto:${user?.email}`}
              className="flex items-center px-3 mt-6 space-x-2 bg-white border border-gray-200 rounded-full lg:mt-0 h-7 hover:border-gray-300"
            >
              <Mail className="w-4 h-4 text-gray-900" />
              <span className="text-sm font-normal text-gray-900 font-inter">
                Contact
              </span>
            </a>
          </div>

          <div className="flex flex-col w-full mt-16 space-y-2 lg:px-28">
            <span className="text-2xl font-light text-gray-900 font-inter">
              {project?.title}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-light text-gray-400 font-inter">
                {project?.client}
              </span>
              <span className="text-gray-500">·</span>
              <span className="text-sm font-light text-gray-400 font-inter">
                {project?.industry}
              </span>
            </div>
          </div>

          <div className="flex flex-col w-full mt-16 space-y-2 lg:px-28">
            <span className="text-sm font-normal text-gray-900 font-inter">
              Project brief
            </span>
            <p className="text-sm font-light leading-6 text-gray-900 font-inter">
              {project?.brief}
            </p>
          </div>

          <div className="flex justify-center w-full mt-16 px-28">
            <div className="w-full h-px bg-gray-200 "></div>
          </div>

          {/* Copy */}
          {project?.page.title && (
            <section className="flex flex-col w-full mt-16 space-y-4 lg:px-28">
              <span className="text-2xl font-light text-gray-900 font-inter">
                {project?.page.title}
              </span>
              <div className="w-full h-auto text-sm font-light leading-6 text-gray-900 font-inter editor">
                <Editor editorState={editorState} readOnly />
              </div>
            </section>
          )}

          {/* Images */}
          {project?.images && (
            <div className="flex flex-col mt-16 space-y-20">
              {project?.images.map((image, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start space-y-4 lg:space-y-6"
                >
                  <span className="text-lg font-light text-gray-900 lg:text-xl font-inter lg:px-28">
                    {image.title}
                  </span>
                  <div className={`w-full h-auto p-6 lg:p-20 ${user.theme}`}>
                    <img className="w-full" src={image.url} />
                  </div>
                </div>
              ))}
            </div>
          )}

          <footer className="flex justify-center w-full mt-20 space-x-4">
            <button
              onClick={() => router.push(`/p/${user.username}`)}
              className="text-sm font-light text-gray-500 font-inter hover:text-gray-900"
            >
              Back to profile
            </button>
            <span className="text-gray-500">·</span>
            <button
              onClick={() => {
                copy(`https://copyhub.me/p/${slug}/projects/${projectId}`);
                toast.success("Copied!");
              }}
              className="text-sm font-light text-gray-500 font-inter hover:text-gray-900"
            >
              Share
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Project;

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
