import axios from "axios";
import {
  Category,
  CreatedUser,
  Question,
  Report,
  ReportHandled,
  Topic,
  LoggedUser,
  UpdatesResponse,
  EmailType,
  EmailInfo,
  ToTranslateTopic,
  Lang,
  StatsContent,
  StatsReport,
  UserStats,
  StatsUpdates,
  CategoryTopic,
  QuestionTopic,
} from "../interfaces/Interfaces";
import { HOSTNAME } from "../config/config";

export const getCategories = async (
  lang: Lang,
  token: string
): Promise<Category[] | null> => {
  try {
    const response = await axios.get(`${HOSTNAME}/categories/` + lang, {
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

export const getMaintenanceStatus = async (
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.get(`${HOSTNAME}/maintenance/` + lang, {
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
    const response = await axios.get(`${HOSTNAME}/categories/topics/` + lang, {
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

export const getUsers = async (
  token: string
): Promise<CreatedUser[] | null> => {
  try {
    const response = await axios.get(`${HOSTNAME}/users`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("8888888", response.data);
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
    const response = await axios.get(`${HOSTNAME}/topics/` + lang, {
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

export const getQuestionTopics = async (
  lang: Lang,
  token: string
): Promise<QuestionTopic[] | null> => {
  try {
    const response = await axios.get(`${HOSTNAME}/question/topics/` + lang, {
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

export const getToTranslateTopics = async (
  lang: Lang,
  archived: boolean,
  token: string
): Promise<ToTranslateTopic[] | null> => {
  try {
    const response = await axios.get(
      `${HOSTNAME}/totranslate/${lang}/${archived}`,
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
    const response = await axios.get(
      `${HOSTNAME}/stats/content/${from}/${until}/${lang}`,
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

export const getClientRequests = async (
  lang: Lang,
  token: string
): Promise<any | null> => {
  try {
    const response = await axios.get(`${HOSTNAME}/stats/requests/${lang}`, {
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

export const getStatsReports = async (
  from: Date,
  until: Date,
  lang: Lang,
  token: string
): Promise<StatsReport | null> => {
  try {
    const response = await axios.get(
      `${HOSTNAME}/stats/reports/${from}/${until}/${lang}`,
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

export const getStatsClientUpdates = async (
  from: Date,
  until: Date,
  lang: Lang,
  token: string
): Promise<StatsUpdates | null> => {
  try {
    const response = await axios.get(
      `${HOSTNAME}/stats/client/updates/${from}/${until}/${lang}`,
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

export const addTopic = async (
  topic: Topic,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/topics`,
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
      `${HOSTNAME}/topics`,
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
    const response = await axios.delete(`${HOSTNAME}/topics/unique`, {
      data: {
        id,
        lang,
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

//delete also the topics with same ref id in other
export const deleteTopicMany = async (
  ref_id: number,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(`${HOSTNAME}/topics/many`, {
      data: {
        ref_id,
        lang,
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

export const deleteToTranslateTopic = async (
  id: number,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(`${HOSTNAME}/totranslate`, {
      data: {
        id,
        lang,
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

export const archiveToTranslateTopic = async (
  id: number,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/totranslate/archive`,
      {
        id,
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

export const unarchiveToTranslateTopic = async (
  id: number,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/totranslate/unarchive`,
      {
        id,
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

export const deleteUser = async (
  id: number,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(`${HOSTNAME}/users`, {
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
  user: CreatedUser,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/users/register`,
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
  user: CreatedUser,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.put(
      `${HOSTNAME}/users`,
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
  user: CreatedUser,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/users/mail`,
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

export const deleteCategoryMany = async (
  ref_id: number,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(`${HOSTNAME}/categories/many`, {
      data: {
        ref_id,
        lang,
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

export const deleteCategoryUnique = async (
  id: number,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(`${HOSTNAME}/categories/unique`, {
      data: {
        id,
        lang,
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

export const addQuestion = async (
  question: Question,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/question`,
      {
        question,
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

export const addQuestions = async (
  questions: Question[],
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/questions`,
      {
        questions,
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

export const addCategory = async (
  category: Category,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/categories`,
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
      `${HOSTNAME}/categories`,
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

export const getUpdates = async (
  date: string,
  lang: Lang,
  id: number
): Promise<UpdatesResponse | null> => {
  try {
    const response = await axios.get(
      `${HOSTNAME}/updates/${id}/${date}/${lang}`
    );
    return response.status === 200 ? response.data : null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const addReport = async (
  report: Report,
  lang: Lang
): Promise<boolean> => {
  try {
    const response = await axios.post(`${HOSTNAME}/reports`, {
      report,
      lang,
    });
    return response.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const updateQuestion = async (
  question: Question,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.put(
      `${HOSTNAME}/question`,
      {
        question,
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

export const deleteReport = async (
  question_id: number,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(`${HOSTNAME}/reports`, {
      data: {
        question_id,
        lang,
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

export const deleteQuestion = async (
  id: number,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(`${HOSTNAME}/questions`, {
      data: {
        id,
        lang,
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

export const getReports = async (
  lang: Lang,
  token: string
): Promise<ReportHandled[] | null> => {
  try {
    const response = await axios.get(`${HOSTNAME}/reports/${lang}`, {
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

export const getQuestions = async (
  lang: Lang,
  token: string,
  from: number,
  to: number
): Promise<Question[] | null> => {
  try {
    const response = await axios.get(
      `${HOSTNAME}/questions/${from}/${to}/${lang}`,
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

export const login = async (
  email: string,
  password: string
): Promise<LoggedUser | null> => {
  try {
    const response = await axios.post(`${HOSTNAME}/users/login`, {
      email,
      password,
    });
    return response.status === 200 ? response.data : null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getUser = async (token: string): Promise<LoggedUser | null> => {
  try {
    const response = await axios.get(`${HOSTNAME}/users/me`, {
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
    const response = await axios.delete(`${HOSTNAME}/users/logout`, {
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
    const response = await axios.get(`${HOSTNAME}/questions/topic/${id}`, {
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

export const getGoogleTranslatedQuestions = async (
  id: number,
  from: Lang,
  to: Lang,
  token: string
): Promise<string[] | null> => {
  try {
    const response = await axios.get(
      `${HOSTNAME}/totranslate/googletranslations/${id}/${from}/${to}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.status === 200 ? response.data.translations : null;
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
    const response = await axios.get(
      `${HOSTNAME}/stats/user/${id}/${from}/${until}/${lang}`,
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

export const addToTranslateTopic = async (
  id: number,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/totranslate`,
      {
        id,
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

export const updateMaintenance = async (
  value: boolean,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.put(
      `${HOSTNAME}/maintenance`,
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
