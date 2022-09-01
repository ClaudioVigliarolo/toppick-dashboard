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
import { User, UserFeatured } from "@toppick/common/build/interfaces";

interface TableUsersProps {
  users: UserFeatured[];
  onUpdate: (user: UserFeatured) => void;
  onDelete: (user: UserFeatured) => void;
  searchText: string;
}

export default function TableUsers({
  onDelete,
  onUpdate,
  searchText,
  users,
}: TableUsersProps) {
  const classes = useStyles();

  const renderRows = (users: UserFeatured[]) => {
    return users.map((user: UserFeatured, index: number) => {
      if (user.username.toLowerCase().includes(searchText.toLowerCase())) {
        return (
          <StyledTableRow key={index}>
            <StyledTableCell> {user.username}</StyledTableCell>
            <StyledEditCell>
              {user.email}
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
      columns={["50%", "30%"]}
      columnNames={["username", "email"]}
      body={renderRows(users)}
    />
  );
}
