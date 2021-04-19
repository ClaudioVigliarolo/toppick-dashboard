import React from "react";
import { getUsers } from "../api/api";
import {
  CreatedUser,
  EmailType,
  Lang,
  PageProps,
} from "../interfaces/Interfaces";
import TableUsers from "../components/tables/TableUsers";
import { AuthContext } from "../context/AuthContext";
import SearchBar from "src/components/input/searchBar";
import CustomButton from "src/components/buttons/CustomButton";
import UserAddDialog from "../components/dialogs/UserDialog";
import UserEditDialog from "../components/dialogs/UserDialog";
import DeleteDialog from "../components/dialogs/ConfirmDialog";

import { useAppStyles } from "../styles/common";
import { CONSTANTS } from "src/constants/constants";
import { onUserAdd, onUserDelete, onUserUpdate } from "src/utils/users";
import { getHash } from "src/utils/utils";

const NO_USER: CreatedUser = {
  id: -1,
  username: "",
  email: "",
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
  const { languages, email } = React.useContext(AuthContext);
  const [users, setUsers] = React.useState<CreatedUser[]>([]);
  const [currentUser, setCurrentUser] = React.useState<CreatedUser>(NO_USER);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const [userAddDialog, setUserAddDialog] = React.useState<boolean>(false);
  const classes = useAppStyles();

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const retrievedUsers = await getUsers(token);
      if (retrievedUsers != null) {
        setUsers(retrievedUsers);
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
          username: string,
          email: string,
          password: string,
          languages: Lang[],
          type: string = CONSTANTS.NO_USER_TYPE
        ) => {
          onUserAdd(
            {
              email,
              password,
              languages,
              id: getHash(username),
              type,
              username,
            },
            users,
            setUsers,
            EmailType.Registration,
            {
              email,
              fromEmail: email,
              fromName: "Top Picks",
              subject: "Registration",
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
        email={currentUser.email}
        password=""
        username={currentUser.username}
        type={currentUser.type}
        open={editDialog}
        languages={languages}
        selectedLanguages={currentUser.languages}
        onConfirm={(
          username: string,
          email: string,
          password: string,
          languages: Lang[],
          type: string = CONSTANTS.NO_USER_TYPE
        ) => {
          onUserUpdate(
            {
              username,
              email,
              id: currentUser.id,
              languages,
              password,
              type,
            },
            users,
            setUsers,
            EmailType.Update,
            {
              email,
              fromEmail: email,
              fromName: "Top Picks",
              subject: "Updated Credentials",
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

      <DeleteDialog
        open={deleteDialog}
        onConfirm={() => {
          onUserDelete(
            currentUser,
            users,
            setUsers,
            EmailType.Removal,
            {
              email: currentUser.email,
              fromEmail: email,
              fromName: "Top Picks",
              subject: "Account Removal",
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
