// Absolute imports
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { LongArrowUpLeft } from "iconoir-react";

// Imports
import { auth, signInWithPopup, googleProvider } from "/firebase";
import NavPrimary from "@/components/Navs/NavPrimary";

const Register = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  // Create account function
  const signIn = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const body = {
        firebaseId: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        profilePicture: result.user.photoURL,
      };

      const res = await fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const { error, message, data } = await res.json();
      const { user } = data;
      router.push(`/p/${user.username}`);

      setLoading(false);
    } catch (err) {
      // setError(err);
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      <Head>
        <title>Copyhub - Sign In</title>
        <meta name="description" content="Copyhub - Portfolios That Impress" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavPrimary slug={"signin"} />

      {/* Main */}
      <main className="flex justify-center w-full px-10 pt-16 mt-14 lg:px-0">
        <div className="flex flex-col w-full max-w-md">
          <Link href={`/`}>
            <a className="p-1 rounded-md w-max hover:bg-gray-900 hover:bg-opacity-5">
              <LongArrowUpLeft className="w-6 h-6 text-gray-500" />
            </a>
          </Link>
          <div className="flex flex-col mt-5 text-2xl font-light text-gray-900 font-inter">
            <span className="italic"> Portfolios</span>
            <span className="mt-1">that impress.</span>
          </div>
          <p className="mt-3 text-sm font-light leading-6 text-gray-500 font-inter">
            Build simple, professional, and well-designed copywriting portfolios
            in minutes. Currently in private beta.
          </p>
          <button
            onClick={() => signIn()}
            className={`${
              loading && "opacity-50 pointer-events-none"
            } flex items-center h-10 px-4 mt-10 space-x-2 bg-gray-900 rounded-lg w-max hover:bg-gray-700`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <rect width="256" height="256" fill="none"></rect>
              <path
                d="M128,128h88a88.1,88.1,0,1,1-25.8-62.2"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="30"
              ></path>
            </svg>
            <span className="text-sm font-normal text-white font-inter">
              Sign in with Google
            </span>
          </button>
          {error && (
            <div className="flex items-start w-full px-4 py-3 mt-6 space-x-2 rounded-lg bg-red-50 ">
              <WarningCircledOutline
                strokeWidth="2"
                className="w-5 h-5 text-red-700"
              />
              <span className="text-sm font-normal text-red-700 font-inter">
                {error}
              </span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Register;
