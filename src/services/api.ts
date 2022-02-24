import axios from "axios";
import {
  Category,
  Question,
  Topic,
  CategoryTopic,
} from "../interfaces/dash_topics";

import { HOSTNAME } from "../config/config";
import { UserCreated, UserLogged } from "@/interfaces/dash_user";
import { EmailInfo, EmailType } from "@/interfaces/dash_mail";
import { StatsContent, UserStats } from "@/interfaces/stats";
import { Lang } from "@/interfaces/app";

export const getCategories = async (
  lang: Lang,
  token: string
): Promise<Category[] | null> => {
  try {
    const response = await axios.get(
      `${HOSTNAME}/api/content/categories-dashboard/` + lang,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return response.status === 200 ? response.data : null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getMaintenanceStatus = async (
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.get(`${HOSTNAME}/api/db/maintenance/` + lang, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.status === 200 ? response.data : false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getCategoryTopics = async (
  lang: Lang,
  token: string
): Promise<CategoryTopic[] | null> => {
  try {
    const response = await axios.get(
      `${HOSTNAME}/api/content/categories-dashboard/topics/` + lang,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.status === 200 ? response.data : null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getUsers = async (
  token: string
): Promise<UserCreated[] | null> => {
  try {
    const response = await axios.get(`${HOSTNAME}/api/users/get`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.status === 200 ? response.data : null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getTopics = async (
  lang: Lang,
  token: string
): Promise<Topic[] | null> => {
  try {
    const response = await axios.get(
      `${HOSTNAME}/api/content/topics-dashboard/` + lang,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.status === 200 ? response.data : null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

//it will return the stats of all the content: number of questions, topics,
export const getStatsContent = async (
  from: Date,
  until: Date,
  lang: Lang,
  token: string
): Promise<StatsContent | null> => {
  try {
    const response = await axios.get(`${HOSTNAME}/api/stats/content/get`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        from,
        until,
        lang,
      },
    });
    return response.status === 200 ? response.data : null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const addTopic = async (
  topic: Topic,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
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
    return response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateTopic = async (
  topic: Topic,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.put(
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
    return response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

//delete only the topic for the selected lang
export const deleteTopicUnique = async (
  id: number,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
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
    return response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const deleteUser = async (
  id: number,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(`${HOSTNAME}/api/users/delete`, {
      data: {
        id,
      },

      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

//updateCategory
export const addUser = async (
  user: UserCreated,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/api/users/register`,
      {
        user,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.status === 201;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateUser = async (
  user: UserCreated,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.put(
      `${HOSTNAME}/api/users/update`,
      {
        user,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const emailUser = async (
  emailtype: EmailType,
  emailinfo: EmailInfo,
  user: UserCreated,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/api/users/mail`,
      {
        emailinfo,
        user,
        emailtype,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const deleteCategoryUnique = async (
  id: number,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(
      `${HOSTNAME}/api/content/categories-dashboard/`,
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
    return response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addQuestions = async (
  questions: Question[],
  topicId: number,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
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
    return response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const createCategory = async (
  category: Category,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
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
    return response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateCategory = async (
  category: Category,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.put(
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
    return response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const deleteQuestion = async (
  id: number,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(
      `${HOSTNAME}/api/content/questions-dashboard`,
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
    return response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const login = async (
  email: string,
  password: string
): Promise<UserLogged | null> => {
  try {
    const response = await axios.post(`${HOSTNAME}/api/users/login`, {
      email,
      password,
    });
    return response.status === 200 ? response.data : null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getUser = async (token: string): Promise<UserLogged | null> => {
  try {
    const response = await axios.get(`${HOSTNAME}/api/users/me`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.status === 200 ? response.data.user : null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const logoutUser = async (token: string): Promise<string[] | null> => {
  try {
    const response = await axios.delete(`${HOSTNAME}/api/users/logout`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      data: {
        token,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getQuestionsByTopic = async (
  id: number,
  token: string
): Promise<Question[] | null> => {
  try {
    const response = await axios.get(
      `${HOSTNAME}/api/content/questions-dashboard/topic/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.status === 200 ? response.data : null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getUserStats = async (
  id: number,
  from: Date,
  until: Date,
  lang: Lang,
  token: string
): Promise<UserStats | null> => {
  try {
    const response = await axios.get(`${HOSTNAME}/api/stats/api/users/get`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        id,
        from,
        until,
        lang,
      },
    });
    return response.status === 200 ? response.data : null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updateMaintenance = async (
  value: boolean,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.put(
      `${HOSTNAME}/api/db/maintenance`,
      {
        value,
        lang,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};
