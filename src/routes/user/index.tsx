import React from "react";
import TableUsers from "@/components/user/TableUsers";
import { AuthContext } from "@/context/AuthContext";
import SearchBar from "@/components/ui/SearchBar";
import UserDialog from "@/components/user/UserDialog";
import DeleteDialog from "@/components/ui/dialog/ConfirmDialog";
import { useAppStyles } from "@/styles/common";
import { StatusContext } from "@/context/StatusContext";
import {
  deleteUser,
  getUsers,
  updateUserRole,
} from "@toppick/common/build/api";
import { User, UserFeatured } from "@toppick/common/build/interfaces";
import { getErrorMessage } from "@toppick/common/build/utils";
import { getAuthToken } from "@/utils/auth";

export default function UsersPage() {
  const [users, setUsers] = React.useState<UserFeatured[]>([]);
  const [currentUser, setCurrentUser] = React.useState<UserFeatured | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [isShowDeleteDialog, setIsShowDeleteDialog] =
    React.useState<boolean>(false);
  const [isShowUpdateDialog, setIsShowUpdateDialog] =
    React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const { setIsAppLoading, setAppSuccess, setAppError } =
    React.useContext(StatusContext);

  const classes = useAppStyles();

  React.useEffect(() => {
    (async () => {
      setIsAppLoading(true);
      try {
        setUsers(await getUsers(await getAuthToken()));
      } catch (error) {
        setAppError();
      }
      setIsAppLoading(false);
    })();
  }, []);

  const onUpdateUser = async (updatedUser: User) => {
    setIsLoading(true);
    setError("");
    try {
      await updateUserRole(updatedUser, await getAuthToken());
      setIsShowUpdateDialog(false);
      setCurrentUser(null);
      setAppSuccess();
    } catch (error) {
      setError(getErrorMessage(error));
    }
    setIsLoading(false);
  };

  const onUpdate = (user: UserFeatured) => {
    setCurrentUser(user);
    setIsShowUpdateDialog(true);
  };

  const onDelete = (user: UserFeatured) => {
    setCurrentUser(user);
    setIsShowDeleteDialog(true);
  };

  const onDeleteSubmit = async () => {
    setIsAppLoading(true);
    try {
      await deleteUser(currentUser!.uid, await getAuthToken());
      const newUsers = users.filter((user) => user.uid !== currentUser!.uid);
      setUsers(newUsers);
      setCurrentUser(null);
      setIsShowDeleteDialog(false);
      setAppSuccess();
    } catch (error) {
      setAppError(getErrorMessage(error));
    }
    setIsAppLoading(false);
  };

  return (
    <>
      <div className={classes.headerSection}>
        <SearchBar
          placeholder="Filter Users"
          setSearchText={(text) => setSearchText(text)}
          searchText={searchText}
        />
      </div>

      <TableUsers
        users={users}
        onDelete={onDelete}
        onUpdate={onUpdate}
        searchText={searchText}
      />

      <UserDialog
        userId={currentUser ? currentUser.uid : null}
        loading={isLoading}
        open={isShowUpdateDialog}
        error={error}
        onConfirm={onUpdateUser}
        headerText="Edit User"
        onRefuse={() => {
          setIsShowUpdateDialog(false);
          setCurrentUser(null);
        }}
      />

      <DeleteDialog
        open={isShowDeleteDialog}
        onConfirm={onDeleteSubmit}
        title="Proceed to Delete this User?"
        description="The user data will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setIsShowDeleteDialog(false);
        }}
      />
    </>
  );
}
