import React from "react";
import { getUsers } from "../api/api";
import {
  CreatedUser,
  EmailSubject,
  EmailType,
  Lang,
  PageProps,
} from "../interfaces/Interfaces";
import TableUsers from "../components/tables/TableUsers";
import { AuthContext } from "../context/AuthContext";
import SearchBar from "../components/input/SearchBar";
import CustomButton from "../components/buttons/CustomButton";
import UserAddDialog from "../components/dialogs/UserDialog";
import UserEditDialog from "../components/dialogs/UserDialog";
import DeleteDialog from "../components/dialogs/ConfirmDialog";
import MessageDialog from "../components/dialogs/MessageDialog";
import { useAppStyles } from "../styles/common";
import { CONSTANTS } from "src/constants/constants";
import {
  onUserAdd,
  onUserDelete,
  onUserMessage,
  onUserUpdate,
} from "src/utils/users";
import { getHash, noSpace } from "src/utils/utils";

const NO_USER: CreatedUser = {
  id: -1,
  username: "",
  userMail: "",
  languages: [],
  password: "",
  type: "",
};

export default function UsersPage({
  token,
  setLoading,
  onError,
  onSuccess,
}: PageProps) {
  const { languages, userMail, username } = React.useContext(AuthContext);
  const [users, setUsers] = React.useState<CreatedUser[]>([]);
  const [currentUser, setCurrentUser] = React.useState<CreatedUser>(NO_USER);
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
  }, []);

  const onEdit = (user: CreatedUser) => {
    setCurrentUser(user);
    setEditDialog(true);
  };

  const onDelete = (user: CreatedUser) => {
    setCurrentUser(user);
    setDeleteDialog(true);
  };

  const onMessage = (user: CreatedUser) => {
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
        onEdit={onEdit}
        searchText={searchText}
      />

      <UserAddDialog
        email=""
        password=""
        username=""
        selectedLanguages={[]}
        type={CONSTANTS.NO_USER_TYPE}
        headerText="Register new User"
        languages={languages}
        open={userAddDialog}
        onConfirm={(
          newUsername: string,
          email: string,
          password: string,
          languages: Lang[],
          type: string = CONSTANTS.NO_USER_TYPE
        ) => {
          onUserAdd(
            {
              userMail: noSpace(email),
              password: noSpace(password),
              languages,
              id: getHash(newUsername),
              type,
              username: noSpace(newUsername),
            },
            users,
            setUsers,
            EmailType.Registration,
            {
              email: noSpace(email),
              fromEmail: userMail,
              fromName: username,
              subject: EmailSubject.Registration,
            },
            token,
            setLoading,
            onSuccess,
            onError
          );
          setUserAddDialog(false);
        }}
        onRefuse={() => {
          setUserAddDialog(false);
        }}
      />

      <UserEditDialog
        email={currentUser.userMail}
        password=""
        username={currentUser.username}
        type={currentUser.type}
        open={editDialog}
        languages={languages}
        selectedLanguages={currentUser.languages}
        onConfirm={(
          newUsername: string,
          email: string,
          password: string,
          languages: Lang[],
          type: string = CONSTANTS.NO_USER_TYPE
        ) => {
          onUserUpdate(
            {
              username: noSpace(newUsername),
              userMail: noSpace(email),
              id: currentUser.id,
              languages,
              password: noSpace(password),
              type,
            },
            users,
            setUsers,
            EmailType.Update,
            {
              email: noSpace(email),
              fromEmail: userMail,
              fromName: username,
              subject: EmailSubject.Update,
            },
            token,
            setLoading,
            onSuccess,
            onError
          );

          setEditDialog(false);
          setCurrentUser(NO_USER);
        }}
        headerText="Editing User"
        onRefuse={() => {
          setEditDialog(false);
          setCurrentUser(NO_USER);
        }}
      />

      <MessageDialog
        open={messageDialog}
        headerText={currentUser.username}
        onSend={async (message: string) => {
          await onUserMessage(
            currentUser,
            EmailType.Message,
            {
              email: currentUser.userMail,
              fromEmail: userMail,
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
              email: currentUser.userMail,
              fromEmail: userMail,
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
