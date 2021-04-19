import React from "react";
import { Lang } from "src/interfaces/Interfaces";
import { getUser } from "../api/api";
import { StatusContext } from "./StatusContext";

export const AuthContext = React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: (newVal: boolean) => {},
  setUserType: (newVal: string) => {},
  userType: "",
  setUsername: (newVal: string) => {},
  setEmail: (newVal: string) => {},
  setUserLanguages: (newLangs: Lang[]) => {},
  setUserToken: (newVal: string) => {},
  setCurrentLanguage: (newLang: Lang) => {},
  userToken: "",
  username: "",
  email: "",
  languages: [Lang.EN],
  currentLanguage: Lang.EN,
});

export const AuthProvider = ({ children }: { children: any }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [languages, setUserLanguages] = React.useState<Lang[]>([]);
  const [currentLanguage, setCurrentLanguage] = React.useState<Lang>(Lang.EN);
  const [userType, setUserType] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [userToken, setUserToken] = React.useState<string>("");
  const { setLoading } = React.useContext(StatusContext);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const storedJwt = localStorage.getItem("token");
      const prevLanguage: any = localStorage.getItem("language");
      if (storedJwt !== null && prevLanguage !== null) {
        const retrievedUser = await getUser(storedJwt);
        if (retrievedUser) {
          //the user was already authenticated, set up his data
          setUserLanguages(retrievedUser.languages);
          setCurrentLanguage(prevLanguage);
          setUsername(retrievedUser.username);
          setEmail(retrievedUser.email);
          setUserToken(retrievedUser.token);
          setUserType(retrievedUser.type);
          setIsAuthenticated(true);
        }
      }
      setLoading(false);
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

  const onSetCurrentLanguage = (newLang: Lang) => {
    localStorage.setItem("language", newLang);
    setCurrentLanguage(newLang);
  };

  const onSetUserLangs = (newVals: Lang[]) => {
    setUserLanguages(newVals);
  };
  const onSetUserToken = (newVal: string) => {
    setUserToken(newVal);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
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
        languages,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
