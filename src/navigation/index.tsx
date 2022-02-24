import React from "react";
import { Redirect, Switch, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { StatusContext } from "@/context/StatusContext";
import { routes } from "./routes";
import CustomRoute from "../components/ui/CustomRoute";
import Menu from "../components/ui/Menu";

export const getCondition = (
  userType: string,
  path: string,
  isAuthenticated: boolean
) => {
  switch (path) {
    case "/login":
      return !isAuthenticated;
    case "/users":
      return isAuthenticated && userType == "root";
    case "/stats":
      return isAuthenticated && userType == "root";

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
    >
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
    </Menu>
  );
};
