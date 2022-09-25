import React from "react";
import { Route as ReactRoute } from "react-router-dom";

interface RouteProps {
  path: string;
  condition: boolean;
  Component: any;
}

const Route = ({ path, Component, condition }: RouteProps) => {
  return condition ? (
    <ReactRoute
      path={path}
      render={(routeProps) => <Component navigationProps={routeProps} />}
    />
  ) : null;
};
export default Route;
