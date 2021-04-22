import { RouteProps } from "react-router-dom";

export interface Topic {
  id: number;
  ref_id: number;
  title: string;
  source: string;
  timestamp: Date;
  categories: Category[];
  related: Related[];
}

export interface Category {
  title: string;
  id: number;
  ref_id: number;
}

//report coming from the external world
export interface Report {
  client_id: string;
  question_id: number;
  reason: string;
}

//report handled by the app
export interface ReportHandled extends Report {
  username: string;
  question_title: string;
  timestamp: Date;
  topic_id: number;
  topic_title: string;
}

export interface CategoryTopic {
  category_id: number;
  topic_id: number;
  //  counter: number;
}

export interface Related {
  id: number;
  title: string;
  ref_id: number;
}

export interface Question {
  id: number;
  topic_id: number;
  topic_title: string;
  title: string;
  timestamp: Date;
}

export interface Language {
  label: string;
  value: string;
}

export interface EditItem {
  label: string;
  text: string;
}

export interface LocalsEmail {
  username: string;
  email: string;
  password: string;
}

export interface User {
  type: string;
  username: string;
  email: string;
  languages: Lang[];
}
export interface LoggedUser extends User {
  token: string;
}

export interface CreatedUser extends User {
  id: number;
  password: string;
}

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

export enum EmailType {
  Registration = "registration.ejs",
  Update = "update.ejs",
  Removal = "removal.ejs",
}

export interface Email {
  username: string;
  email: string;
  password: string;
  languages: string[];
  template: EmailType;
  subject: string;
}

export interface UpdatesResponse {
  is_updated: boolean;
  categories: any;
  questions: any;
  topics: any;
  last_update: string;
  category_topics: any;
  related: any;
}

export interface EmailInfo {
  email: string;
  fromEmail: string;
  fromName: string;
  subject: string;
}

export enum Lang {
  IT = "it",
  EN = "en",
}

export interface ToTranslateTopic {
  id: number;
  ref_id: number;
  topic_id: number;
  dest_lang: Lang;
  source_title: string;
  source_related: Related[];
  source_categories: Category[];
}
