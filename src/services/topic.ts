import axios, { AxiosResponse } from "axios";
import { HOSTNAME } from "../config/config";
import { Lang } from "@/interfaces/ui";
import {
  TopicDetail,
  TopicFeatured,
  DashLabel,
  TopicCreated,
} from "@toppick/common";

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
  const response = await axios.get(`${HOSTNAME}/api/content/topics`, {
    params: {
      include_inactive: true,
      take_all: true,
      sort_by_timestamp: true,
    },
  });
  return response.data;
};

export const getTopicDetails = async (title: string): Promise<TopicDetail> => {
  const response = await axios.get(`${HOSTNAME}/api/content/topics/details`, {
    params: {
      title,
    },
  });
  console.log("ddddd", title);
  return response.data;
};

export const getTopicLabels = async ({
  id,
  type,
  take_all,
}: {
  id?: number;
  type: string;
  take_all?: boolean;
}): Promise<DashLabel[]> => {
  const response = await axios.get(`${HOSTNAME}/api/content/topics/labels`, {
    params: {
      id,
      type,
      take_all,
    },
  });
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
