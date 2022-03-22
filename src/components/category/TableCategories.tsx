import React from "react";
import {
  CustomTable,
  StyledEditCell,
  StyledTableRow,
  useStyles,
  StyledTableCell,
} from "../ui/TableStyles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { CategoryFeatured } from "@toppick/common";

interface TableCategoriesProps {
  categories: CategoryFeatured[];
  onUpdate: (categ: CategoryFeatured) => void;
  onDelete: (categ: CategoryFeatured) => void;
  searchText: string;
}

export default function TableCategories({
  categories,
  searchText,
  onDelete,
  onUpdate,
}: TableCategoriesProps) {
  const classes = useStyles();

  const renderRows = (categories: CategoryFeatured[]) => {
    return categories.map((category: CategoryFeatured, index: number) => {
      if (category.title.toLowerCase().includes(searchText.toLowerCase())) {
        return (
          <StyledTableRow key={index}>
            <StyledTableCell> {category.title}</StyledTableCell>
            <StyledEditCell>
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
