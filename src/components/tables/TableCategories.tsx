import React from "react";
import {
  CustomTable,
  StyledEditCell,
  StyledTableRow,
  useStyles,
} from "./TableStyles";
import { Category } from "../../interfaces/Interfaces";
import {
  onCategoryAdd,
  onCategoryDelete,
  onCategoryUpdate,
} from "../../utils/topics";
import DeleteDialog from "../dialogs/ConfirmDialog";
import AddDialog from "../dialogs/CategoryDialog";
import EditDialog from "../dialogs/CategoryDialog";
import CustomButton from "../buttons/CustomButton";
import SearchBar from "../input/searchBar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TransactionAlert from "../alerts/TransactionAlert";

interface TableCategoriesProps {
  categories: Category[];
  token: string;
  currentLanguage: string;
  setLoading: (newVal: boolean) => void;
}

export default function TableCategories(props: TableCategoriesProps) {
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [searchText, setSearchText] = React.useState<string>("");
  const [addDialog, setAddDialog] = React.useState<boolean>(false);
  const [currentCategoryId, setCurrentCategoryId] = React.useState<number>(-1);
  const [
    currentCategoryTitle,
    setCurrentCategoryTitle,
  ] = React.useState<string>("");
  const classes = useStyles();

  React.useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);

  const onEdit = (id: number, title: string) => {
    setCurrentCategoryTitle(title);
    setCurrentCategoryId(id);
    setEditDialog(true);
  };

  const onDelete = (id: number) => {
    setCurrentCategoryId(id);
    setDeleteDialog(true);
  };

  const renderRows = (categories: Category[]) => {
    return categories.map((category: Category, index: number) => {
      if (category.title.toLowerCase().includes(searchText.toLowerCase())) {
        return (
          <StyledTableRow key={index}>
            <StyledEditCell>
              {category.title}
              <div className={classes.iconsContainer}>
                <EditIcon
                  className={classes.editIcon}
                  onClick={() => {
                    onEdit(category.id, category.title);
                  }}
                />
                <DeleteIcon
                  onClick={() => {
                    onDelete(category.id);
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
          placeholder="Filter Topics"
          setSearchText={(text) => setSearchText(text)}
          searchText={searchText}
        />
        <div>
          <CustomButton
            onClick={() => setAddDialog(true)}
            title="INSERT NEW CATEGORY"
          />
        </div>
      </div>
      <CustomTable
        columns={["50%"]}
        columnNames={["category"]}
        body={renderRows(categories)}
      />

      <AddDialog
        category=""
        headerText="Add new Category"
        open={addDialog}
        onConfirm={(newTitle: string) => {
          onCategoryAdd(
            newTitle,
            categories,
            props.currentLanguage,
            props.token,
            setCategories,
            props.setLoading,
            setSuccess,
            setError
          );
          setAddDialog(false);
        }}
        onRefuse={() => {
          setAddDialog(false);
        }}
      />

      <EditDialog
        open={editDialog}
        onConfirm={(newTitle: string) => {
          onCategoryUpdate(
            currentCategoryId,
            newTitle,
            categories,
            props.currentLanguage,
            props.token,
            setCategories,
            props.setLoading,
            setSuccess,
            setError
          );
          setEditDialog(false);
        }}
        headerText="Editing Category"
        onRefuse={() => {
          setEditDialog(false);
          setCurrentCategoryId(-1);
          setCurrentCategoryTitle("");
        }}
        category={currentCategoryTitle}
      />

      <DeleteDialog
        open={deleteDialog}
        onConfirm={() => {
          onCategoryDelete(
            currentCategoryId,
            categories,
            props.currentLanguage,
            props.token,
            setCategories,
            props.setLoading,
            setSuccess,
            setError
          );
          setDeleteDialog(false);
        }}
        title="Proceed to Delete the question?"
        description="The question record will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setDeleteDialog(false);
        }}
      />
      <TransactionAlert success={success} error={error} />
    </>
  );
}
