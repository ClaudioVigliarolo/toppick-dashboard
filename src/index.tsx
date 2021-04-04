// Import deps
import React from "react";
import { render } from "react-dom";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// Find div container
const rootElement = document.getElementById("root");
import { Navigation } from "./navigation/Index";
render(
  <AuthProvider>
    <HashRouter>
      <Navigation />
    </HashRouter>
  </AuthProvider>,
  rootElement
);
