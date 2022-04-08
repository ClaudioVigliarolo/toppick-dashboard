import axios, { AxiosResponse } from "axios";
import { HOSTNAME } from "../config/config";
import { Lang } from "@/interfaces/ui";
import { QuestionCreated, QuestionDetail } from "@toppick/common";

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
