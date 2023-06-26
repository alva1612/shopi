import { createContext, useEffect, useState } from "react";
import { Auth } from "../Constants/Keys";
import { useLocalStorage } from "../Hooks";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { getItem: getAllUsers } = useLocalStorage(Auth.ALL_USERS);
  const {
    getItem: getLoggedInData,
    saveItem: saveLoggedInData,
    clearItem: clearLoggedInData,
  } = useLocalStorage(Auth.LOGGED_IN);
  const { saveItem: saveUserCred, clearItem: clearUserCred } = useLocalStorage(
    Auth.SAVED
  );

  const [loggedIn, setLoggedIn] = useState();

  const signIn = (data) => {
    const allUsers = getAllUsers();
    const match = allUsers.find(
      (user) =>
        user &&
        user.password === data.password &&
        user.username === data.username
    );
    if (!match) {
      return "Wrong";
    }

    saveLoggedInData(match);

    if (data.save) saveUserCred(data);
    else clearUserCred();
  };

  const signOut = () => {
    const notLoggedIn = null;
    clearLoggedInData();
    setLoggedIn(notLoggedIn);
  };

  useEffect(() => {
    if (loggedIn) return;

    const savedUser = getLoggedInData();
    if (savedUser) {
      setLoggedIn(savedUser);
    }
  }, [loggedIn, getLoggedInData]);

  return (
    <UserContext.Provider value={{ signIn, signOut, loggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
