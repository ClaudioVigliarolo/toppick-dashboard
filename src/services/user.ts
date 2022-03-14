import axios from "axios";
import { HOSTNAME } from "../config/config";
import { UserDashboard } from "@/interfaces/user";

export const getUsers = async (token: string): Promise<UserDashboard[]> => {
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

export const updateUser = async (
  user: UserDashboard,
  token: string
): Promise<void> => {
  await axios.patch(
    `${HOSTNAME}/api/users/${user.uid}`,
    { role: user.role },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
