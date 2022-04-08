import axios, { AxiosResponse } from "axios";

import { HOSTNAME } from "../config/config";
import { SearchKeyword } from "@toppick/common";

export const getSearchKeywords = async (
  token: string,
  topic_id: number
): Promise<SearchKeyword[]> => {
  const response = await axios.get(`${HOSTNAME}/api/search/keywords`, {
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
  keywords: SearchKeyword[]
): Promise<SearchKeyword[]> => {
  const response = await axios.put(
    `${HOSTNAME}/api/search/keywords`,
    {
      keywords,
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
