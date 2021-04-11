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
import { onUserDelete, onUserUpdate, onUserAdd } from "../../utils/users";
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
  setLoading: (newVal: boolean) => void;
}

const DEFAULT_USER: CreatedUser = {
  id: -1,
  username: "",
  email: "",
  languages: [],
  password: "",
  type: "",
};

export default function TableUsers(props: TableUsersProps) {
  const [users, setUsers] = React.useState<CreatedUser[]>([]);
  const [currentUser, setCurrentUser] = React.useState<CreatedUser>(
    DEFAULT_USER
  );
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const [userAddDialog, setUserAddDialog] = React.useState<boolean>(false);
  const classes = useStyles();

  React.useEffect(() => {
    setUsers(props.users);
  }, [props.users]);

  const onEdit = (user: CreatedUser) => {
    setCurrentUser(user);
    setEditDialog(true);
  };

  const onDelete = (user: CreatedUser) => {
    setCurrentUser(user);
    setDeleteDialog(true);
  };

  const renderRows = (users: CreatedUser[]) => {
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
                    onEdit(user);
                  }}
                />
                <DeleteIcon
                  onClick={() => {
                    onDelete(user);
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
          type: string = CONSTANTS.DEFAULT_USER_TYPE
        ) => {
          onUserAdd(
            {
              username,
              email,
              id: getHash(username),
              languages,
              password,
              type,
            },
            users,
            setUsers,
            props.email,
            props.token,
            props.setLoading,
            setSuccess,
            setError
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
        languages={props.languages}
        selectedLanguages={currentUser.languages}
        onConfirm={(
          username: string,
          email: string,
          password: string,
          languages: string[],
          type: string = CONSTANTS.DEFAULT_USER_TYPE
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
            props.email,
            props.token,
            props.setLoading,
            setSuccess,
            setError
          );

          setEditDialog(false);
          setCurrentUser(DEFAULT_USER);
        }}
        headerText="Editing User"
        onRefuse={() => {
          setEditDialog(false);
          setCurrentUser(DEFAULT_USER);
        }}
        //user={currentUserTitle}
      />

      <DeleteDialog
        open={deleteDialog}
        onConfirm={() => {
          onUserDelete(
            currentUser,
            users,
            setUsers,
            props.email,
            props.token,
            props.setLoading,
            setSuccess,
            setError
          );
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
