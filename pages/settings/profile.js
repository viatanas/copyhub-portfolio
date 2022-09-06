// Absolute imports
import Head from "next/head";
import Image from "next/image";
import nookies from "nookies";
import { useEffect, useState, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { LongArrowUpLeft, Cancel, WarningCircledOutline } from "iconoir-react";

// Component imports
import Nav from "@/components/Navs/NavPrimary";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import SettingsTag from "@/components/Tags/SettingsTag";
import ThemeSelection from "@/components/ThemeSelection";

// Other imports
import useInput from "lib/hooks/useInput";
import useMultipleSelection from "lib/hooks/useMultipleSelection";
import serviceTags from "data/serviceTags";
import { firebaseAdmin } from "firebaseAdmin";
import { auth, signOut } from "/firebase";

const ProfileSettings = ({ currentUser }) => {
  const router = useRouter();
  const fileInput = useRef();

  // User Settings States
  const [username, setUsername, handleUsernameChange] = useInput();
  const [displayName, setDisplayName, handleDisplayNameChange] = useInput();
  const [profilePicture, setProfilePicture] = useState();
  const [location, setLocation, handleLocationChange] = useInput();
  const [header, setHeader, handleHeaderChange] = useInput();
  const [bio, setBio, handleBioChange] = useInput();
  const [email, setEmail, handleEmailChange] = useInput();
  const [twitter, setTwitter, handleTwitterChange] = useInput();
  const [linkedin, setLinkedin, handleLinkedinChange] = useInput();
  const [services, setServices, addService, removeService] =
    useMultipleSelection([]);
  const [clientInput, setClientInput] = useState();
  const [clients, setClients] = useState([]);
  const [theme, setTheme] = useState();

  // Util States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/api/users/userId?firebaseId=${currentUser.uid}`
      );
      const { error, message, data } = await res.json();
      const { user } = data;

      // Set data
      setUsername(user.username);
      setDisplayName(user.name);
      setProfilePicture({ blob: null, url: user.profilePicture });
      setLocation(user.location);
      setHeader(user.header);
      setBio(user.bio);
      setEmail(user.email);
      setTwitter(user.twitter);
      setLinkedin(user.linkedin);
      setServices(user.services);
      setClients(user.clients);
      setTheme(user.theme);
    };

    fetchData();
  }, []);

  // Validate required fields
  const fieldsAreFilled =
    username && displayName && location && header && email;

  // Add client
  const handleClientChange = (e) => {
    setClientInput(e.target.value);
  };

  // Save client
  const addClient = () => {
    setClientInput("");
    setClients((oldArray) => [...oldArray, clientInput]);
  };

  // Remove client
  const removeClient = (value) => {
    let filteredArray = clients.filter((item) => item !== value);
    setClients(filteredArray);
  };

  const handleThemeChange = (theme) => {
    setTheme(theme);
  };

  // Save settings
  const saveSettings = async () => {
    setError();
    setLoading(true);

    let formData = new FormData();
    let temp = profilePicture.url;
    const trimmedUsername = username.replace(/\s+/g, "").trim().toLowerCase();

    if (profilePicture.blob) {
      formData.append("image", profilePicture.blob);
      const res = await fetch(`/api/upload-image`, {
        method: "POST",
        body: formData,
      });
      const { url } = await res.json();
      temp = url;
    }

    const body = {
      username: trimmedUsername,
      name: displayName,
      location,
      header,
      bio,
      email,
      twitter,
      linkedin,
      services,
      clients,
      theme,
      profilePicture: temp,
    };

    const res = await fetch(`/api/users/userId?firebaseId=${currentUser.uid}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const { error, message, data } = await res.json();

    if (error) {
      setError(message);
      setLoading(false);
      return;
    }

    const { user } = data;

    if (!error) {
      setProfilePicture({ blob: null, url: user.profilePicture });
      setUsername(user.username);
      setDisplayName(user.name);
      setLocation(user.location);
      setHeader(user.header);
      setBio(user.bio);
      setEmail(user.email);
      setTwitter(user.twitter);
      setLinkedin(user.linkedin);
      setServices(user.services);
      setClients(user.clients);
      setTheme(user.theme);

      toast.success("Settings updated!");
    }

    setLoading(false);
  };

  // Image upload functions
  const uploadImage = () => {
    fileInput.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setProfilePicture({
        blob: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      return;
    }
  };

  return (
    <div className="w-full min-h-screen">
      <Head>
        <title>Copyhub - Profile Settings</title>
        <meta name="description" content="Copyhub - Profile Settings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster position="bottom-center" />
      {/* Back */}
      <div className="fixed flex flex-col items-center space-y-4 top-20 left-6">
        <button
          onClick={() => router.push(`/p/${username}`)}
          className="p-1 rounded-md hover:bg-gray-900 hover:bg-opacity-5 group"
        >
          <LongArrowUpLeft className="w-6 h-6 text-gray-400 group-hover:text-gray-900" />
        </button>
        <button
          onClick={async () => {
            await signOut(auth);
            router.push("/signin");
          }}
          className="text-sm font-light text-gray-400 font-inter hover:text-gray-700"
        >
          Log out
        </button>
      </div>

      <Nav slug="settings" currentUser={currentUser} />

      <main className="z-10 flex justify-center w-full px-6 py-24 mt-14 lg:px-0">
        <div className="flex flex-col w-full h-full max-w-lg">
          {/* Profile picture */}
          <div className="flex items-center space-x-6">
            <div className="relative w-32 h-32 border border-gray-200 rounded-full mt-14 lg:mt-0">
              <Image
                alt="Profile picture"
                src={profilePicture?.url}
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <button
              onClick={() => uploadImage()}
              className="h-8 px-4 text-sm font-light text-gray-900 border border-gray-200 rounded-md font-inter hover:border-gray-300"
            >
              Upload image
            </button>
            <input
              onChange={(e) => handleFileChange(e)}
              ref={fileInput}
              type="file"
              className="hidden"
            />
          </div>

          {/* Form fields */}
          <div className="flex flex-col w-full mt-10 space-y-6">
            <Input
              label="Username (copyhub.me/p/username) *"
              value={username}
              placeholder={"johndoe"}
              onChangeHandler={handleUsernameChange}
            />

            <Input
              label="Display name *"
              placeholder={"John Doe"}
              value={displayName}
              onChangeHandler={handleDisplayNameChange}
            />
            <Input
              label="Location *"
              placeholder={"London, UK"}
              value={location}
              onChangeHandler={handleLocationChange}
            />

            <Textarea
              label="Header *"
              placeholder={
                "Copywriter for SaaS startups that want to validate ideas and convert their first 1,000 users."
              }
              value={header}
              maxLength={200}
              onChangeHandler={handleHeaderChange}
            />
            <Textarea
              label="Bio"
              placeholder={
                "I specifically focus on early stage startups to help them validate their ideas, connect with their target audience, and convert their first 1,000 users."
              }
              value={bio}
              maxLength={800}
              onChangeHandler={handleBioChange}
            />
            <Input
              label="Contact email *"
              placeholder={"johndoe@gmail.com"}
              value={email}
              onChangeHandler={handleEmailChange}
            />
            <Input
              label="Twitter"
              placeholder={"twitter.com/johndoe"}
              value={twitter}
              onChangeHandler={handleTwitterChange}
            />
            <Input
              label="LinkedIn"
              placeholder={"linkedin.com/in/johndoe"}
              value={linkedin}
              onChangeHandler={handleLinkedinChange}
            />

            {/* Clients */}
            <div className="flex flex-col w-full">
              <span className="text-sm font-light text-gray-900 font-inter">
                Clients
              </span>
              <div className="relative w-full mt-2">
                <input
                  value={clientInput}
                  placeholder={"Apple"}
                  onChange={(e) => handleClientChange(e)}
                  className="w-full px-4 py-3 text-sm font-light text-gray-900 bg-gray-900 rounded-lg outline-none font-inter bg-opacity-5"
                />
                <button
                  onClick={() => addClient()}
                  className={`${
                    !clientInput && "pointer-events-none opacity-50"
                  } absolute px-3 text-sm font-light text-gray-900 bg-white border border-gray-200 rounded-md right-2 top-1 h-4/5 font-inter`}
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap w-full mt-1 -ml-2">
                {clients?.map((client) => (
                  <div
                    key={client}
                    className="flex items-center mt-2 ml-2 space-x-1"
                  >
                    <button onClick={() => removeClient(client)}>
                      <Cancel className="w-3 h-3 text-gray-500 hover:text-gray-900" />
                    </button>
                    <span className="text-sm font-light text-gray-500 font-inter">
                      {client}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="flex flex-col w-full mt-6 space-y-2">
              <span className="text-sm font-light text-gray-900 font-inter">
                Services
              </span>
              <div className="flex flex-wrap w-full -ml-2">
                {serviceTags.map((tag) => (
                  <SettingsTag
                    key={tag}
                    services={services}
                    tag={tag}
                    addService={addService}
                    removeService={removeService}
                  />
                ))}
              </div>
            </div>

            {/* Theme Selection */}
            <ThemeSelection
              handleThemeChange={handleThemeChange}
              selectedTheme={theme}
            />
          </div>
          <div className="flex justify-end w-full mt-10">
            <button
              onClick={() => saveSettings()}
              className={`${
                (loading || !fieldsAreFilled) &&
                "pointer-events-none opacity-50"
              } flex items-center h-8 px-4 text-sm font-normal text-white bg-gray-900 border rounded-full w-max font-inter hover:bg-gray-700`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
          {error && (
            <div className="flex items-center w-full px-2 py-3 mt-6 space-x-2 rounded-lg bg-red-50">
              <WarningCircledOutline className="w-5 h-5 text-red-700" />
              <span className="text-sm font-light text-red-700 font-inter">
                {error}
              </span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfileSettings;

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
