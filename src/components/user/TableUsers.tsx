import React from "react";
import {
  CustomTable,
  StyledEditCell,
  StyledTableCell,
  StyledTableRow,
  useStyles,
} from "../ui/TableStyles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { UserDetail } from "@toppick/common/build/interfaces";

interface TableUsersProps {
  users: UserDetail[];
  onUpdate: (user: UserDetail) => void;
  onDelete: (user: UserDetail) => void;
  searchText: string;
}

export default function TableUsers({
  onDelete,
  onUpdate,
  searchText,
  users,
}: TableUsersProps) {
  const classes = useStyles();

  const renderRows = (users: UserDetail[]) => {
    return users.map((user: UserDetail, index: number) => {
      if (user.username.toLowerCase().includes(searchText.toLowerCase())) {
        return (
          <StyledTableRow key={index}>
            <StyledTableCell> {user.username}</StyledTableCell>
            <StyledTableCell> {user.email}</StyledTableCell>
            <StyledEditCell>
              {user.role}
              <div className={classes.userIconsContainer}>
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
      columns={["40%", "40%", "20%"]}
      columnNames={["username", "email", "role"]}
      body={renderRows(users)}
    />
  );
}
