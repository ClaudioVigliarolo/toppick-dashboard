import axios from "axios";
import { HOSTNAME } from "../config/config";
import { Lang } from "@/interfaces/app";

export const getMaintenanceStatus = async (
  lang: Lang,
  token: string
): Promise<boolean> => {
  const response = await axios.get(`${HOSTNAME}/api/db/maintenance/` + lang, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

export const updateMaintenance = async (
  value: boolean,
  lang: Lang,
  token: string
): Promise<void> => {
  await axios.put(
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
};
