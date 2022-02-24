import React from "react";
import {
  CustomTable,
  StyledEditCell,
  StyledTableCell,
  StyledTableRow,
  useStyles,
} from "../ui/TableStyles";
import MailIcon from "@material-ui/icons/MailOutline";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { UserCreated } from "@/interfaces/dash_user";
import { Lang } from "@/interfaces/app";

interface TableUsersProps {
  users: UserCreated[];
  languages: Lang[];
  onUpdate: (user: UserCreated) => void;
  onDelete: (user: UserCreated) => void;
  onMessage: (user: UserCreated) => void;
  searchText: string;
}

export default function TableUsers({
  onDelete,
  onUpdate,
  onMessage,
  searchText,
  users,
}: TableUsersProps) {
  const classes = useStyles();

  const renderRows = (users: UserCreated[]) => {
    return users.map((user: UserCreated, index: number) => {
      if (user.username.toLowerCase().includes(searchText.toLowerCase())) {
        return (
          <StyledTableRow key={index}>
            <StyledTableCell> {user.username}</StyledTableCell>
            <StyledTableCell> {user.mail}</StyledTableCell>
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
                    onUpdate(user);
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