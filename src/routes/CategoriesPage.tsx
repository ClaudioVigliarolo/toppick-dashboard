import React from "react";
import { getCategories, getCategoryTopics } from "../api/api";
import { Category, CategoryTopic, PageProps } from "../interfaces/Interfaces";
import TableCategories from "../components/tables/TableCategories";
import CustomButton from "../components/buttons/CustomButton";
import SearchBar from "../components/input/SearchBa";
import AddDialog from "../components/dialogs/CategoryDialog";
import EditDialog from "../components/dialogs/CategoryDialog";
import DeleteDialog from "../components/dialogs/ConfirmDialog";
import { useAppStyles } from "../styles/common";

import {
  getTopicFromTitle,
  onCategoryAdd,
  onCategoryDelete,
  onCategoryUpdate,
} from "src/utils/topics";
import { getHash } from "src/utils/utils";

const NO_CATEGORY: Category = {
  id: -1,
  ref_id: -1,
  title: "",
  categoryTopics: [],
};

export default function ViewPage({
  token,
  currentLanguage,
  setLoading,
  onError,
  onSuccess,
}: PageProps) {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [categoryTopics, setCategoryTopics] = React.useState<CategoryTopic[]>(
    []
  );
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const [addDialog, setAddDialog] = React.useState<boolean>(false);
  const [currentCategory, setCurrentCategory] =
    React.useState<Category>(NO_CATEGORY);
  const classes = useAppStyles();
  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const retrievedCategories = await getCategories(currentLanguage, token);
      if (retrievedCategories != null) {
        setCategories(retrievedCategories);
      }
      const retrievedCategTopics = await getCategoryTopics(
        currentLanguage,
        token
      );
      if (retrievedCategTopics != null) {
        setCategoryTopics(retrievedCategTopics);
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
        <CustomButton
          onClick={() => setAddDialog(true)}
          title="INSERT NEW CATEGORY"
        />
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
        preselectedCategTopics={[]}
        categTopics={categoryTopics}
        onConfirm={async (
          newTitle: string,
          selectedCategTopics: CategoryTopic[]
        ) => {
          await onCategoryAdd(
            {
              id: getHash(newTitle, currentLanguage),
              title: newTitle,
              ref_id: getHash(newTitle, currentLanguage),
              categoryTopics: selectedCategTopics,
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
        preselectedCategTopics={currentCategory.categoryTopics}
        categTopics={categoryTopics}
        onConfirm={async (
          newTitle: string,
          selectedTopics: CategoryTopic[]
        ) => {
          await onCategoryUpdate(
            {
              id: currentCategory.id,
              title: newTitle,
              ref_id: currentCategory.ref_id,
              categoryTopics: selectedTopics,
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
