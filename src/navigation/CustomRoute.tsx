import React, { useEffect, useState } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface CustomRouteProps {
  path: string;
  condition: boolean;
  Component: any;
  token: string;
  isAuthenticated: boolean;
  currentLanguage: string;
}

const CustomRoute = ({
  path,
  Component,
  condition,
  token,
  isAuthenticated,
  currentLanguage,
}: CustomRouteProps) => {
  return condition ? (
    <Route
      path={path}
      render={(routeProps) => (
        <Component
          navigationProps={routeProps}
          token={token}
          currentLanguage={currentLanguage}
        />
      )}
    />
  ) : (
    <Redirect to={isAuthenticated ? 'categories' : '/login'} />
  );
};
export default CustomRoute;
