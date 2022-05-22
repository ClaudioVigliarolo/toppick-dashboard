/* utils for inserting, modifing, removing users  */
import { deleteUser, updateUserRole } from "@/services/user";
import { UserDetail } from "@toppick/common";

export const onUserDelete = async (
  deletedUser: UserDetail,
  users: UserDetail[],
  setUsers: (users: UserDetail[]) => void,
  token: string,
  onLoading: (val: boolean) => void,
  onSuccess: (val?: string) => void,
  onError: (val?: string) => void
): Promise<void> => {
  onLoading(true);
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
  onLoading(false);
};

export const onUserUpdate = async (
  updatedUser: UserDetail,
  users: UserDetail[],
  setUsers: (users: UserDetail[]) => void,
  token: string,
  onLoading: (val: boolean) => void,
  onSuccess: (val?: string) => void,
  onError: (val?: string) => void
): Promise<void> => {
  onLoading(true);
  try {
    await updateUserRole(updatedUser, token);

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
  onLoading(false);
};
