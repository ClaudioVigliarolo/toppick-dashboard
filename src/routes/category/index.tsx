import React from "react";
import TableCategories from "@/components/category/TableCategories";
import Button from "@/components/ui/buttons/Button";
import CategoryDialog from "@/components/category/dialog";
import SearchBar from "@/components/ui/SearchBar";
import DeleteDialog from "@/components/ui/dialog/ConfirmDialog";
import { useAppStyles } from "@/styles/common";
import {
  onCategoryCreate,
  onCategoryDelete,
  onCategoryUpdate,
} from "@/utils/topics";
import { StatusContext } from "@/context/StatusContext";
import { AuthContext } from "@/context/AuthContext";
import { getFeaturedCategories } from "@/services/topics";
import { CategoryFeatured, CategoryCreated } from "@toppick/common";

export default function CategoryPage() {
  const [categories, setCategories] = React.useState<CategoryFeatured[]>([]);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const [addDialog, setAddDialog] = React.useState<boolean>(false);
  const [currentCategory, setCurrentCategory] =
    React.useState<CategoryFeatured | null>(null);
  const { setLoading, onSuccess, onError, loading } =
    React.useContext(StatusContext);
  const { authToken, currentLanguage } = React.useContext(AuthContext);
  const classes = useAppStyles();

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const retrievedCategories = await getFeaturedCategories();
        if (retrievedCategories) {
          setCategories(retrievedCategories);
        }
      } catch (error) {
        onError();
      }
      setLoading(false);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  const onUpdate = (categ: CategoryFeatured) => {
    setCurrentCategory(categ);
    setEditDialog(true);
  };

  const onDelete = (categ: CategoryFeatured) => {
    //get detail category here?
    setCurrentCategory(categ);
    setDeleteDialog(true);
  };

  const onCreateSubmit = async (newCategory: CategoryCreated) => {
    await onCategoryCreate(
      newCategory,
      categories,
      currentLanguage,
      authToken,
      setCategories,
      setLoading,
      () => {
        setAddDialog(false);
        setCurrentCategory(null);
        onSuccess();
      },
      onError
    );
  };

  const onUpdateSubmit = async (newCategory: CategoryCreated) => {
    await onCategoryUpdate(
      newCategory,
      categories,
      currentLanguage,
      authToken,
      setCategories,
      setLoading,
      () => {
        setAddDialog(false);
        setCurrentCategory(null);
        onSuccess();
      },
      onError
    );
    setEditDialog(false);
    setCurrentCategory(null);
  };

  const onDeleteSubmit = () => {
    onCategoryDelete(
      (currentCategory as CategoryFeatured).id,
      categories,
      currentLanguage,
      authToken,
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
        <Button
          onClick={() => setAddDialog(true)}
          title="CREATE NEW CATEGORY"
        />
      </div>
      <TableCategories
        categories={categories}
        searchText={searchText}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />

      <CategoryDialog
        category={null}
        loading={loading}
        headerText="Add new Category"
        open={addDialog}
        onConfirm={onCreateSubmit}
        onRefuse={() => {
          setAddDialog(false);
          setCurrentCategory(null);
        }}
      />

      <CategoryDialog
        open={editDialog}
        loading={loading}
        onConfirm={onUpdateSubmit}
        headerText="Editing Category"
        onRefuse={() => {
          setEditDialog(false);
          setCurrentCategory(null);
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
