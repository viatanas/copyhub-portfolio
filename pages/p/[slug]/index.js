// Absolute imports
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Mail, NavArrowDown } from "iconoir-react";
import nookies from "nookies";

// Component imports
import NavSecondary from "@/components/Navs/NavSecondary";
import AboutSection from "@/components/Sections/AboutSection";
import ProjectSection from "@/components/Sections/ProjectsSection";

// Util imports
import { firebaseAdmin } from "firebaseAdmin";

export default function Home({ currentUser }) {
  const router = useRouter();
  const { slug } = router.query;

  const [currentSection, setCurrentSection] = useState("portfolio");
  const [user, setUser] = useState();

  useEffect(() => {
    if (!router.isReady) return;

    const fetchData = async () => {
      const res = await fetch(`/api/users/userId?slug=${slug}`);
      const { error, message, data } = await res.json();
      const { user } = data;

      setUser(user);
    };

    fetchData();
  }, [router.isReady]);

  // Change current section
  const changeCurrentSection = (section) => {
    setCurrentSection(section);
  };

  return (
    <div className="w-full min-h-screen">
      <Head>
        <title>Copyhub - Portfolio</title>
        <meta name="description" content="Copyhub - Portfolios That Impress" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavSecondary
        slug={user?.username}
        user={user}
        currentUser={currentUser}
      />

      <main className="z-10 flex justify-center w-full px-6 py-24 mt-14 lg:px-0">
        <div className="flex flex-col w-full max-w-5xl">
          {/* Header */}
          <section className="flex flex-col w-full">
            <div className="border border-gray-200 rounded-full w-28 h-28">
              <Image
                alt="Profile picture"
                src={user?.profilePicture}
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="flex items-center mt-4 space-x-4">
              <span className="text-base font-medium text-gray-900 font-inter">
                {user?.name}
              </span>
              <span className="text-sm italic font-light text-gray-500 font-inter">
                {user?.location}
              </span>
            </div>
            <div className="w-full max-w-xl mt-4">
              <span className="text-2xl font-light text-gray-900 font-inter">
                {user?.header}
              </span>
            </div>
            <div className="flex items-center mt-5 space-x-2">
              <a
                rel="noreferrer"
                target={"_blank"}
                href={`mailto:${user?.email}`}
                className="flex items-center px-3 space-x-2 bg-white border border-gray-200 rounded-full h-7 hover:border-gray-300"
              >
                <Mail className="w-4 h-4 text-gray-900" />
                <span className="text-sm font-normal text-gray-900 font-inter">
                  Contact
                </span>
              </a>
            </div>
          </section>

          <section className="flex flex-col w-full mt-20">
            <div className="flex justify-between w-full pb-5 border-b border-gray-200">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => changeCurrentSection("portfolio")}
                  className={`${
                    currentSection === "portfolio"
                      ? "text-gray-900 hover:text-gray-700 pointer-events-none"
                      : "text-gray-400 hover:text-gray-700"
                  } text-base font-light  font-inter`}
                >
                  Portfolio
                </button>
                <button
                  onClick={() => changeCurrentSection("about")}
                  className={`${
                    currentSection === "about"
                      ? "text-gray-900 hover:text-gray-700 pointer-events-none"
                      : "text-gray-400 hover:text-gray-700"
                  } text-base font-light  font-inter`}
                >
                  About
                </button>
              </div>
            </div>

            {/* Portfolio */}
            {currentSection === "portfolio" && (
              <ProjectSection
                projects={user?.projects}
                theme={user?.theme}
                slug={slug}
              />
            )}

            {/* About */}
            {currentSection === "about" && (
              <AboutSection
                bio={user?.bio}
                services={user?.services}
                clients={user?.clients}
                twitter={user?.twitter}
                linkedin={user?.linkedin}
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

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
