import React from "react";
import {
  Table,
  StyledEditCell,
  StyledTableCell,
  StyledTableRow,
  useTableStyles,
} from "../ui/Table";
import { UserFeatured } from "@toppick/common/build/interfaces";
import { makeStyles } from "@material-ui/core";
import { useAppStyles } from "@/styles/common";
import EditIcon from "../ui/icon/EditIcon";
import DeleteIcon from "../ui/icon/DeleteIcon";

interface TableUsersProps {
  users: UserFeatured[];
  onUpdate: (user: UserFeatured) => void;
  onDelete: (user: UserFeatured) => void;
  searchText: string;
}

const useStyles = makeStyles(() => ({
  iconsContainer: {
    position: "absolute",
    right: 30,
    color: "orange",
    top: "30%",
    cursor: "pointer",
    width: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

export default function TableUsers({
  onDelete,
  onUpdate,
  searchText,
  users,
}: TableUsersProps) {
  const classes = { ...useTableStyles(), ...useStyles() };

  const renderRows = (users: UserFeatured[]) => {
    return users.map((user: UserFeatured, index: number) => {
      if (user.username.toLowerCase().includes(searchText.toLowerCase())) {
        return (
          <StyledTableRow key={index}>
            <StyledTableCell> {user.username}</StyledTableCell>
            <StyledEditCell>
              {user.email}
              <div className={classes.iconsContainer}>
                <EditIcon
                  onClick={() => {
                    onUpdate(user);
                  }}
                />
                <DeleteIcon
                  onClick={() => {
                    onDelete(user);
                  }}
                />
              </div>
            </StyledEditCell>
          </StyledTableRow>
        );
      }
    });
  };

  return (
    <Table
      columns={["50%", "50%"]}
      columnNames={["username", "email"]}
      body={renderRows(users)}
    />
  );
}
