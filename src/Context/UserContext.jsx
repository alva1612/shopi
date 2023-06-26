import { createContext } from "vm";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  return <UserContext.Provider>{children}</UserContext.Provider>;
};
