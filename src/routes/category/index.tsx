import React from "react";
import { getCategories, getCategoryTopics } from "@/services/api";
import { PageProps } from "@/interfaces/app";
import TableCategories from "@/components/category/TableCategories";
import CustomButton from "@/components/ui/buttons/Button";
import CategoryDialog from "@/components/category/dialog";
import SearchBar from "@/components/ui/SearchBar";
import DeleteDialog from "@/components/ui/dialog/ConfirmDialog";
import { useAppStyles } from "@/styles/common";
import {
  onCategoryAdd,
  onCategoryDeleteUnique,
  onCategoryUpdate,
} from "@/utils/topics";
import { getHash } from "@/utils/utils";
import { Category, CategoryTopic } from "@/interfaces/dash_topics";

const NO_CATEGORY: Category = {
  id: -1,
  ref_id: -1,
  title: "",
  categoryTopics: [],
  description: "",
  image: "",
};

export default function CategoryPage({
  token,
  currentLanguage,
  setLoading,
  loading,
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  const onUpdate = (categ: Category) => {
    setCurrentCategory(categ);
    setEditDialog(true);
  };

  const onDeleteShow = (categ: Category) => {
    setCurrentCategory(categ);
    setDeleteDialog(true);
  };

  const onCreateSubmit = async (newCategory: Category) => {
    const newId = getHash(newCategory.title, currentLanguage);
    await onCategoryAdd(
      {
        ...newCategory,
        id: newId,
        ref_id: newId,
      },
      categories,
      currentLanguage,
      token,
      setCategories,
      setLoading,
      () => {
        setAddDialog(false);
        setCurrentCategory(NO_CATEGORY);
        onSuccess();
      },
      onError
    );
  };

  const onUpdateSubmit = async (newCategory: Category) => {
    await onCategoryUpdate(
      newCategory,
      categories,
      currentLanguage,
      token,
      setCategories,
      setLoading,
      () => {
        setAddDialog(false);
        setCurrentCategory(NO_CATEGORY);
        onSuccess();
      },
      onError
    );
    setEditDialog(false);
    setCurrentCategory(NO_CATEGORY);
  };

  const onDeleteSubmit = () => {
    onCategoryDeleteUnique(
      currentCategory.id,
      categories,
      currentLanguage,
      token,
      setCategories,
      setLoading,
      onSuccess,
      onError
    );
    setDeleteDialog(false);
  };

  return (
    <>
      <div className={classes.headerSection}>
        <SearchBar
          placeholder="Filter Categories"
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
        onDelete={onDeleteShow}
        onUpdate={onUpdate}
      />

      <CategoryDialog
        category={NO_CATEGORY}
        loading={loading}
        headerText="Add new Category"
        open={addDialog}
        categoryTopics={categoryTopics}
        onConfirm={onCreateSubmit}
        onRefuse={() => {
          setAddDialog(false);
          setCurrentCategory(NO_CATEGORY);
        }}
      />

      <CategoryDialog
        open={editDialog}
        categoryTopics={categoryTopics}
        loading={loading}
        onConfirm={onUpdateSubmit}
        headerText="Editing Category"
        onRefuse={() => {
          setEditDialog(false);
          setCurrentCategory(NO_CATEGORY);
        }}
        category={currentCategory}
      />

      <DeleteDialog
        open={deleteDialog}
        onConfirm={onDeleteSubmit}
        title="Proceed to Delete the question?"
        description="The question record will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setDeleteDialog(false);
        }}
      ></DeleteDialog>
    </>
  );
}
