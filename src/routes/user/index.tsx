import React from "react";
import TableUsers from "@/components/user/TableUsers";
import { AuthContext } from "@/context/AuthContext";
import SearchBar from "@/components/ui/SearchBar";
import UserDialog from "@/components/user/UserDialog";
import DeleteDialog from "@/components/ui/dialog/ConfirmDialog";
import { useAppStyles } from "@/styles/common";
import { onUserDelete, onUserUpdate } from "@/utils/users";
import { UserDashboard, UserRole } from "@/interfaces/user";
import { StatusContext } from "@/context/StatusContext";
import { getUsers } from "@/services/user";

const NO_USER: UserDashboard = {
  username: "",
  email: "",
  role: UserRole.DEFAULT,
  uid: "",
};

export default function UsersPage() {
  const { authToken } = React.useContext(AuthContext);
  const [users, setUsers] = React.useState<UserDashboard[]>([]);
  const [currentUser, setCurrentUser] = React.useState<UserDashboard>(NO_USER);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const { setLoading, onSuccess, onError, loading } =
    React.useContext(StatusContext);

  const classes = useAppStyles();

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const retrievedUsers = await getUsers(authToken);
        if (retrievedUsers) {
          //filter the root user from the list
          setUsers(retrievedUsers);
        }
      } catch (error) {
        onError();
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  const onUpdateSubmit = (user: UserDashboard) => {
    onUserUpdate(
      {
        ...user,
      },
      users,
      setUsers,
      authToken,
      setLoading,
      onSuccess,
      onError
    );
  };

  const onUpdate = (user: UserDashboard) => {
    setCurrentUser(user);
    setEditDialog(true);
  };

  const onDelete = (user: UserDashboard) => {
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
            setLoading,
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
