/* utils for inserting, modifing, removing topics  */
import {
  Category,
  CreatedUser,
  EmailType,
  Question,
  Related,
  Report,
  ReportHandled,
  Topic,
  User,
} from "../interfaces/Interfaces";
import {
  addCategory,
  addQuestion,
  addQuestions,
  addTopic,
  addUser,
  deleteCategory,
  deleteQuestion,
  deleteReport,
  deleteTopic,
  deleteUser,
  emailUser,
  updateCategory,
  updateQuestion,
  updateTopic,
  updateUser,
} from "../api/api";
import { getCurrentTime, getHash } from "../utils/utils";
import { CONSTANTS } from "../constants/constants";

export const onUserDelete = async (
  updatedUser: CreatedUser,
  users: CreatedUser[],
  setUsers: (users: CreatedUser[]) => void,
  email: string,
  token: string,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
): Promise<void> => {
  setLoading(true);
  const val1 = await deleteUser(updatedUser.id, token);
  const val2 = await emailUser(
    {
      username: updatedUser.username,
      email: updatedUser.email,
      password: "",
      languages: updatedUser.languages,
      subject: "Account Removal",
      template: EmailType.Removal,
    },
    email,
    token
  );

  if (!val1 || !val2) {
    setError(true);
    setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
    return;
  }
  const newUsers = users.filter(
    (user: CreatedUser) => user.id != updatedUser.id
  );
  setUsers([...newUsers]);
  setSuccess(true);
  setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  setLoading(false);
};

export const onUserUpdate = async (
  updatedUser: CreatedUser,
  users: CreatedUser[],
  setUsers: (users: CreatedUser[]) => void,
  email: string,
  token: string,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
): Promise<void> => {
  setLoading(true);

  const val1 = await updateUser(updatedUser, token);

  const val2 = await emailUser(
    {
      username: updatedUser.username,
      email: updatedUser.email,
      password: updatedUser.password,
      languages: updatedUser.languages,
      subject: "Updated Credentials",
      template: EmailType.Update,
    },
    email,
    token
  );

  if (!val1 || !val2) {
    setLoading(false);
    setError(true);
    setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
    return;
  }
  const newUsers = users;
  newUsers.forEach(function (u: CreatedUser) {
    if (u.id == updatedUser.id) {
      (u.username = updatedUser.username),
        (u.email = updatedUser.email),
        (u.password = updatedUser.password),
        (u.type = updatedUser.type),
        (u.languages = updatedUser.languages);
    }
  });

  setSuccess(true);
  setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  setUsers([...newUsers]);
  setLoading(false);
};

export const onUserAdd = async (
  newUser: CreatedUser,
  users: CreatedUser[],
  setUsers: (users: CreatedUser[]) => void,
  email: string,
  token: string,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
): Promise<void> => {
  setLoading(true);
  const val1 = await addUser(newUser, token);

  const val2 = await emailUser(
    {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      languages: newUser.languages,
      subject: "Registration",
      template: EmailType.Registration,
    },
    email,
    token
  );

  if (!val1 || !val2) {
    setLoading(false);
    setError(true);
    setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
    return;
  }

  const newUsers = users;
  newUsers.unshift(newUser);
  setSuccess(true);
  setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);

  setUsers([...newUsers]);

  setLoading(false);
};
