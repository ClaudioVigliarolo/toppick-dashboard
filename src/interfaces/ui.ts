import React from "react";

export interface SelectValue {
  title: string;
}

export interface Route {
  key: string;
  path: string;
  sidebarName: string;
  navbarName: string;
  component: React.ReactNode;
}

export interface RadioButton {
  value: any;
  title: string;
}

export enum MaterialUiColor {
  Primary = "primary",
  Secondary = "secondary",
  Default = "default",
}
