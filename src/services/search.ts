import axios, { AxiosError, AxiosResponse } from "axios";
import { HOSTNAME } from "../config/config";
import {
  SearchKeyword,
  SearchKeywordCreated,
  SearchResultArticle,
  SearchResultImage,
  SearchResultVideo,
} from "@toppick/common";

export const getSearchKeywords = async (
  token: string,
  topic_id: number,
  search_type: string,
  include_inactive: boolean
): Promise<SearchKeyword[]> => {
  const response = await axios.get(`${HOSTNAME}/api/search/keywords`, {
    params: {
      topic_id,
      search_type,
      include_inactive,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

export const createSearchKeyword = async (
  token: string,
  keyword: SearchKeywordCreated
): Promise<SearchKeyword> => {
  const response = await axios.post(
    `${HOSTNAME}/api/search/keywords`,
    {
      keyword,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const updateSearchKeyword = async (
  token: string,
  id: number,
  keyword: SearchKeywordCreated
): Promise<SearchKeyword> => {
  const response = await axios.patch(
    `${HOSTNAME}/api/search/keywords/${id}`,
    {
      keyword,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const deleteSearchKeyword = async (
  token: string,
  keywordId: number
): Promise<SearchKeyword[]> => {
  const response = await axios.delete(
    `${HOSTNAME}/api/search/keywords/${keywordId}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const getSearchResultsArticle = async (
  token: string,
  keyword_id: number,
  limit: number,
  skip: number
): Promise<SearchResultArticle[]> => {
  const response = await axios.get(`${HOSTNAME}/api/search/results/articles`, {
    params: {
      keyword_id,
      limit,
      skip,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

export const getSearchResultsVideo = async (
  token: string,
  keyword_id: number,
  limit: number,
  skip: number
): Promise<SearchResultVideo[]> => {
  const response = await axios.get(`${HOSTNAME}/api/search/results/videos`, {
    params: {
      keyword_id,
      limit,
      skip,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

export const getSearchResultsImage = async (
  token: string,
  keyword_id: number,
  limit: number,
  skip: number
): Promise<SearchResultVideo[]> => {
  const response = await axios.get(`${HOSTNAME}/api/search/results/images`, {
    params: {
      keyword_id,
      limit,
      skip,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

export const sortSearchKeywords = async (
  token: string,
  keywords: { id: number; index: number }[]
): Promise<AxiosResponse> => {
  return await axios.patch(
    `${HOSTNAME}/api/search/keywords/sort`,
    {
      keywords,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const deleteSearchResultArticle = async (
  token: string,
  id: number
): Promise<AxiosResponse> => {
  const response = await axios.delete(
    `${HOSTNAME}/api/search/results/articles/${id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const deleteSearchResultVideo = async (
  token: string,
  id: number
): Promise<AxiosResponse> => {
  const response = await axios.delete(
    `${HOSTNAME}/api/search/results/videos/${id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const deleteSearchResultImage = async (
  token: string,
  id: number
): Promise<AxiosResponse> => {
  const response = await axios.delete(
    `${HOSTNAME}/api/search/results/images/${id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const createSearchResultArticle = async (
  token: string,
  link: string,
  keyword_id: number
): Promise<SearchResultArticle> => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/api/search/results/articles`,
      {
        link,
        keyword_id,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(err.response?.data);
  }
};

export const createSearchResultVideo = async (
  token: string,
  link: string,
  keyword_id: number
): Promise<SearchResultVideo> => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/api/search/results/videos`,
      {
        link,
        keyword_id,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(err.response?.data);
  }
};

export const createSearchResultImage = async (
  token: string,
  link: string,
  keyword_id: number
): Promise<SearchResultImage> => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/api/search/results/images`,
      {
        link,
        keyword_id,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(err.response?.data);
  }
};

export const updateSearchResultArticle = async (
  token: string,
  id: number,
  link: string
): Promise<SearchResultArticle> => {
  try {
    const response = await axios.put(
      `${HOSTNAME}/api/search/results/articles/${id}`,
      {
        link,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(err.response?.data);
  }
};

export const updateSearchResultVideo = async (
  token: string,
  id: number,
  link: string
): Promise<SearchResultVideo> => {
  try {
    const response = await axios.put(
      `${HOSTNAME}/api/search/results/videos/${id}`,
      {
        link,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(err.response?.data);
  }
};

export const updateSearchResultImage = async (
  token: string,
  id: number,
  link: string
): Promise<SearchResultImage> => {
  try {
    const response = await axios.put(
      `${HOSTNAME}/api/search/results/images/${id}`,
      {
        link,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    throw new Error(err.response?.data);
  }
};
