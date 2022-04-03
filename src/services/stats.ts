import axios from "axios";
import { HOSTNAME } from "../config/config";
import { Lang } from "@/interfaces/ui";

export const getContentStats = async (
  from: Date,
  until: Date,
  lang: Lang,
  token: string
): Promise<any> => {
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
  return response.data;
};
