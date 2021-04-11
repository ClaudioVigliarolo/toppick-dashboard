import React, { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface CustomRouteProps {
  path: string;
  condition: boolean;
  Component: any;
  token: string;
  isAuthenticated: boolean;
  currentLanguage: string;
  setLoading: (newVal: boolean) => void;
}

const CustomRoute = ({
  path,
  Component,
  condition,
  token,
  isAuthenticated,
  currentLanguage,
  setLoading,
}: CustomRouteProps) => {
  return condition ? (
    <Route
      path={path}
      render={(routeProps) => (
        <Component
          navigationProps={routeProps}
          token={token}
          currentLanguage={currentLanguage}
          setLoading={setLoading}
        />
      )}
    />
  ) : (
    <Redirect to={isAuthenticated ? "categories" : "/login"} />
  );
};
export default CustomRoute;
