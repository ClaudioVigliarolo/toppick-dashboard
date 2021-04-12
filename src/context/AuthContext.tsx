import React from "react";
import { getUser } from "../api/api";

export const AuthContext = React.createContext({
  isAuthenticated: false,
  loading: false,
  setLoading: (newVal: boolean) => {},
  setIsAuthenticated: (newVal: boolean) => {},
  setUserType: (newVal: string) => {},
  userType: "",
  setUsername: (newVal: string) => {},
  setEmail: (newVal: string) => {},
  setUserLanguages: (newVals: string[]) => {},
  setUserToken: (newVal: string) => {},
  setCurrentLanguage: (newVal: string) => {},
  userToken: "",
  username: "",
  email: "",
  userLanguages: [""],
  currentLanguage: "",
});

export const AuthProvider = ({ children }: { children: any }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [userLanguages, setUserLanguages] = React.useState<string[]>([]);
  const [currentLanguage, setCurrentLanguage] = React.useState<string>("");
  const [userType, setUserType] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [userToken, setUserToken] = React.useState<string>("");

  React.useEffect(() => {
    (async () => {
      const storedJwt = localStorage.getItem("token");
      const prevLanguage = localStorage.getItem("language");

      if (storedJwt != null) {
        const retrievedUser = await getUser(storedJwt);
        if (retrievedUser) {
          //the user was already authenticated, set up his data
          setUserLanguages(retrievedUser.languages);
          setCurrentLanguage(
            prevLanguage ? prevLanguage : retrievedUser.languages[0]
          );
          setUsername(retrievedUser.username);
          setEmail(retrievedUser.email);
          setUserToken(retrievedUser.token);
          setUserType(retrievedUser.type);
          setIsAuthenticated(true);
        }
      }
    })();
  }, []);

  const onSetIsAuthenticated = (newVal: boolean) => {
    setIsAuthenticated(newVal);
  };

  const onSetUserType = (newVal: string) => {
    setUserType(newVal);
  };

  const onSetUserName = (newVal: string) => {
    setUsername(newVal);
  };

  const onSetEmail = (newVal: string) => {
    setEmail(newVal);
  };

  const onSetLoading = (newVal: boolean) => {
    setLoading(newVal);
  };

  const onSetCurrentLanguage = (newLang: string) => {
    localStorage.setItem("language", newLang);
    setCurrentLanguage(newLang);
  };

  const onSetUserLangs = (newVals: string[]) => {
    setUserLanguages(newVals);
  };
  const onSetUserToken = (newVal: string) => {
    setUserToken(newVal);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        setLoading: onSetLoading,
        setIsAuthenticated: onSetIsAuthenticated,
        setUserType: onSetUserType,
        userType,
        setUsername: onSetUserName,
        setEmail: onSetEmail,
        setUserLanguages: onSetUserLangs,
        setUserToken: onSetUserToken,
        setCurrentLanguage: onSetCurrentLanguage,
        userToken,
        currentLanguage,
        username,
        email,
        userLanguages,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
