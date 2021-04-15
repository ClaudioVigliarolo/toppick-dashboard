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
  loading: boolean;
}

const CustomRoute = ({
  path,
  Component,
  condition,
  token,
  isAuthenticated,
  currentLanguage,
  setLoading,
  loading,
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
          loading={loading}
        />
      )}
    />
  ) : (
    <Redirect to={isAuthenticated ? "categories" : "/login"} />
  );
};
export default CustomRoute;
