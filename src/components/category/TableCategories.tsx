import React from "react";
import {
  AppTable,
  StyledEditCell,
  StyledTableRow,
  useAppTableStyles,
  StyledTableCell,
} from "../ui/Table";
import { CategoryFeatured } from "@toppick/common/build/interfaces";
import { useAppStyles } from "@/styles/common";
import { makeStyles } from "@material-ui/core";
import EditIcon from "../ui/icon/EditIcon";
import DeleteIcon from "../ui/icon/DeleteIcon";

interface TableCategoriesProps {
  categories: CategoryFeatured[];
  onUpdate: (categ: CategoryFeatured) => void;
  onDelete: (categ: CategoryFeatured) => void;
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

export default function TableCategories({
  categories,
  searchText,
  onDelete,
  onUpdate,
}: TableCategoriesProps) {
  const classes = { ...useAppTableStyles(), ...useStyles() };

  const renderRows = (categories: CategoryFeatured[]) => {
    return categories.map((category: CategoryFeatured, index: number) => {
      if (category.title.toLowerCase().includes(searchText.toLowerCase())) {
        return (
          <StyledTableRow key={index}>
            <StyledTableCell> {category.title}</StyledTableCell>
            <StyledEditCell>
              <div className={classes.iconsContainer}>
                <EditIcon
                  onClick={() => {
                    onUpdate(category);
                  }}
                />
                <DeleteIcon
                  onClick={() => {
                    onDelete(category);
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
    <AppTable
      columns={["95%", "5%"]}
      columnNames={["category", ""]}
      body={renderRows(categories)}
    />
  );
}
