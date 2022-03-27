import axios, { AxiosResponse } from "axios";

import { HOSTNAME } from "../config/config";
import { Lang } from "@/interfaces/ui";
import {
  CategoryDetail,
  CategoryFeatured,
  TopicDetail,
  TopicFeatured,
  DashLabel,
  TopicCreated,
  CategoryCreated,
  QuestionCreated,
  QuestionDetail,
} from "@toppick/common";

export async function getFeaturedCategories(): Promise<CategoryFeatured[]> {
  const response = await axios.get(
    `${HOSTNAME}/api/content/categories/featured`
  );
  return response.data;
}

export const getTopicsByCategory = async (
  id: number,
  limit: number,
  skip: number
): Promise<TopicFeatured[]> => {
  const response = await axios.get(
    `${HOSTNAME}/api/content/categories/${id}/topics`,
    {
      params: {
        limit,
        skip,
      },
    }
  );
  return response.data;
};

export const getTopicsList = async (
  id: number,
  limit: number,
  skip: number
): Promise<TopicFeatured[]> => {
  const response = await axios.get(`${HOSTNAME}/api/content/topics/list`, {
    params: {
      limit,
      skip,
    },
  });
  return response.data;
};

export const getAllTopics = async (): Promise<TopicFeatured[]> => {
  const response = await axios.get(`${HOSTNAME}/api/content/topics/all`, {
    params: {
      limit: 10000,
      skip: 0,
      category_id: null,
      include_inactive: true,
      sort_by_timestamp: true,
    },
  });
  return response.data;
};

export const getTopicDetails = async (title: string): Promise<TopicDetail> => {
  const response = await axios.get(
    `${HOSTNAME}/api/content/topics/${title}/details`
  );
  return response.data;
};

export const getTopicsLabels = async (
  id: number | string,
  type?: string
): Promise<DashLabel[]> => {
  const response = await axios.get(`${HOSTNAME}/api/content/topics/labels`, {
    params: {
      id,
      type,
    },
  });
  return response.data;
};

export const getCategoriesLabels = async (
  id: number | string
): Promise<DashLabel[]> => {
  const response = await axios.get(
    `${HOSTNAME}/api/content/categories/labels`,
    {
      params: {
        id,
      },
    }
  );
  return response.data;
};

export const getCategoryDetails = async (
  title: string
): Promise<CategoryDetail> => {
  const response = await axios.get(
    `${HOSTNAME}/api/content/categories/${title}/details`,
    {}
  );
  return response.data;
};

export const createTopic = async (
  topic: TopicCreated,
  lang: Lang,
  token: string
): Promise<TopicDetail> => {
  const res = await axios.post(
    `${HOSTNAME}/api/content/topics`,
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
  return res.data;
};

export const updateTopic = async (
  topic: TopicCreated,
  lang: Lang,
  token: string
): Promise<TopicDetail> => {
  const res = await axios.patch(
    `${HOSTNAME}/api/content/topics/${topic.id}`,
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
  return res.data;
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
  await axios.delete(`${HOSTNAME}/api/content/categories/`, {
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
  questions: QuestionCreated[],
  topicId: number,
  lang: Lang,
  token: string
): Promise<AxiosResponse> => {
  const res = await axios.put(
    `${HOSTNAME}/api/content/questions/batch`,
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
  return res.data;
};

export const createCategory = async (
  category: CategoryCreated,
  lang: Lang,
  token: string
): Promise<CategoryDetail> => {
  const res = await axios.post(
    `${HOSTNAME}/api/content/categories`,
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
  return res.data;
};

export const updateCategory = async (
  category: CategoryCreated,
  lang: Lang,
  token: string
): Promise<CategoryDetail> => {
  console.log("TO UPPP", category.topics);
  const response = await axios.patch(
    `${HOSTNAME}/api/content/categories/${category.id}`,
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
  return response.data;
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

export const getQuestions = async (
  topic_id: number
): Promise<QuestionDetail[]> => {
  const response = await axios.get(`${HOSTNAME}/api/content/questions/old`, {
    params: {
      topic_id,
      order_by_n: true,
      limit: 1000,
      skip: 0,
    },
  });
  return response.data;
};
