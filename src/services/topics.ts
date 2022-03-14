import axios from "axios";
import {
  Category,
  Question,
  Topic,
  CategoryTopic,
  CreatedQuestion,
} from "../interfaces/dash_topics";

import { HOSTNAME } from "../config/config";
import { Lang } from "@/interfaces/app";

export const getCategories = async (
  lang: Lang,
  token: string
): Promise<Category[]> => {
  const response = await axios.get(
    `${HOSTNAME}/api/content/categories-dashboard/` + lang,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );

  return response.data;
};

export const getCategoryTopics = async (
  lang: Lang,
  token: string
): Promise<CategoryTopic[]> => {
  const response = await axios.get(
    `${HOSTNAME}/api/content/categories-dashboard/topics/` + lang,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const getTopics = async (
  lang: Lang,
  token: string
): Promise<Topic[]> => {
  const response = await axios.get(
    `${HOSTNAME}/api/content/topics-dashboard/` + lang,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const addTopic = async (
  topic: Topic,
  lang: Lang,
  token: string
): Promise<void> => {
  await axios.post(
    `${HOSTNAME}/api/content/topics-dashboard`,
    {
      topic,
      lang,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const updateTopic = async (
  topic: Topic,
  lang: Lang,
  token: string
): Promise<void> => {
  await axios.put(
    `${HOSTNAME}/api/content/topics-dashboard`,
    {
      topic,
      lang,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const deleteTopic = async (
  id: number,
  lang: Lang,
  token: string
): Promise<void> => {
  const response = await axios.delete(
    `${HOSTNAME}/api/content/topics-dashboard`,
    {
      data: {
        id,
        lang,
      },

      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const deleteCategory = async (
  id: number,
  lang: Lang,
  token: string
): Promise<void> => {
  await axios.delete(`${HOSTNAME}/api/content/categories-dashboard/`, {
    data: {
      id,
      lang,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const addQuestions = async (
  questions: CreatedQuestion[],
  topicId: number,
  lang: Lang,
  token: string
): Promise<void> => {
  await axios.post(
    `${HOSTNAME}/api/content/questions-dashboard`,
    {
      questions,
      topic_id: topicId,
      lang,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const createCategory = async (
  category: Category,
  lang: Lang,
  token: string
): Promise<void> => {
  await axios.post(
    `${HOSTNAME}/api/content/categories-dashboard`,
    {
      category,
      lang,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const updateCategory = async (
  category: Category,
  lang: Lang,
  token: string
): Promise<void> => {
  await axios.put(
    `${HOSTNAME}/api/content/categories-dashboard`,
    {
      category,
      lang,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

//todo
export const deleteQuestion = async (
  id: number,
  lang: Lang,
  token: string
): Promise<void> => {
  await axios.delete(`${HOSTNAME}/api/content/questions-dashboard`, {
    data: {
      id,
      lang,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const getQuestionsByTopic = async (
  id: number,
  token: string
): Promise<Question[] | null> => {
  const response = await axios.get(
    `${HOSTNAME}/api/content/questions-dashboard/topic/${id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};
