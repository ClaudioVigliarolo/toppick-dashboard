import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Lang } from "src/interfaces/Interfaces";

interface CustomRouteProps {
  path: string;
  condition: boolean;
  Component: any;
  token: string;
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
  currentLanguage,
  setLoading,
  loading,
  onError,
  onSuccess,
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
  ) : //se loading && ! autenticated => display spinner
  //se loading && authenticated => currrent
  // se ! authenticated => login
  null;
};
export default CustomRoute;
