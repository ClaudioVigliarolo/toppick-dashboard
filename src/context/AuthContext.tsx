import React from "react";
import { Lang } from "@/interfaces/app";
import { StatusContext } from "./StatusContext";
import { UserAppState, UserRole } from "@/interfaces/user";
import { auth } from "@/services/firebase";

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
});

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = React.useState<UserAppState>(DEFAULT_USER_APP_STATE);
  const [currentLanguage, setCurrentLanguage] = React.useState<Lang>(Lang.EN);
  const { setLoading } = React.useContext(StatusContext);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      //authenticate user
      try {
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

  return (
    <AuthContext.Provider
      value={{
        currentLanguage,
        username: user.displayName,
        userId: user.uid,
        userImage: user.photoURL,
        isAuthenticated: user.isAuthenticated,
        authToken: user.token,
        userRole: user.role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
