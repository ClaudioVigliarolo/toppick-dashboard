/* utils for inserting, modifing, removing users  */
import { CreatedUser, EmailInfo, EmailType } from "../interfaces/Interfaces";
import { addUser, deleteUser, emailUser, updateUser } from "../api/api";
import { CONSTANTS } from "../constants/constants";

export const onUserDelete = async (
  deletedUser: CreatedUser,
  users: CreatedUser[],
  setUsers: (users: CreatedUser[]) => void,
  emailtype: EmailType,
  emailinfo: EmailInfo,
  token: string,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
): Promise<void> => {
  setLoading(true);
  const val1 = await deleteUser(deletedUser.id, token);
  const val2 = await emailUser(emailtype, emailinfo, deletedUser, token);

  if (!val1 || !val2) {
    setError(true);
    setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
    return;
  }
  const newUsers = users.filter(
    (user: CreatedUser) => user.id != deletedUser.id
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
  emailtype: EmailType,
  emailinfo: EmailInfo,
  token: string,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
): Promise<void> => {
  setLoading(true);

  const val1 = await updateUser(updatedUser, token);

  const val2 = await emailUser(emailtype, emailinfo, updatedUser, token);

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
  emailtype: EmailType,
  emailinfo: EmailInfo,
  token: string,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
): Promise<void> => {
  setLoading(true);
  const val1 = await addUser(newUser, token);

  const val2 = await emailUser(emailtype, emailinfo, newUser, token);

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
