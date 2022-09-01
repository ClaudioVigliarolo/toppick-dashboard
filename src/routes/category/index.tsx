import React from "react";
import TableCategories from "@/components/category/TableCategories";
import Button from "@/components/ui/buttons/Button";
import CategoryDialog from "@/components/category/dialog";
import SearchBar from "@/components/ui/SearchBar";
import { useAppStyles } from "@/styles/common";
import { StatusContext } from "@/context/StatusContext";
import { AuthContext } from "@/context/AuthContext";
import DeleteDialog from "@/components/ui/dialog/ConfirmDialog";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@toppick/common/build/api";
import {
  CategoryFeatured,
  CategoryCreated,
} from "@toppick/common/build/interfaces";
import { getErrorMessage } from "@toppick/common/build/utils";

export default function CategoryPage() {
  const [categories, setCategories] = React.useState<CategoryFeatured[]>([]);
  const [isShowDeleteDialog, setIsShowDeleteDialog] =
    React.useState<boolean>(false);
  const [isShowUpdateDialog, setIsShowUpdateDialog] =
    React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const [isShowCreateDialog, setIsShowCreateDialog] =
    React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [currentCategory, setCurrentCategory] =
    React.useState<CategoryFeatured | null>(null);
  const { setIsAppLoading, setAppSuccess, setAppError } =
    React.useContext(StatusContext);
  const { authToken, currentLanguage } = React.useContext(AuthContext);
  const classes = useAppStyles();

  React.useEffect(() => {
    (async () => {
      setIsAppLoading(true);
      try {
        const retrievedCategories = await getCategories({});
        if (retrievedCategories) {
          setCategories(retrievedCategories);
        }
      } catch (error) {
        setAppError();
      }
      setIsAppLoading(false);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  const onCreateCategory = async (category: CategoryCreated) => {
    setIsLoading(true);
    setError("");
    try {
      const newCategory = await createCategory(category, authToken);
      const newCategories = [...categories];
      newCategories.unshift(newCategory);
      setCategories(newCategories);
      setIsShowCreateDialog(false);
      setAppSuccess();
    } catch (error) {
      setError(getErrorMessage(error));
    }
    setIsLoading(false);
  };

  const onUpdateCategory = async (category: CategoryCreated) => {
    setIsLoading(true);
    setError("");
    try {
      const newCategory = await updateCategory(category, authToken);
      const newCategories = [...categories];
      const updatedIndex = newCategories.findIndex(
        (cat) => cat.id === newCategory.id
      );
      newCategories[updatedIndex] = newCategory;
      setCategories(newCategories);
      setIsShowUpdateDialog(false);
      setCurrentCategory(null);
      setAppSuccess();
    } catch (error) {
      setError(getErrorMessage(error));
    }
    setIsLoading(false);
  };

  const onDeleteCategory = async () => {
    setIsAppLoading(true);
    try {
      await deleteCategory(currentCategory!.id, authToken);
      const newCategories = categories.filter(
        (categ) => categ.id !== currentCategory!.id
      );
      setCategories([...newCategories]);
      setIsShowDeleteDialog(false);
      setAppSuccess();
    } catch (error) {
      setAppError(getErrorMessage(error));
    }
    setIsAppLoading(false);
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
          onClick={() => setIsShowCreateDialog(true)}
          title="Create new Category"
        />
      </div>
      <TableCategories
        categories={categories}
        searchText={searchText}
        onDelete={(categ) => {
          setCurrentCategory(categ);
          setIsShowDeleteDialog(true);
        }}
        onUpdate={(categ) => {
          setCurrentCategory(categ);
          setIsShowUpdateDialog(true);
        }}
      />

      <CategoryDialog
        category={null}
        loading={isLoading}
        headerText="Create new Category"
        open={isShowCreateDialog}
        onSubmit={onCreateCategory}
        onClose={() => {
          setIsShowCreateDialog(false);
          setCurrentCategory(null);
          setError("");
        }}
        error={error}
      />

      <CategoryDialog
        open={isShowUpdateDialog}
        loading={isLoading}
        onSubmit={onUpdateCategory}
        headerText="Edit Category"
        onClose={() => {
          setIsShowUpdateDialog(false);
          setCurrentCategory(null);
          setError("");
        }}
        category={currentCategory}
        error={error}
      />

      <DeleteDialog
        open={isShowDeleteDialog}
        onConfirm={onDeleteCategory}
        title="Proceed to Delete the category?"
        description="The category record will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setIsShowDeleteDialog(false);
        }}
      />
    </>
  );
}
