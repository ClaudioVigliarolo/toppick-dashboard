import React from "react";
import TableUsers from "@/components/user/TableUsers";
import { AuthContext } from "@/context/AuthContext";
import SearchBar from "@/components/ui/SearchBar";
import CustomButton from "@/components/ui/buttons/Button";
import UserDialog from "@/components/user/UserDialog";
import DeleteDialog from "@/components/ui/dialog/ConfirmDialog";
import MessageDialog from "@/components/user/MessageDialog";
import { getHash, noSpace } from "@/utils/utils";
import { useAppStyles } from "@/styles/common";
import { getUsers } from "@/services/api";
import {
  onUserAdd,
  onUserDelete,
  onUserMessage,
  onUserUpdate,
} from "@/utils/users";
import { EmailSubject, EmailType } from "@/interfaces/dash_mail";
import { PageProps } from "@/interfaces/app";
import { UserCreated } from "@/interfaces/dash_user";

const NO_USER: UserCreated = {
  id: -1,
  username: "ds",
  mail: "",
  languages: [],
  password: "",
  type: "",
};

export default function UsersPage({
  token,
  setLoading,
  onError,
  loading,
  onSuccess,
}: PageProps) {
  const { languages, mail, username } = React.useContext(AuthContext);
  const [users, setUsers] = React.useState<UserCreated[]>([]);
  const [currentUser, setCurrentUser] = React.useState<UserCreated>(NO_USER);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [messageDialog, setMessageDialog] = React.useState<boolean>(false);
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const [userAddDialog, setUserAddDialog] = React.useState<boolean>(false);
  const classes = useAppStyles();

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const retrievedUsers = await getUsers(token);
      if (retrievedUsers != null) {
        //filter the root user from the list
        setUsers(retrievedUsers.filter((user) => user.type !== "root"));
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const onCreateSubmit = (user: UserCreated) => {
    onUserAdd(
      {
        ...user,
        id: user.id,
      },
      users,
      setUsers,
      EmailType.Registration,
      {
        email: noSpace(user.mail),
        fromEmail: mail,
        fromName: username,
        subject: EmailSubject.Registration,
      },
      token,
      setLoading,
      () => {
        setEditDialog(false);
        setCurrentUser(NO_USER);
        onSuccess();
      },
      onError
    );
    setUserAddDialog(false);
  };

  const onUpdateSubmit = (user: UserCreated) => {
    onUserUpdate(
      {
        ...user,
        id: user.id,
      },
      users,
      setUsers,
      EmailType.Update,
      {
        email: user.mail,
        fromEmail: mail,
        fromName: username,
        subject: EmailSubject.Update,
      },
      token,
      setLoading,
      onSuccess,
      onError
    );
  };

  const onUpdate = (user: UserCreated) => {
    setCurrentUser(user);
    setEditDialog(true);
  };

  const onDelete = (user: UserCreated) => {
    setCurrentUser(user);
    setDeleteDialog(true);
  };

  const onMessage = (user: UserCreated) => {
    setCurrentUser(user);
    setMessageDialog(true);
  };

  return (
    <>
      <div className={classes.headerSection}>
        <SearchBar
          placeholder="Filter Users"
          setSearchText={(text) => setSearchText(text)}
          searchText={searchText}
        />
        <div>
          <CustomButton
            onClick={() => setUserAddDialog(true)}
            title="INSERT NEW USER"
          />
        </div>
      </div>

      <TableUsers
        users={users}
        languages={languages}
        onMessage={onMessage}
        onDelete={onDelete}
        onUpdate={onUpdate}
        searchText={searchText}
      />

      <UserDialog
        user={NO_USER}
        loading={loading}
        headerText="Register new User"
        languages={languages}
        open={userAddDialog}
        onConfirm={onCreateSubmit}
        onRefuse={() => {
          setUserAddDialog(false);
        }}
      />

      <UserDialog
        user={currentUser}
        loading={loading}
        open={editDialog}
        languages={languages}
        onConfirm={onUpdateSubmit}
        headerText="Edit User"
        onRefuse={() => {
          setEditDialog(false);
          setCurrentUser(NO_USER);
        }}
      />

      <MessageDialog
        loading={loading}
        open={messageDialog}
        headerText={currentUser.username}
        onSend={async (message: string) => {
          await onUserMessage(
            currentUser,
            EmailType.Message,
            {
              email: currentUser.mail,
              fromEmail: mail,
              fromName: username,
              subject: EmailSubject.Message,
              message: message,
            },
            token,
            setLoading,
            onSuccess,
            onError
          );
          setMessageDialog(false);
        }}
        onRefuse={() => {
          setMessageDialog(false);
        }}
      />

      <DeleteDialog
        open={deleteDialog}
        onConfirm={() => {
          onUserDelete(
            currentUser,
            users,
            setUsers,
            EmailType.Removal,
            {
              email: currentUser.mail,
              fromEmail: mail,
              fromName: username,
              subject: EmailSubject.Remove,
            },
            token,
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
