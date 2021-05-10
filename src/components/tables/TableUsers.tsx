import React from "react";
import {
  CustomTable,
  StyledEditCell,
  StyledTableCell,
  StyledTableRow,
  useStyles,
} from "./TableStyles";
import { CreatedUser, Lang } from "../../interfaces/Interfaces";
import MailIcon from "@material-ui/icons/MailOutline";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

interface TableUsersProps {
  users: CreatedUser[];
  languages: Lang[];
  onEdit: (user: CreatedUser) => void;
  onDelete: (user: CreatedUser) => void;
  onMessage: (user: CreatedUser) => void;
  searchText: string;
}

export default function TableUsers({
  onDelete,
  onEdit,
  onMessage,
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
            <StyledTableCell> {user.userMail}</StyledTableCell>
            <StyledTableCell>{user.type}</StyledTableCell>
            <StyledEditCell>
              {user.languages &&
                user.languages.map((lang: Lang) => lang.toUpperCase() + "  ")}
              <div className={classes.userIconsContainer}>
                <MailIcon
                  onClick={() => {
                    onMessage(user);
                  }}
                />

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
