import { RouteProps } from "react-router-dom";

export interface Topic {
  title: string;
  id: number;
  source: string;
  timestamp: Date;
  related: Related[];
  categories: Category[];
}

export interface Category {
  title: string;
  id: number;
}

//report coming from the external world
export interface Report {
  user_id: string;
  question_id: number;
  reason: string;
}

//report handled by the app
export interface ReportHandled extends Report {
  question_title: string;
  topic_title: string;
  timestamp: Date;
  id: number;
  topic_id: number;
}

export interface TopicRespo {}

export interface CategoryTopic {
  category_id: number;
  topic_id: number;
  //  counter: number;
}

export interface Related {
  id: number;
  title: string;
}

export interface ReportResponse {
  topics: string[];
  reports: ReportHandled[];
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

export interface User {
  type: string;
  username: string;
  email: string;
  languages: string[];
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
  currentLanguage: string;
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
  isUpdated: boolean;
  categories: any;
  questions: any;
  topics: any;
  last_update: string;
  category_topics: any;
  related: any;
}
