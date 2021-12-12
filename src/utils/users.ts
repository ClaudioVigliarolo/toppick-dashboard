/* utils for inserting, modifing, removing users  */
import { addUser, deleteUser, emailUser, updateUser } from "../api/api";
import { UserCreated, EmailInfo, EmailType } from "../interfaces/Interfaces";

export const onUserDelete = async (
  deletedUser: UserCreated,
  users: UserCreated[],
  setUsers: (users: UserCreated[]) => void,
  emailtype: EmailType,
  emailinfo: EmailInfo,
  token: string,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
): Promise<void> => {
  setLoading(true);
  const val1 = await deleteUser(deletedUser.id, token);
  const val2 = await emailUser(emailtype, emailinfo, deletedUser, token);

  if (!val1 || !val2) {
    setLoading(false);
    return onError();
  }
  const newUsers = users.filter(
    (user: UserCreated) => user.id !== deletedUser.id
  );
  setUsers([...newUsers]);
  setLoading(false);
  onSuccess();
};

export const onUserUpdate = async (
  updatedUser: UserCreated,
  users: UserCreated[],
  setUsers: (users: UserCreated[]) => void,
  emailtype: EmailType,
  emailinfo: EmailInfo,
  token: string,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
): Promise<void> => {
  setLoading(true);

  const val1 = await updateUser(updatedUser, token);

  const val2 = await emailUser(emailtype, emailinfo, updatedUser, token);

  if (!val1 || !val2) {
    setLoading(false);
    return onError();
  }
  const newUsers = users;
  newUsers.forEach(function (u: UserCreated) {
    if (u.id == updatedUser.id) {
      (u.username = updatedUser.username),
        (u.mail = updatedUser.mail),
        (u.password = updatedUser.password),
        (u.type = updatedUser.type),
        (u.languages = updatedUser.languages);
    }
  });

  setUsers([...newUsers]);
  setLoading(false);
  onSuccess();
};

export const onUserAdd = async (
  newUser: UserCreated,
  users: UserCreated[],
  setUsers: (users: UserCreated[]) => void,
  emailtype: EmailType,
  emailinfo: EmailInfo,
  token: string,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
): Promise<void> => {
  setLoading(true);
  const val1 = await addUser(newUser, token);
  const val2 = await emailUser(emailtype, emailinfo, newUser, token);

  if (!val1 || !val2) {
    setLoading(false);
    return onError();
  }

  const newUsers = users;
  newUsers.unshift(newUser);
  setUsers([...newUsers]);
  setLoading(false);
  onSuccess();
};

export const onUserMessage = async (
  user: UserCreated,
  emailtype: EmailType,
  emailinfo: EmailInfo,
  token: string,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
): Promise<void> => {
  setLoading(true);
  const val = await emailUser(emailtype, emailinfo, user, token);

  if (!val) {
    setLoading(false);
    return onError();
  }
  setLoading(false);
  onSuccess();
};
