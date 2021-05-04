import React from "react";
import { addReport, getCategories } from "../api/api";
import { Category, Lang, PageProps, Report } from "../interfaces/Interfaces";
import TableCategories from "../components/tables/TableCategories";
import CustomButton from "src/components/buttons/CustomButton";
import SearchBar from "src/components/input/searchBar";
import AddDialog from "../components/dialogs/CategoryDialog";
import EditDialog from "../components/dialogs/CategoryDialog";
import DeleteDialog from "../components/dialogs/ConfirmDialog";
import { useAppStyles } from "../styles/common";

import {
  onCategoryAdd,
  onCategoryDelete,
  onCategoryUpdate,
} from "src/utils/topics";
import { getHash } from "src/utils/utils";

const NO_CATEGORY: Category = {
  id: -1,
  ref_id: -1,
  title: "",
};

export default function ViewPage({
  token,
  currentLanguage,
  setLoading,
  onError,
  onSuccess,
}: PageProps) {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const [addDialog, setAddDialog] = React.useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = React.useState<Category>(
    NO_CATEGORY
  );
  const classes = useAppStyles();

  /*
  addReport(
    {
      client_id: "213132",
      question_id: 489816,
      reason: "bella  e interessante",
    },
    Lang.IT
  );*/

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const retrievedCategories = await getCategories(currentLanguage, token);
      if (retrievedCategories != null) {
        setCategories(retrievedCategories);
      }
      setLoading(false);
    })();
  }, [currentLanguage]);

  const onEdit = (categ: Category) => {
    setCurrentCategory(categ);
    setEditDialog(true);
  };

  const onDelete = (categ: Category) => {
    setCurrentCategory(categ);
    setDeleteDialog(true);
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
      <TableCategories
        token={token}
        categories={categories}
        currentLanguage={currentLanguage}
        searchText={searchText}
        onDelete={onDelete}
        onEdit={onEdit}
      />

      <AddDialog
        category=""
        headerText="Add new Category"
        open={addDialog}
        onConfirm={async (newTitle: string) => {
          await onCategoryAdd(
            {
              id: getHash(newTitle, currentLanguage),
              title: newTitle,
              ref_id: getHash(newTitle, currentLanguage),
            },
            categories,
            currentLanguage,
            token,
            setCategories,
            setLoading,
            onSuccess,
            onError
          );
          setAddDialog(false);
          setCurrentCategory(NO_CATEGORY);
        }}
        onRefuse={() => {
          setAddDialog(false);
          setCurrentCategory(NO_CATEGORY);
        }}
      />

      <EditDialog
        open={editDialog}
        onConfirm={(newTitle: string) => {
          onCategoryUpdate(
            {
              title: newTitle,
              id: currentCategory.id,
              ref_id: currentCategory.ref_id,
            },
            categories,
            currentLanguage,
            token,
            setCategories,
            setLoading,
            onSuccess,
            onError
          );
          setEditDialog(false);
          setCurrentCategory(NO_CATEGORY);
        }}
        headerText="Editing Category"
        onRefuse={() => {
          setEditDialog(false);
          setCurrentCategory(NO_CATEGORY);
        }}
        category={currentCategory.title}
      />

      <DeleteDialog
        open={deleteDialog}
        onConfirm={() => {
          onCategoryDelete(
            currentCategory.ref_id,
            categories,
            currentLanguage,
            token,
            setCategories,
            setLoading,
            onSuccess,
            onError
          );
          setDeleteDialog(false);
        }}
        title="Proceed to Delete the question?"
        description="The question record will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setDeleteDialog(false);
        }}
      />
    </>
  );
}
