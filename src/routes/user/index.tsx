import React from "react";
import TableUsers from "@/components/user/TableUsers";
import { AuthContext } from "@/context/AuthContext";
import SearchBar from "@/components/ui/SearchBar";
import UserDialog from "@/components/user/UserDialog";
import DeleteDialog from "@/components/ui/dialog/ConfirmDialog";
import { useAppStyles } from "@/styles/common";
import { onUserDelete, onUserUpdate } from "@/utils/users";
import { StatusContext } from "@/context/StatusContext";
import { getUsers } from "@/services/user";
import { UserDetail, UserRole } from "@toppick/common";

const NO_USER: UserDetail = {
  username: "",
  email: "",
  role: UserRole.Default,
  country: "",
  firstname: "",
  image: "",
  language: "",
  lastname: "",
  user_interests: [],
  user_languages: [],
  profession: "",
  uid: "",
};

export default function UsersPage() {
  const { authToken } = React.useContext(AuthContext);
  const [users, setUsers] = React.useState<UserDetail[]>([]);
  const [currentUser, setCurrentUser] = React.useState<UserDetail>(NO_USER);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const { onLoading, onSuccess, onError, loading } =
    React.useContext(StatusContext);

  const classes = useAppStyles();

  React.useEffect(() => {
    (async () => {
      onLoading(true);
      try {
        const retrievedUsers = await getUsers(authToken);
        if (retrievedUsers) {
          //filter the root user from the list
          setUsers(retrievedUsers);
        }
      } catch (error) {
        onError();
      }
      onLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  const onUpdateSubmit = (user: UserDetail) => {
    onUserUpdate(
      {
        ...user,
      },
      users,
      setUsers,
      authToken,
      onLoading,
      () => {
        setEditDialog(false);
        onSuccess();
      },
      onError
    );
  };

  const onUpdate = (user: UserDetail) => {
    setCurrentUser(user);
    setEditDialog(true);
  };

  const onDelete = (user: UserDetail) => {
    setCurrentUser(user);
    setDeleteDialog(true);
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
        user={currentUser}
        loading={loading}
        open={editDialog}
        onConfirm={onUpdateSubmit}
        headerText="Edit User"
        onRefuse={() => {
          setEditDialog(false);
          setCurrentUser(NO_USER);
        }}
      />

      <DeleteDialog
        open={deleteDialog}
        onConfirm={() => {
          onUserDelete(
            currentUser,
            users,
            setUsers,
            authToken,
            onLoading,
            onSuccess,
            onError
          );
          setDeleteDialog(false);
        }}
        title="Proceed to Delete this User?"
        description="The user data will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setDeleteDialog(false);
        }}
      />
    </>
  );
}
