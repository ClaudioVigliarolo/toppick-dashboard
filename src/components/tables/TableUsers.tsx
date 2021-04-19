import React from "react";
import {
  CustomTable,
  StyledEditCell,
  StyledTableCell,
  StyledTableRow,
  useStyles,
} from "./TableStyles";
import { CONSTANTS } from "../../constants/constants";

import { CreatedUser, EmailType, Lang } from "../../interfaces/Interfaces";
import { onUserDelete, onUserUpdate, onUserAdd } from "../../utils/users";
import { getHash } from "../../utils/utils";
import DeleteDialog from "../dialogs/ConfirmDialog";
import UserAddDialog from "../dialogs/UserDialog";
import UserEditDialog from "../dialogs/UserDialog";
import CustomButton from "../buttons/CustomButton";
import SearchBar from "../input/searchBar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

interface TableUsersProps {
  users: CreatedUser[];
  languages: Lang[];
  onEdit: (user: CreatedUser) => void;
  onDelete: (user: CreatedUser) => void;
  searchText: string;
}

export default function TableUsers({
  onDelete,
  onEdit,
  searchText,
  users,
}: TableUsersProps) {
  const classes = useStyles();

  const renderRows = (users: CreatedUser[]) => {
    return users.map((user: CreatedUser, index: number) => {
      if (user.username.toLowerCase().includes(searchText.toLowerCase())) {
        return (
          <StyledTableRow key={index}>
            <StyledTableCell> {user.username}</StyledTableCell>
            <StyledTableCell> {user.email}</StyledTableCell>
            <StyledTableCell>{user.type}</StyledTableCell>
            <StyledEditCell>
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
    <CustomTable
      columns={["20%", "20%", "20%", "60%"]}
      columnNames={["username", "email", "type", "languages"]}
      body={renderRows(users)}
    />
  );
}
