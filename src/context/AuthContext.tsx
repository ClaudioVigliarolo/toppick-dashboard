import React from "react";
import { Lang } from "@/interfaces/ui";
import { StatusContext } from "./StatusContext";
import { auth } from "@/services/firebase";
import { UserRole } from "@toppick/common";

interface UserAppState {
  displayName: string;
  photoURL: string;
  token: string;
  uid: string;
  isAuthenticated: boolean;
  role: UserRole;
}

export const DEFAULT_USER_APP_STATE: UserAppState = {
  displayName: "",
  isAuthenticated: false,
  photoURL: "",
  token: "",
  uid: "",
  role: UserRole.DEFAULT,
};

export const AuthContext = React.createContext({
  currentLanguage: Lang.EN,
  username: DEFAULT_USER_APP_STATE.displayName,
  userId: DEFAULT_USER_APP_STATE.uid,
  userImage: DEFAULT_USER_APP_STATE.photoURL,
  isAuthenticated: DEFAULT_USER_APP_STATE.isAuthenticated,
  authToken: DEFAULT_USER_APP_STATE.token,
  userRole: DEFAULT_USER_APP_STATE.role,
  isProduction: true,
  setIsProduction: (value: boolean) => {},
});

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = React.useState<UserAppState>(DEFAULT_USER_APP_STATE);
  const [currentLanguage, setCurrentLanguage] = React.useState<Lang>(Lang.EN);
  const [isProduction, setIsProduction] = React.useState<boolean>(true);
  const { setLoading } = React.useContext(StatusContext);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        //authenticate user
        auth.onAuthStateChanged(async (user) => {
          if (!user) {
            setUser(DEFAULT_USER_APP_STATE);
          } else {
            const { claims } = await user.getIdTokenResult(true);
            setUser({
              displayName: user.displayName || "",
              isAuthenticated: true,
              photoURL: user.photoURL || "",
              token: await user.getIdToken(),
              uid: user.uid,
              role: claims.role,
            });
          }
          setLoading(false);
        });
      } catch {
        console.error("Failed To Connect to Firebase");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSetIsProduction = (value: boolean) => {
    setIsProduction(value);
  };

  return (
    <AuthContext.Provider
      value={{
        username: user.displayName,
        userId: user.uid,
        userImage: user.photoURL,
        isAuthenticated: user.isAuthenticated,
        authToken: user.token,
        userRole: user.role,
        currentLanguage,
        setIsProduction: onSetIsProduction,
        isProduction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
