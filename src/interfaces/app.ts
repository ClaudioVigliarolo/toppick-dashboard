import React from "react";
import { RouteProps } from "react-router-dom";

export interface PageProps {
  navigationProps: React.ComponentType<RouteProps>;
  token: string;
  currentLanguage: Lang;
  loading: boolean;
  setLoading: (newVal: boolean) => void;
  onError: () => void;
  onSuccess: () => void;
  error: boolean;
  success: boolean;
}

export enum Lang {
  IT = "it",
  EN = "en",
  FR = "fr",
  ES = "es",
}

export interface Value {
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
