import { ToppickLibraryParams } from "@toppick/common";
import React from "react";
import { render } from "react-dom";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { StatusProvider } from "./context/StatusContext";
import { Navigation } from "./navigation";

const rootElement = document.getElementById("root");

ToppickLibraryParams.init({
  hostname: process.env.REACT_APP_API_HOSTNAME!,
  graphql_hostname: "",
});

render(
  <StatusProvider>
    <AuthProvider>
      <HashRouter>
        <Navigation />
      </HashRouter>
    </AuthProvider>
  </StatusProvider>,
  rootElement
);
