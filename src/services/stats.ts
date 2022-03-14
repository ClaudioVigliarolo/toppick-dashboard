import axios from "axios";
import { HOSTNAME } from "../config/config";
import { StatsContent, UserStats } from "@/interfaces/stats";
import { Lang } from "@/interfaces/app";

export const getContentStats = async (
  from: Date,
  until: Date,
  lang: Lang,
  token: string
): Promise<StatsContent> => {
  const response = await axios.get(`${HOSTNAME}/api/stats/content`, {
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      from,
      until,
      lang,
    },
  });
  console.log("mY RRR STATS", response.data);
  return response.data;
};

export const getUserStats = async (
  id: number,
  from: Date,
  until: Date,
  lang: Lang,
  token: string
): Promise<UserStats | null> => {
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
  return response.data;
};
