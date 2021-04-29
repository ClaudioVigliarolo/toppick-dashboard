import React, { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { Lang } from "src/interfaces/Interfaces";

interface CustomRouteProps {
  path: string;
  condition: boolean;
  Component: any;
  token: string;
  isAuthenticated: boolean;
  currentLanguage: Lang;
  setLoading: (newVal: boolean) => void;
  loading: boolean;
  onError: () => void;
  onSuccess: () => void;
  error: boolean;
  success: boolean;
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
  onError,
  onSuccess,
  error,
  success,
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
          onError={onError}
          onSuccess={onSuccess}
          error={error}
          success={success}
        />
      )}
    />
  ) : (
    <Redirect to={isAuthenticated ? "categories" : "/login"} />
  );
};
export default CustomRoute;
