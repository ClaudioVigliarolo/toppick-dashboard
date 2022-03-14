import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Lang } from "@/interfaces/app";

interface CustomRouteProps {
  path: string;
  condition: boolean;
  Component: any;
  token: string;
  currentLanguage: Lang;
  error: boolean;
  success: boolean;
}

const CustomRoute = ({
  path,
  Component,
  condition,
  error,
  success,
}: CustomRouteProps) => {
  console.log("condom", condition);
  return condition ? (
    <Route
      path={path}
      render={(routeProps) => (
        <Component
          navigationProps={routeProps}
          error={error}
          success={success}
        />
      )}
    />
  ) : //se loading && ! autenticated => display spinner
  //se loading && authenticated => currrent
  // se ! authenticated => login
  null;
};
export default CustomRoute;
