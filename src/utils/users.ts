/* utils for inserting, modifing, removing users  */
import { UserDashboard } from "@/interfaces/user";
import { deleteUser, updateUser } from "@/services/user";

export const onUserDelete = async (
  deletedUser: UserDashboard,
  users: UserDashboard[],
  setUsers: (users: UserDashboard[]) => void,
  token: string,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
): Promise<void> => {
  setLoading(true);
  try {
    await deleteUser(deletedUser.uid, token);
    const newUsers = users.filter(
      (user: UserDashboard) => user.uid !== deletedUser.uid
    );
    setUsers([...newUsers]);
    onSuccess();
  } catch (error) {
    onError();
  }
  setLoading(false);
};

export const onUserUpdate = async (
  updatedUser: UserDashboard,
  users: UserDashboard[],
  setUsers: (users: UserDashboard[]) => void,
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
      (user: UserDashboard) => user.uid == updatedUser.uid
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
