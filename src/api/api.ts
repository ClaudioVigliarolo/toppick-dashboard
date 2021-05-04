import axios from "axios";
import {
  Category,
  CreatedUser,
  Question,
  Report,
  ReportHandled,
  Topic,
  LoggedUser,
  Email,
  UpdatesResponse,
  EmailType,
  LocalsEmail,
  EmailInfo,
  ToTranslateTopic,
  Lang,
  StatsContent,
  StatsUser,
  StatsReport,
  UserStats,
  StatsUpdates,
} from "../interfaces/Interfaces";
import { HOSTNAME } from "../config/config";

export const getCategories = async (
  lang: Lang,
  token: string
): Promise<Category[] | null> => {
  console.log("getc ategoris tiktok", lang);
  try {
    const response = await axios.get(
      `${HOSTNAME}/topick/get_categories/` + lang,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.status == 200 ? response.data : null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getUsers = async (
  token: string
): Promise<CreatedUser[] | null> => {
  try {
    const response = await axios.get(`${HOSTNAME}/users/all`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.status == 200 ? response.data.users : null;
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
    const response = await axios.get(`${HOSTNAME}/topick/get_topics/` + lang, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.status == 200 ? response.data.topics : null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getToTranslateTopics = async (
  lang: Lang,
  token: string
): Promise<ToTranslateTopic[] | null> => {
  try {
    const response = await axios.get(
      `${HOSTNAME}/topick/get_totranslate_topics/` + lang,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.status == 200 ? response.data.toTranslate : null;
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
      `${HOSTNAME}/stats/get_content/${from}/${until}/${lang}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.status == 200 ? response.data : null;
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
    const response = await axios.get(
      `${HOSTNAME}/stats/get_clientrequests/${lang}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.status == 200 ? response.data : null;
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
      `${HOSTNAME}/stats/get_reports/${from}/${until}/${lang}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.status == 200 ? response.data : null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getStatsUpdates = async (
  from: Date,
  until: Date,
  lang: Lang,
  token: string
): Promise<StatsUpdates | null> => {
  try {
    const response = await axios.get(
      `${HOSTNAME}/stats/get_clientupdates/${from}/${until}/${lang}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.status == 200 ? response.data : null;
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
      `${HOSTNAME}/topick/add_topic`,
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
    return response.status == 200;
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
      `${HOSTNAME}/topick/update_topic`,
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
    return response.status == 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const deleteTopic = async (
  ref_id: number,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(`${HOSTNAME}/topick/delete_topic`, {
      data: {
        ref_id,
        lang,
      },

      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.status == 200;
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
    const response = await axios.delete(
      `${HOSTNAME}/topick/delete_totranslate_topic`,
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
    return response.status == 200;
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
    const response = await axios.delete(`${HOSTNAME}/users/delete`, {
      data: {
        id,
      },

      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.status == 201;
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

    return response.status == 201;
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
      `${HOSTNAME}/users/update`,
      {
        user,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.status == 200;
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

    return response.status == 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const deleteCategory = async (
  ref_id: number,
  lang: Lang,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(`${HOSTNAME}/topick/delete_category`, {
      data: {
        ref_id,
        lang,
      },

      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.status == 200;
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
      `${HOSTNAME}/topick/add_question`,
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
    return response.status == 200;
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
      `${HOSTNAME}/topick/add_questions`,
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
    return response.status == 200;
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
      `${HOSTNAME}/topick/add_category`,
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
    return response.status == 200;
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
      `${HOSTNAME}/topick/update_category`,
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
    return response.status == 200;
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
      `${HOSTNAME}/topick/get_updates/${id}/${date}/${lang}`
    );
    return response.status == 200 ? response.data : null;
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
    const response = await axios.post(`${HOSTNAME}/topick/add_report`, {
      report,
      lang,
    });
    return response.status == 200;
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
      `${HOSTNAME}/topick/update_question`,
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
    return response.status == 200;
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
    const response = await axios.delete(`${HOSTNAME}/topick/delete_report`, {
      data: {
        question_id,
        lang,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.status == 200;
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
    const response = await axios.delete(`${HOSTNAME}/topick/delete_question`, {
      data: {
        id,
        lang,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.status == 200;
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
    const response = await axios.get(`${HOSTNAME}/topick/get_reports/${lang}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.status == 200 ? response.data.reports : null;
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
      `${HOSTNAME}/topick/get_questions/${from}/${to}/${lang}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.status == 200 ? response.data : null;
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
    return response.status == 200 ? response.data : null;
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
    return response.status == 200 ? response.data.user : null;
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
    const response = await axios.get(
      `${HOSTNAME}/topick/get_topic_questions/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.status == 200 ? response.data : null;
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
      `${HOSTNAME}/topick/get_google_translated_questions/${id}/${from}/${to}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.status == 200 ? response.data.translations : null;
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
      `${HOSTNAME}/stats/get_user/${id}/${from}/${until}/${lang}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.status == 200 ? response.data : null;
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
      `${HOSTNAME}/topick/add_totranslate_topic`,
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
    return response.status == 200;
  } catch (err) {
    console.log(err);
    return false;
  }
};
