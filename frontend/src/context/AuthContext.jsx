import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // Try to get user from local storage, or default to null
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("auth-user")) || null);

  // Persist authUser to local storage whenever it changes
  useEffect(() => {
    if (authUser) {
      localStorage.setItem("auth-user", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("auth-user");
    }
  }, [authUser]);

  return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};