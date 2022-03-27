/* utils for inserting, modifing, removing users  */
import { deleteUser, updateUser } from "@/services/user";
import { UserDetail } from "@toppick/common";

export const onUserDelete = async (
  deletedUser: UserDetail,
  users: UserDetail[],
  setUsers: (users: UserDetail[]) => void,
  token: string,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
): Promise<void> => {
  setLoading(true);
  try {
    await deleteUser(deletedUser.uid, token);
    const newUsers = users.filter(
      (user: UserDetail) => user.uid !== deletedUser.uid
    );
    setUsers([...newUsers]);
    onSuccess();
  } catch (error) {
    onError();
  }
  setLoading(false);
};

export const onUserUpdate = async (
  updatedUser: UserDetail,
  users: UserDetail[],
  setUsers: (users: UserDetail[]) => void,
  token: string,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
): Promise<void> => {
  setLoading(true);
  try {
    await updateUser(updatedUser, token);

    const newUsers = users;

    const userIndex = users.findIndex(
      (user: UserDetail) => user.uid == updatedUser.uid
    );

    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
    }

    setUsers([...newUsers]);
    onSuccess();
  } catch (error) {
    onError();
  }
  setLoading(false);
};
