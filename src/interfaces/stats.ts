import { Lang } from "./app";

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

export interface StatsUser {
  id: number;
  user_id: number;
  lang: Lang;
  action: ActionType;
  timestamp: Date;
}

export enum ActionType {
  ADD_TOPIC,
  ADD_QUESTION,
  ADD_CATEGORY,

  UPDATE_TOPIC,
  UPDATE_QUESTION,
  UPDATE_CATEGORY,

  TRANSLATE_TOPIC,
  TRANSLATE_QUESTION,
  DELETE_TOPIC,
  DELETE_QUESTION,
  DELETE_CATEGORY,
  DELETE_REPORT,
  DELETE_TOTRANSLATE,
}

export interface StatsContent {
  categories: number;
  topics: number;
  questions: number;
}
