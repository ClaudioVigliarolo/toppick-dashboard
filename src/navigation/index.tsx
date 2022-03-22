import React from "react";
import { Redirect, Switch, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { StatusContext } from "@/context/StatusContext";
import { routes } from "./routes";
import CustomRoute from "../components/ui/CustomRoute";
import Menu from "../components/ui/Menu";
import { UserRole } from "@/interfaces/user";

export const getCondition = (
  userRole: UserRole,
  path: string,
  isAuthenticated: boolean
) => {
  switch (path) {
    case "/login":
      return !isAuthenticated;
    case "/users":
      return isAuthenticated && userRole == UserRole.ADMIN;
    case "/stats":
      return isAuthenticated && userRole == UserRole.ADMIN;

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
  const { isAuthenticated, userRole, username, currentLanguage, authToken } =
    React.useContext(AuthContext);

  const { loading, error, success } = React.useContext(StatusContext);
  const location = useLocation();
  return (
    <Menu
      loading={loading}
      userRole={userRole}
      isAuthenticated={isAuthenticated}
      token={authToken}
      username={username}
      currentLanguage={currentLanguage}
    >
      <Switch>
        {!isAuthenticated && !loading && location.pathname !== "/login" && (
          <Redirect to="/login" />
        )}
        {isAuthenticated && <Redirect exact from="/" to="/categories" />}
        {isAuthenticated && <Redirect exact from="/login" to="/categories" />}
        {routes.map((route, index) => (
          <CustomRoute
            key={index}
            path={route.path}
            condition={getCondition(userRole, route.path, isAuthenticated)}
            Component={route.component}
            token={authToken}
            currentLanguage={currentLanguage}
            error={error}
            success={success}
          />
        ))}
      </Switch>
    </Menu>
  );
};
