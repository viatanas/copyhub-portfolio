// Absolute imports
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Mail,
  ArrowUp,
  ClockOutline,
  DesignPencil,
  MoneySquare,
  SeaAndSun,
} from "iconoir-react";
import nookies from "nookies";

// Component imports
import Nav from "@/components/Navs/NavPrimary";

// Other imports
import { firebaseAdmin } from "firebaseAdmin";

export default function Home({ currentUser }) {
  const router = useRouter();
  const [user, setUser] = useState();

  useEffect(() => {
    if (!router.isReady) return;

    const fetchData = async () => {
      const res = await fetch(
        `/api/users/userId?firebaseId=${currentUser.uid}`
      );
      const { error, message, data } = await res.json();

      const { user } = data;
      setUser(user);
    };

    currentUser && fetchData();
  }, [router.isReady, currentUser]);

  return (
    <div className="w-full h-auto">
      <Head>
        <title>Copyhub - Home</title>
        <meta name="description" content="Copyhub - Portfolios That Impress" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Nav */}
      <Nav currentUser={currentUser} />

      <main className="flex flex-col items-center w-full px-6 pt-44 lg:px-0">
        {/* Header */}
        <section className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center w-full max-w-lg">
            <h1 className="text-5xl font-light text-center text-gray-900 font-inter">
              <span className="italic">Portfolios</span> <br></br> that impress
            </h1>
            <p className="w-full text-base font-light leading-7 text-center text-gray-500 mt-7 font-inter">
              {` Build simple, professional, and well-designed copywriting
              portfolios in minutes. Join the waitlist to be notified when we're
              live.`}
            </p>
            {currentUser && (
              <>
                <Link href={`/p/${user?.username}`}>
                  <a className="flex items-center px-4 space-x-2 border rounded-full mt-7 h-7 boder-gray-200 hover:border-gray-400">
                    <ArrowUp className="w-4 h-4 text-gray-900 transform rotate-45" />
                    <span className="text-sm font-light text-gray-900 font-inter">
                      {" "}
                      Go to portfolio
                    </span>
                  </a>
                </Link>
              </>
            )}
            {!currentUser && (
              <div className="flex space-x-2 mt-7">
                <Link href="/waitlist">
                  <a className="flex items-center px-4 space-x-2 border rounded-full h-7 boder-gray-200 hover:border-gray-400">
                    <Mail className="w-4 h-4 text-gray-900" />
                    <span className="text-sm font-light text-gray-900 font-inter">
                      {" "}
                      Join waitlist
                    </span>
                  </a>
                </Link>
                <Link href={`/p/demo`}>
                  <a className="flex items-center px-4 space-x-2 border rounded-full h-7 boder-gray-200 ">
                    <ArrowUp className="w-4 h-4 text-gray-900 transform rotate-45" />
                    <span className="text-sm font-light text-gray-900 font-inter ">
                      View live portfolio
                    </span>
                  </a>
                </Link>
              </div>
            )}
          </div>
          <div className="w-full h-auto max-w-4xl mt-16">
            <img
              className="border border-gray-200 rounded-lg drop-shadow-lg filter"
              src="https://uploads-ssl.webflow.com/62ebdd574ecda2227e81afd4/62fb5dca1e697b981af08261_3t4reg.svg"
            />
          </div>
        </section>

        {/* Section 2 */}
        <section className="flex justify-center w-full py-20 mt-40 bg-gray-900 border-gray-200 bg-opacity-5 border-y">
          <div className="flex flex-col items-center w-full max-w-xl">
            <div className="flex items-center h-6 px-3 text-xs font-light tracking-wider text-gray-700 bg-gray-900 border border-gray-300 rounded-full bg-opacity-10 w-max font-inter">
              BEST OF BOTH
            </div>
            <span className="mt-6 text-3xl font-light text-center text-gray-900 font-inter">
              The <span className="italic">simplicity</span> of Google Drive
            </span>
            <span className="mt-2 text-3xl font-light text-center text-gray-900 font-inter">
              with the <span className="italic">quality</span> of a personal
              website.
            </span>
            <img
              className="mt-12"
              src="https://uploads-ssl.webflow.com/62ebdd574ecda2227e81afd4/62fcc37779e0c6ed0638da11_Group%2034.svg"
            />
          </div>
        </section>

        {/* The Perks */}
        <section className="flex justify-center w-full py-40 border-b border-gray-200">
          <div className="flex flex-col items-center w-full max-w-5xl">
            <div className="flex items-center h-6 px-3 text-xs font-light tracking-wider text-gray-700 bg-gray-900 border border-gray-300 rounded-full bg-opacity-10 w-max font-inter">
              THE PERKS
            </div>
            <span className="mt-6 text-3xl font-light text-center text-gray-900 font-inter">
              <span className="italic">Save</span> time,{" "}
              <span className="italic">relieve</span> stress,{" "}
              <span className="italic">convert</span> more.
            </span>
            <div className="grid w-full grid-cols-1 mt-12 lg:grid-cols-3 lg:gap-x-4 gap-y-4">
              <div className="flex flex-col items-center w-full px-8 border border-gray-200 rounded-lg py-14">
                <ClockOutline className="text-gray-900 w-7 h-7" />
                <span className="mt-8 text-2xl font-light text-center text-gray-900 font-inter">
                  Save hours building a professional portfolio
                </span>
                <span className="mt-4 text-base font-light leading-7 text-center text-gray-500 font-inter">
                  Showcase your greatest copy in minutes with a simple and easy
                  to build online portfolio.
                </span>
              </div>

              <div className="flex flex-col items-center w-full px-8 bg-gray-100 bg-opacity-50 border border-gray-200 rounded-lg py-14 ">
                <DesignPencil className="text-gray-900 w-7 h-7" />
                <span className="mt-8 text-2xl font-light text-center text-gray-900 font-inter">
                  Never worry about design again
                </span>
                <span className="mt-4 text-base font-light leading-7 text-center text-gray-500 font-inter">
                  {`We'll showcase your work with design best-practice, so you can
                  focus on copy, not design.`}
                </span>
              </div>

              <div className="flex flex-col items-center w-full px-8 border border-gray-200 rounded-lg py-14">
                <MoneySquare className="text-gray-900 w-7 h-7" />
                <span className="mt-8 text-2xl font-light text-center text-gray-900 font-inter">
                  Convert more clients through credibility
                </span>
                <span className="mt-4 text-base font-light leading-7 text-center text-gray-500 font-inter">
                  Gain trust and credibility from clients with professional
                  portfolios built for copywriters.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="flex justify-center w-full py-40 border-b border-gray-200">
          <div className="flex flex-col items-center w-full max-w-5xl ">
            <div className="flex items-center h-6 px-3 text-xs font-light tracking-wider text-gray-700 bg-gray-900 border border-gray-300 rounded-full bg-opacity-10 w-max font-inter">
              FEATURES
            </div>
            <span className="mt-6 text-3xl font-light text-center text-gray-900 font-inter">
              Look <span className="italic">professional</span> the{" "}
              <span className="italic">easy</span> way
            </span>
            <span className="w-full max-w-xl mt-2 text-base font-light leading-7 text-center text-gray-500 font-inter">
              No need to spend the weekend figuring out the limits of your
              website builder. Instead, organize and share your portfolio
              instantly.
            </span>
            <div className="grid w-full grid-cols-1 gap-5 mt-16 lg:grid-cols-5">
              {/* First box */}
              <div className="relative flex flex-col col-span-1 p-10 bg-gray-900 border border-gray-200 rounded-lg lg:col-span-3 bg-opacity-5">
                <span className="text-xl font-light text-gray-900 font-inter">
                  Simple Editor
                </span>
                <span className="mt-2 text-base font-light leading-7 text-gray-500 font-inter">
                  Upload and style your copy in text form with our simple and
                  familiar editor. Or, upload screenshots with ease.
                </span>
                <div className="w-full mt-72"></div>
                <img
                  className="absolute bottom-0 right-0 border-t border-l border-gray-200 rounded-tl-lg"
                  src="https://uploads-ssl.webflow.com/62ebdd574ecda2227e81afd4/62ebf5bb7adc45e8fc61d91d_Editor.svg"
                />
              </div>
              {/* Second box */}
              <div className="flex flex-col h-full col-span-1 py-10 pl-10 overflow-hidden bg-gray-900 border border-gray-200 rounded-lg lg:col-span-2 bg-opacity-5">
                <span className="text-xl font-light text-gray-900 font-inter">
                  Professional URL
                </span>
                <span className="mt-2 text-base font-light leading-7 text-gray-500 font-inter">
                  Attract more clients with short, professional, and credible
                  links.
                </span>
                <div className="flex flex-col w-full mt-16 space-y-3">
                  <span className="text-sm font-light text-gray-900 font-inter">
                    Before
                  </span>
                  <div className="w-full p-4 text-sm font-light text-gray-500 bg-white rounded-tl-md rounded-bl-md font-inter">
                    drive.google.com/drive/folders/1MDkQ8sPxo4HIms...
                  </div>
                </div>

                <div className="flex flex-col w-full mt-8 space-y-3">
                  <span className="text-sm font-light text-gray-900 font-inter">
                    After
                  </span>
                  <div className="p-4 text-sm font-normal text-gray-900 bg-white rounded-md w-max font-inter">
                    copyhub.me/p/morgan
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-between col-span-1 p-10 bg-gray-900 border border-gray-200 rounded-lg lg:col-span-5 lg:flex-row bg-opacity-5">
                <div className="flex flex-col items-start">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-light text-gray-900 font-inter">
                      Explore Page
                    </span>
                    <div className="flex items-center h-6 px-3 text-xs font-light tracking-wider text-gray-700 bg-gray-200 rounded-full bg-opacity-70 w-max font-inter">
                      COMING SOON
                    </div>
                  </div>
                  <span className="w-5/6 mt-2 text-base font-light leading-7 text-gray-500 font-inter">
                    Bring new clients to you fby showcasing your work to the
                    world. Or, explore trending copy to inspire and perfect your
                    next project.
                  </span>
                </div>

                <div className="flex flex-col mt-8 space-y-3 -ml-9 lg:ml-0 lg:mt-0">
                  <div className="flex space-x-3">
                    <div className="flex items-center h-8 px-3 text-sm font-light text-gray-900 bg-white border border-gray-200 rounded-full font-inter">
                      Ads
                    </div>
                    <div className="flex items-center h-8 px-3 text-sm font-light text-gray-900 bg-white border border-gray-200 rounded-full font-inter">
                      Emails
                    </div>
                    <div className="flex items-center h-8 px-3 text-sm font-light text-gray-900 bg-white border border-gray-200 rounded-full font-inter">
                      Products
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <div className="flex items-center h-8 px-3 text-sm font-light text-gray-900 bg-white border border-gray-200 rounded-full font-inter">
                      Websites
                    </div>
                    <div className="flex items-center h-8 px-3 text-sm font-light text-gray-900 bg-white border border-gray-200 rounded-full font-inter">
                      Content
                    </div>
                    <div className="flex items-center h-8 px-3 text-sm font-light text-gray-900 bg-white border border-gray-200 rounded-full font-inter">
                      Social
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="flex justify-center w-full py-40 border-b border-gray-200">
          <div className="flex flex-col items-center w-full max-w-3xl">
            <div className="flex items-center h-6 px-3 text-xs font-light tracking-widest text-gray-700 bg-gray-900 border border-gray-300 rounded-full bg-opacity-10 w-max font-inter">
              PRICING
            </div>
            <span className="mt-6 text-3xl font-light text-center text-gray-900 font-inter">
              <span className="italic">Build</span> your portfolio,{" "}
              <span className="italic">grow</span> your career
            </span>
            <div className="flex flex-col w-full mt-12 space-y-5 lg:flex-row lg:space-x-5">
              <div className="flex flex-col w-full px-10 py-12 bg-white border border-gray-200 rounded-lg">
                <span className="text-base font-light text-gray-900 font-inter">
                  Free
                </span>
                <span className="mt-6 text-4xl font-medium text-gray-900">
                  $0
                </span>
                <span className="mt-6 text-base font-light leading-7 text-gray-500 font-inter">
                  Create an online copywriting portfolio for free, and impress
                  new clients.
                </span>
                <Link href="/waitlist">
                  <a className="flex items-center px-4 mt-10 space-x-2 border rounded-full w-max h-7 boder-gray-200 hover:border-gray-400">
                    <Mail className="w-4 h-4 text-gray-900" />
                    <span className="text-sm font-light text-gray-900 font-inter">
                      {" "}
                      Join waitlist
                    </span>
                  </a>
                </Link>{" "}
              </div>

              <div className="flex flex-col w-full px-10 py-12 bg-gray-300 border border-gray-200 rounded-lg bg-opacity-20">
                <span className="text-base font-light text-gray-900 font-inter">
                  Pro
                </span>
                <span className="mt-6 text-4xl font-medium text-gray-900">
                  $5
                </span>
                <span className="mt-6 text-base font-light leading-7 text-gray-500 font-inter">
                  Pro tools to help you grow your business, from analytics to
                  lead gen.
                </span>
                <div className="flex items-center px-4 mt-10 space-x-2 bg-gray-300 rounded-full bg-opacity-30 w-max h-7">
                  <SeaAndSun className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-light text-gray-500 font-inter">
                    {" "}
                    Coming soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex justify-center w-full py-20 bg-gray-300 border-b border-gray-200 bg-opacity-20">
          <div className="flex flex-col items-center w-full max-w-5xl">
            <span className="mt-6 text-3xl font-normal text-center text-gray-900 font-inter">
              We tackle the <span className="italic">website</span>, you tackle
              your <span className="italic">career</span>
            </span>
            <span className="w-full mt-4 text-base font-light leading-7 text-center text-gray-500 font-inter">
              Don’t worry about code or design. We’ll handle them for you. Start
              your portfolio now.
            </span>
            <Link href="/waitlist">
              <a className="flex items-center px-4 mt-10 space-x-2 bg-white border rounded-full w-max h-7 boder-gray-200 hover:border-gray-400">
                <Mail className="w-4 h-4 text-gray-900" />
                <span className="text-sm font-light text-gray-900 font-inter">
                  {" "}
                  Join waitlist
                </span>
              </a>
            </Link>{" "}
          </div>
        </section>

        <footer className="flex items-center justify-between w-full h-12">
          <div className="items-center pl-4 space-x-1">
            <Link href="/">
              <a className="text-sm font-light text-gray-900 underline font-inter hover:underline hover:text-gray-900">
                Copyhub
              </a>
            </Link>
          </div>

          <a
            rel="noreferrer"
            target={"_blank"}
            href="mailto:hello@copyhub.co"
            className="flex items-center h-full px-4 text-sm font-light text-gray-500 border-l border-gray-200 hover:bg-gray-900 hover:bg-opacity-5 font-inter hover:text-gray-900"
          >
            Contact
          </a>
        </footer>
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
