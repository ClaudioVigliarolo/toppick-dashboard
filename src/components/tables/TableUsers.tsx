import React from "react";
import {
  CustomTable,
  StyledEditCell,
  StyledTableCell,
  StyledTableRow,
  useStyles,
} from "./TableStyles";
import { CONSTANTS } from "../../constants/constants";

import { CreatedUser, EmailType } from "../../interfaces/Interfaces";
import { addUser, deleteUser, emailUser, updateUser } from "../../api/api";
import { getHash } from "../../utils/utils";
import DeleteDialog from "../dialogs/ConfirmDialog";
import UserAddDialog from "../dialogs/UserDialog";
import UserEditDialog from "../dialogs/UserDialog";
import CustomButton from "../buttons/CustomButton";
import SearchBar from "../input/searchBar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TransactionAlert from "../alerts/TransactionAlert";

interface TableUsersProps {
  users: CreatedUser[];
  token: string;
  languages: string[];
  email: string;
}

export default function TableUsers(props: TableUsersProps) {
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [users, setUsers] = React.useState<CreatedUser[]>([]);
  const [searchText, setSearchText] = React.useState<string>("");
  const [userAddDialog, setUserAddDialog] = React.useState<boolean>(false);
  const [currentuser_id, setCurrentuser_id] = React.useState<number>(-1);
  const [currentUserEmail, setCurrentUserEmail] = React.useState<string>("");
  const [currentUserTpe, setCurrentUserType] = React.useState<string>("");
  const [currentUserLanguages, setCurrentUserLanguages] = React.useState<
    string[]
  >([]);
  const [currentUserUsername, setCurrentUserUsername] = React.useState<string>(
    ""
  );

  const classes = useStyles();

  React.useEffect(() => {
    setUsers(props.users);
  }, [props.users]);

  const onUserAdd = async (
    newuser_id: number,
    username: string,
    email: string,
    password: string,
    type: string,
    languages: string[]
  ): Promise<void> => {
    const newUser: CreatedUser = {
      id: newuser_id,
      username,
      email,
      password,
      type,
      languages,
    };

    const val1 = await addUser(newUser, props.token);

    const val2 = await emailUser(
      {
        username,
        email,
        password,
        languages,
        subject: "Registration",
        template: EmailType.Registration,
      },
      props.email,
      props.token
    );

    if (!val1 || !val2) {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      return;
    }

    const newUsers = users;
    newUsers.unshift(newUser);
    setSuccess(true);
    setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);

    setUsers([...newUsers]);
  };

  const onUserDelete = async (id: number): Promise<void> => {
    const val1 = await deleteUser(id, props.token);
    alert(currentUserEmail);
    const val2 = await emailUser(
      {
        username: currentUserUsername,
        email: currentUserEmail,
        password: "",
        languages: currentUserLanguages,
        subject: "Account Removal",
        template: EmailType.Removal,
      },
      props.email,
      props.token
    );

    if (!val1 || !val2) {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      return;
    }
    const newUsers = users.filter((user: CreatedUser) => user.id != id);
    setUsers([...newUsers]);
    setSuccess(true);
    setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  };

  const onUserUpdate = async (
    updateduser_id: number,
    username: string,
    email: string,
    password: string,
    type: string,
    languages: string[]
  ): Promise<void> => {
    const updatedUser: CreatedUser = {
      id: updateduser_id,
      username,
      email,
      password,
      type,
      languages,
    };

    const val1 = await updateUser(updatedUser, props.token);

    const val2 = await emailUser(
      {
        username,
        email,
        password,
        languages,
        subject: "Updated Credentials",
        template: EmailType.Update,
      },
      props.email,
      props.token
    );

    if (!val1 || !val2) {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      return;
    }
    const newUsers = users;
    newUsers.forEach(function (u: CreatedUser) {
      if (u.id == updateduser_id) {
        (u.username = username),
          (u.email = email),
          (u.password = password),
          (u.type = type),
          (u.languages = languages);
      }
    });

    setSuccess(true);
    setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);

    setUsers([...newUsers]);
  };

  const onEdit = (
    id: number,
    username: string,
    email: string,
    languages: string[],
    type: string
  ) => {
    setCurrentUserUsername(username);
    setCurrentuser_id(id);
    setCurrentUserLanguages(languages);
    setCurrentUserType(type);
    setCurrentUserEmail(email);
    setEditDialog(true);
  };

  const onDelete = (
    id: number,
    username: string,
    email: string,
    languages: string[],
    type: string
  ) => {
    setCurrentUserUsername(username);
    setCurrentuser_id(id);
    setCurrentUserLanguages(languages);
    setCurrentUserType(type);
    setCurrentUserEmail(email);
    setDeleteDialog(true);
  };

  const renderRows = (users: CreatedUser[]) => {
    console.log("us2", users);
    return users.map((user: CreatedUser, index: number) => {
      if (user.username.toLowerCase().includes(searchText.toLowerCase())) {
        return (
          <StyledTableRow key={index}>
            <StyledTableCell> {user.username}</StyledTableCell>
            <StyledTableCell> {user.email}</StyledTableCell>
            <StyledTableCell>{user.type}</StyledTableCell>
            <StyledEditCell>
              {" "}
              {user.languages &&
                user.languages.map((lang: string) => lang + "  ")}
              <div className={classes.iconsContainer}>
                <EditIcon
                  className={classes.editIcon}
                  onClick={() => {
                    onEdit(
                      user.id,
                      user.username,
                      user.email,
                      user.languages,
                      user.type
                    );
                  }}
                />
                <DeleteIcon
                  onClick={() => {
                    onDelete(
                      user.id,
                      user.username,
                      user.email,
                      user.languages,
                      user.type
                    );
                  }}
                  className={classes.deleteIcon}
                />
              </div>
            </StyledEditCell>
          </StyledTableRow>
        );
      }
    });
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
      <CustomTable
        columns={["20%", "20%", "20%", "60%"]}
        columnNames={["username", "email", "type", "languages"]}
        body={renderRows(users)}
      />

      <UserAddDialog
        email=""
        password=""
        username=""
        selectedLanguages={[]}
        type={CONSTANTS.DEFAULT_USER_TYPE}
        headerText="Register new User"
        languages={props.languages}
        open={userAddDialog}
        onConfirm={(
          username: string,
          email: string,
          password: string,
          languages: string[],
          usertype: string = CONSTANTS.DEFAULT_USER_TYPE
        ) => {
          onUserAdd(
            getHash(username),
            username,
            email,
            password,
            usertype,
            languages
          );
          setUserAddDialog(false);
        }}
        onRefuse={() => {
          setUserAddDialog(false);
        }}
      />

      <UserEditDialog
        email={currentUserEmail}
        password=""
        username={currentUserUsername}
        type={currentUserTpe}
        open={editDialog}
        languages={props.languages}
        selectedLanguages={currentUserLanguages}
        onConfirm={(
          username: string,
          email: string,
          password: string,
          languages: string[],
          usertype: string = CONSTANTS.DEFAULT_USER_TYPE
        ) => {
          onUserUpdate(
            currentuser_id,
            username,
            email,
            password,
            usertype,
            languages
          );
          setEditDialog(false);
          setCurrentUserUsername("");
          setCurrentuser_id(-1);
          setCurrentUserLanguages([]);
          setCurrentUserType("");
          setCurrentUserEmail("");
        }}
        headerText="Editing User"
        onRefuse={() => {
          setEditDialog(false);
          setCurrentUserUsername("");
          setCurrentuser_id(-1);
          setCurrentUserLanguages([]);
          setCurrentUserType("");
          setCurrentUserEmail("");
        }}
        //user={currentUserTitle}
      />

      <DeleteDialog
        open={deleteDialog}
        onConfirm={() => {
          onUserDelete(currentuser_id);
          setDeleteDialog(false);
        }}
        title="Proceed to Delete this User?"
        description="The user data will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setDeleteDialog(false);
        }}
      />

      <TransactionAlert success={success} error={error} />
    </>
  );
}
