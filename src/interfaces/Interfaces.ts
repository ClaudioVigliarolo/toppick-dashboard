import { RouteProps } from "react-router-dom";

export interface Topic {
  id: number;
  ref_id: number;
  type: TopicType;
  title: string;
  source: string;
  timestamp: Date;
  level: TopicLevel;
  categories: TopicCategory[];
  related: Related[];
}

export interface TopicCategory {
  id: number;
  ref_id: number;
  title: string;
}

export interface ToTranslateTopic {
  id: number;
  ref_id: number;
  topic_id: number;
  dest_lang: Lang;
  source_lang: Lang;
  source_title: string;
  type: TopicType;
  source_related: Related[];
  source_categories: TopicCategory[];
  source: string;
  level: TopicLevel;
}

export interface TopicsCategory {
  topic_id: number;
  category_id: number;
}

export interface Category {
  title: string;
  id: number;
  ref_id: number;
  categoryTopics: CategoryTopic[];
}

export interface CategoryTopic {
  id: number;
  ref_id: number;
  title: string;
}

export interface Related {
  title: string;
  ref_id: number;
  id: number;
}

export interface QuestionTopic {
  id: number;
  title: string;
}

//report coming from the external world
export interface Report {
  client_id: string;
  question_id: number;
  reason: string;
}

//report handled by the app
export interface ReportHandled {
  username: string;
  question_title: string;
  timestamp: Date;
  topic_id: number;
  topic_title: string;
  question_id: number;
  reason: string;
}

export interface Question {
  id: number;
  title: string;
  timestamp: Date;
  topic_id: number;
  n?: number;
  new?: boolean;
  link?: string;
  description?: string;
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
  userMail: string;
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
  Message = "message.ejs",
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

export enum MailTemplate {
  Registration = "registration",
  Removal = "removal",
  Update = "update",
  Message = "message",
}

export interface EmailInfo {
  email: string;
  fromEmail: string;
  fromName: string;
  subject: EmailSubject;
  message?: string;
}

export enum Lang {
  IT = "it",
  EN = "en",
  FR = "fr",
  ES = "es",
}

export enum EmailSubject {
  Update = "Updated Credentials",
  Remove = "Account Removal",
  Registration = "Registration",
  Message = "Message",
}

export interface StatsContent {
  categories: number;
  topics: number;
  questions: number;
}

export interface StatsUpdates {
  updates: number;
}

export interface StatsReport {
  reports: number;
}

export interface Data {
  label: string;
  value: number;
}

export enum ActionType {
  ADD_TOPIC,
  ADD_QUESTION,
  ADD_CATEGORY,

  UPDATE_TOPIC,
  UPDATE_QUESTION,
  UPDATE_CATEGORY,

  TRANSLATE_TOPIC,

  DELETE_TOPIC,
  DELETE_QUESTION,
  DELETE_CATEGORY,
  DELETE_REPORT,
  DELETE_TOTRANSLATE,
}

export interface StatsUser {
  id: number;
  user_id: number;
  lang: Lang;
  action: ActionType;
  timestamp: Date;
}

export interface UserStats {
  categoriesAdded: number;
  categoriesUpdated: number;
  categoriesDeleted: number;

  topicsAdded: number;
  topicsUpdated: number;
  topicsDeleted: number;

  questionsAdded: number;
  questionsUpdated: number;
  questionsDeleted: number;

  totranslateDeleted: number;
  translatedTopics: number;
  translatedQuestions: number;
  deletedReports: number;
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

export enum TopicType {
  TOPIC,
  DIALOG,
}

export interface RadioButton {
  value: any;
  title: string;
}
export enum TopicLevel {
  EASY,
  MEDIUM,
  HARD,
}
