// Absolute imports
import { useState, useEffect, createContext } from "react";
import nookies from "nookies";
import Cookies from "js-cookie";

// Util imports
import { auth, onIdTokenChanged } from "/firebase";

// Create context
export const AuthContext = createContext();

// Create provider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  // Listen for token changes
  useEffect(() => {
    onIdTokenChanged(auth, async (user) => {
      console.log("token changed!");
      nookies.destroy(null, "token");

      if (!user) {
        console.log(`no token found...`);
        setCurrentUser(null);
        Cookies.set("token", "");
        return;
      }

      console.log(`updating token...`);
      const token = await user.getIdToken();
      Cookies.set("token", token);
      setCurrentUser(user);
    });
  }, []);

  // force token refresh every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      console.log("Interval token refreshing...");
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
