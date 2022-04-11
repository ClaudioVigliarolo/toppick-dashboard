import axios, { AxiosResponse } from "axios";

import { HOSTNAME } from "../config/config";
import { SearchKeyword } from "@toppick/common";

export const getSearchInfo = async (
  token: string,
  topic_id: number
): Promise<{ hasNews: boolean; keywords: SearchKeyword[] }> => {
  const response = await axios.get(`${HOSTNAME}/api/search/info`, {
    params: {
      topic_id,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

export const updateSearchKeywords = async (
  token: string,
  topic_id: number,
  keywords: SearchKeyword[],
  has_news: boolean
): Promise<SearchKeyword[]> => {
  const response = await axios.put(
    `${HOSTNAME}/api/search/info`,
    {
      keywords,
      has_news,
    },
    {
      params: {
        topic_id,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};
