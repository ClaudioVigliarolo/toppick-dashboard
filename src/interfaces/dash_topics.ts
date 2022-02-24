import { UserApproved } from "./dash_user";

export interface TopicCategory {
  id: number;
  ref_id: number;
  title: string;
}

export interface Category {
  title: string;
  id: number;
  ref_id: number;
  categoryTopics: CategoryTopic[];
  description: string;
  image: string;
}

export interface CategoryTopic {
  id: number;
  ref_id: number;
  title: string;
}

export interface TopicRelated {
  title: string;
  ref_id: number;
  id: number;
}

export interface Example {
  title: string;
}

export interface QuestionExtResource {
  url: string;
  title?: string;
  snippet?: string;
  thumbnail?: string;
}

export interface Question {
  id: number;
  title: string;
  n?: number;
  new?: boolean;
  examples: Example[];
  ext_resources: QuestionExtResource[];
}

export enum TopicLevel {
  EASY,
  MEDIUM,
  HARD,
}

export interface TopicTag {
  title: string;
}

export interface Topic {
  id: number;
  ref_id: number;
  title: string;
  level: TopicLevel;
  source: string;
  timestamp: Date;
  categories: TopicCategory[];
  related: TopicRelated[];
  description: string;
  image: string;
  active: boolean;
  users_approved?: UserApproved[];
  tags: TopicTag[];
  approved: boolean;
}
