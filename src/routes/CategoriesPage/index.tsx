import React from "react";
import { getCategories, getCategoryTopics } from "../../api/api";
import {
  Category,
  CategoryTopic,
  MaterialUiColor,
  PageProps,
} from "../../interfaces/Interfaces";
import TableCategories from "../../components/tables/TableCategories";
import CustomButton from "../../components/buttons/Button";
import CategoryDialog from "../../components/dialogs/CategoryDialog";
import SearchBar from "../../components/input/SearchBar";
import DeleteDialog from "../../components/dialogs/ConfirmDialog";
import { useAppStyles } from "../../styles/common";
import {
  onCategoryAdd,
  onCategoryDeleteMany,
  onCategoryDeleteUnique,
  onCategoryUpdate,
} from "src/utils/topics";
import { getHash } from "src/utils/utils";
import Switch from "src/components/select/Switch";

const NO_CATEGORY: Category = {
  id: -1,
  ref_id: -1,
  title: "",
  categoryTopics: [],
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
  const [multipleDelete, setMultipleDelete] = React.useState<boolean>(false);
  const classes = useAppStyles();

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const retrievedCategories = await getCategories(currentLanguage);
      if (retrievedCategories != null) {
        setCategories(retrievedCategories);
      }
      const retrievedCategTopics = await getCategoryTopics(currentLanguage);
      if (retrievedCategTopics != null) {
        setCategoryTopics(retrievedCategTopics);
      }
      setLoading(false);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  const onEdit = (categ: Category) => {
    setCurrentCategory(categ);
    setEditDialog(true);
  };

  const onDelete = (categ: Category) => {
    setCurrentCategory(categ);
    setDeleteDialog(true);
  };

  const onAddSubmit = async (
    newCategory: string,
    newDescription: string,
    newImageUrl: string,
    newCategTopics: CategoryTopic[]
  ) => {
    await onCategoryAdd(
      {
        id: getHash(newCategory, currentLanguage),
        title: newCategory,
        ref_id: getHash(newCategory, currentLanguage),
        categoryTopics: newCategTopics,
        description: newDescription,
        image: newImageUrl,
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

  const onEditSubmit = async (
    newCategory: string,
    newDescription: string,
    newImageUrl: string,
    newCategTopics: CategoryTopic[]
  ) => {
    await onCategoryUpdate(
      {
        id: currentCategory.id,
        title: newCategory,
        ref_id: currentCategory.ref_id,
        image: newImageUrl,
        categoryTopics: newCategTopics,
        description: newDescription,
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
    setEditDialog(false);
    setCurrentCategory(NO_CATEGORY);
  };

  const onMultipleDelete = () => {
    multipleDelete
      ? onCategoryDeleteMany(
          currentCategory.ref_id,
          categories,
          currentLanguage,
          token,
          setCategories,
          setLoading,
          onSuccess,
          onError
        )
      : onCategoryDeleteUnique(
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
        onDelete={onDelete}
        onEdit={onEdit}
      />

      <CategoryDialog
        category=""
        loading={loading}
        headerText="Add new Category"
        open={addDialog}
        preselectedCategTopics={[]}
        categTopics={categoryTopics}
        onConfirm={onAddSubmit}
        onRefuse={() => {
          setAddDialog(false);
          setCurrentCategory(NO_CATEGORY);
        }}
      />

      <CategoryDialog
        open={editDialog}
        loading={loading}
        description={currentCategory.description}
        image={currentCategory.image}
        preselectedCategTopics={currentCategory.categoryTopics}
        categTopics={categoryTopics}
        onConfirm={onEditSubmit}
        headerText="Editing Category"
        onRefuse={() => {
          setEditDialog(false);
          setCurrentCategory(NO_CATEGORY);
        }}
        category={currentCategory.title}
      />

      <DeleteDialog
        open={deleteDialog}
        onConfirm={onMultipleDelete}
        title="Proceed to Delete the question?"
        description="The question record will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setDeleteDialog(false);
        }}
      >
        <Switch
          text="Multiple Delete"
          textColor="black"
          color={MaterialUiColor.Secondary}
          handleChange={() => setMultipleDelete(!multipleDelete)}
          value={multipleDelete}
        />
      </DeleteDialog>
    </>
  );
}