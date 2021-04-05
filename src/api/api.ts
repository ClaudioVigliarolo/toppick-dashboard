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
  ReportResponse,
  UpdatesResponse,
} from "../interfaces/Interfaces";
import { HOSTNAME } from "../config/config";

export const getCategories = async (
  lang: string,
  token: string
): Promise<Category[] | null> => {
  console.log("getc ategoris tiktok", token);
  try {
    const response = await axios.get(
      `${HOSTNAME}/topicks/get_categories/` + lang,
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
  lang: string,
  token: string
): Promise<Topic[] | null> => {
  try {
    const response = await axios.get(`${HOSTNAME}/topicks/get_topics/` + lang, {
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

export const addTopic = async (
  topic: Topic,
  lang: string,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/topicks/add_topic`,
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
  lang: string,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.put(
      `${HOSTNAME}/topicks/update_topic`,
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
  id: number,
  lang: string,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(`${HOSTNAME}/topicks/delete_topic`, {
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
  email: Email,
  sender: string,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/users/mail`,
      {
        email,
        sender,
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
  id: number,
  lang: string,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(`${HOSTNAME}/topicks/delete_category`, {
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

export const addQuestion = async (
  question: Question,
  lang: string,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/topicks/add_question`,
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

export const addCategory = async (
  title: string,
  id: number,
  lang: string,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${HOSTNAME}/topicks/add_category`,
      {
        title,
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

export const updateCategory = async (
  title: string,
  id: number,
  lang: string,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.put(
      `${HOSTNAME}/topicks/update_category`,
      {
        title,
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

export const getUpdates = async (
  date: string,
  lang: string
): Promise<UpdatesResponse | null> => {
  try {
    const response = await axios.get(
      `${HOSTNAME}/topicks/get_updates/${date}/${lang}`
    );
    return response.status == 200 ? response.data : null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const addReport = async (
  report: Report,
  lang: string
): Promise<boolean> => {
  try {
    const response = await axios.post(`${HOSTNAME}/topicks/add_report`, {
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
  lang: string,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.put(
      `${HOSTNAME}/topicks/update_question`,
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
  id: number,
  lang: string,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(`${HOSTNAME}/topicks/delete_report`, {
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

export const deleteQuestion = async (
  id: number,
  lang: string,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(`${HOSTNAME}/topicks/delete_question`, {
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
  lang: string,
  token: string
): Promise<ReportResponse | null> => {
  try {
    const response = await axios.get(
      `${HOSTNAME}/topicks/get_reports/${lang}`,
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

export const getQuestions = async (
  lang: string,
  token: string,
  from: number,
  to: number
): Promise<Question[] | null> => {
  try {
    const response = await axios.get(
      `${HOSTNAME}/topicks/get_questions/${from}/${to}/${lang}`,
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
