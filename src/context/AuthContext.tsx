import React from "react";
import { StatusContext } from "./StatusContext";
import { UserRole } from "@toppick/common/build/interfaces";
import { auth } from "@/services/firebase";

interface UserState {
  displayName: string;
  photoURL: string;
  uid: string;
  role: UserRole;
  isAuthenticated: boolean;
}

export const DEFAULT_USER_STATE: UserState = {
  displayName: "",
  photoURL: "",
  uid: "",
  role: UserRole.Default,
  isAuthenticated: false,
};

export const AuthContext = React.createContext({
  username: DEFAULT_USER_STATE.displayName,
  userId: DEFAULT_USER_STATE.uid,
  userImage: DEFAULT_USER_STATE.photoURL,
  userRole: DEFAULT_USER_STATE.role,
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = React.useState<UserState>(DEFAULT_USER_STATE);
  const { setIsAppLoading } = React.useContext(StatusContext);

  React.useEffect(() => {
    (async () => {
      setIsAppLoading(true);
      try {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            const { claims } = await user.getIdTokenResult(true);
            setUser({
              displayName: user.displayName || "",
              photoURL: user.photoURL || "",
              uid: user.uid,
              role: claims.role,
              isAuthenticated: true,
            });
          }
        });
      } catch {
        console.error("Failed To Connect to Firebase");
      }
      setIsAppLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        username: user.displayName,
        userId: user.uid,
        userImage: user.photoURL,
        isAuthenticated: user.isAuthenticated,
        userRole: user.role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
