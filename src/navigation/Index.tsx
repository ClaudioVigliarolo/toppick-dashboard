import React from "react";
import { Redirect, Switch } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import CustomRoute from "./CustomRoute";
import Menu from "./Menu";
import { getUpdates } from "../api/api";
import { Lang } from "src/interfaces/Interfaces";
import { StatusContext } from "src/context/StatusContext";
import { routes } from "./routes";

export const getCondition = (
  userType: string,
  path: string,
  isAuthenticated: boolean
) => {
  console.log("ussty", userType);
  switch (path) {
    case "/login":
      return !isAuthenticated;
    case "/users":
      return isAuthenticated && userType == "root";
    case "/stats":
      return isAuthenticated && userType == "root";

    case "/translate": //userType == "translated"
      return isAuthenticated;

    case "/categories":
      return isAuthenticated;
    case "/topics":
      return isAuthenticated;
    case "/create":
      return isAuthenticated;
    case "/questions":
      return isAuthenticated;
    case "/reports":
      return isAuthenticated;

    default:
      return false;
  }
};

export const Navigation = () => {
  const {
    isAuthenticated,
    userType,
    userToken,
    username,
    languages,
    setCurrentLanguage,
    currentLanguage,
  } = React.useContext(AuthContext);

  const { setLoading, loading, onError, onSuccess, error, success } =
    React.useContext(StatusContext);

  React.useEffect(() => {
    (async () => {
      console.log("ggg", await getUpdates("Sun May 11,2014", Lang.IT, 12));
    })();
  }, []);
  const location = useLocation();
  return (
    <Menu
      loading={loading}
      userType={userType}
      isAuthenticated={isAuthenticated}
      token={userToken}
      username={username}
      setCurrentLanguage={setCurrentLanguage}
      languages={languages}
      currentLanguage={currentLanguage}
      children={
        <Switch>
          {!loading && !isAuthenticated && location.pathname !== "/login" && (
            <Redirect to="/login" />
          )}
          {isAuthenticated && <Redirect exact from="/" to="/categories" />}
          {isAuthenticated && <Redirect exact from="/login" to="/categories" />}
          {routes.map((route, index) => (
            <CustomRoute
              key={index}
              path={route.path}
              condition={getCondition(userType, route.path, isAuthenticated)}
              Component={route.component}
              token={userToken}
              currentLanguage={currentLanguage}
              setLoading={setLoading}
              loading={loading}
              onError={onError}
              onSuccess={onSuccess}
              error={error}
              success={success}
            />
          ))}
        </Switch>
      }
    />
  );
};
