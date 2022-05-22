import React from "react";
import { Route } from "react-router-dom";
import { Lang } from "@/interfaces/ui";

interface CustomRouteProps {
  path: string;
  condition: boolean;
  Component: any;
  token: string;
  currentLanguage: Lang;
}

const CustomRoute = ({ path, Component, condition }: CustomRouteProps) => {
  return condition ? (
    <Route
      path={path}
      render={(routeProps) => <Component navigationProps={routeProps} />}
    />
  ) : //se loading && ! autenticated => display spinner
  //se loading && authenticated => currrent
  // se ! authenticated => login
  null;
};
export default CustomRoute;
