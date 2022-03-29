import { UserDetail } from "@toppick/common";
import axios from "axios";
import { HOSTNAME } from "../config/config";

export const getUsers = async (token: string): Promise<UserDetail[]> => {
  const response = await axios.get(`${HOSTNAME}/api/users/all`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

export const deleteUser = async (id: string, token: string): Promise<void> => {
  await axios.delete(`${HOSTNAME}/api/users/delete`, {
    data: {
      id,
    },

    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const updateUserRole = async (
  user: UserDetail,
  token: string
): Promise<void> => {
  await axios.patch(
    `${HOSTNAME}/api/users/${user.uid}/role`,
    { role: user.role },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
