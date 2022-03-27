import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Lang } from "@/interfaces/ui";

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
