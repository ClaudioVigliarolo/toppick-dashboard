import React from "react";
import {
  CustomTable,
  StyledEditCell,
  StyledTableRow,
  useStyles,
  StyledTableCell,
} from "./TableStyles";
import { Category, Lang } from "../../interfaces/Interfaces";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

interface TableCategoriesProps {
  categories: Category[];
  token: string;
  currentLanguage: Lang;
  onUpdate: (categ: Category) => void;
  onDelete: (categ: Category) => void;
  searchText: string;
}

export default function TableCategories({
  categories,
  searchText,
  onDelete,
  onUpdate,
}: TableCategoriesProps) {
  const classes = useStyles();

  const renderRows = (categories: Category[]) => {
    return categories.map((category: Category, index: number) => {
      if (category.title.toLowerCase().includes(searchText.toLowerCase())) {
        return (
          <StyledTableRow key={index}>
            <StyledTableCell> {category.title}</StyledTableCell>
            <StyledEditCell
              style={{
                color: category.categoryTopics.length === 0 ? "red" : "black",
              }}
            >
              {category.categoryTopics.length === 0 &&
                "Warning, no topic in this category !"}
              <div className={classes.iconsContainer}>
                <EditIcon
                  className={classes.editIcon}
                  onClick={() => {
                    onUpdate(category);
                  }}
                />
                <DeleteIcon
                  onClick={() => {
                    onDelete(category);
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
      columns={["60%", "50%"]}
      columnNames={["category", ""]}
      body={renderRows(categories)}
    />
  );
}
