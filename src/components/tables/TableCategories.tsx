import React from 'react';
import {
  CustomTable,
  StyledEditCell,
  StyledTableRow,
  useStyles,
} from './TableStyles';
import { CONSTANTS } from '../../constants/constants';
import { Category } from '../../interfaces/Interfaces';
import { addCategory, deleteCategory, updateCategory } from '../../api/api';
import { getHash } from '../../utils/utils';
import DeleteDialog from '../dialogs/ConfirmDialog';
import CategoryAddDialog from '../dialogs/CategoryDialog';
import CategoryEditDialog from '../dialogs/CategoryDialog';
import CustomButton from '../buttons/CustomButton';
import SearchBar from '../input/searchBar';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TransactionAlert from '../alerts/TransactionAlert';

interface TableCategoriesProps {
  categories: Category[];
  token: string;
  currentLanguage: string;
}

export default function TableCategories(props: TableCategoriesProps) {
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [searchText, setSearchText] = React.useState<string>('');
  const [categoryAddDialog, setCategoryAddDialog] = React.useState<boolean>(
    false
  );
  const [currentCategoryId, setCurrentCategoryId] = React.useState<number>(-1);
  const [
    currentCategoryTitle,
    setCurrentCategoryTitle,
  ] = React.useState<string>('');

  const classes = useStyles();

  React.useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);

  const onCategoryAdd = async (newTitle: string): Promise<void> => {
    const categoryHash = getHash(newTitle);
    const val = await addCategory(
      newTitle,
      categoryHash,
      props.currentLanguage,
      props.token
    );
    const newCategories = categories;
    if (!val) {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      return;
    }
    newCategories.unshift({ title: newTitle, id: categoryHash });
    setSuccess(true);
    setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);

    setCategories([...newCategories]);
  };

  const onCategoryDelete = async (id: number): Promise<void> => {
    const val = await deleteCategory(id, props.currentLanguage, props.token);
    if (!val) {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      return;
    }
    const newCategories = categories.filter(
      (categ: Category) => categ.id != id
    );
    setCategories([...newCategories]);
    setSuccess(true);
    setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  };

  const onCategoryUpdate = async (
    id: number,
    newTitle: string
  ): Promise<void> => {
    const val = await updateCategory(
      newTitle,
      id,
      props.currentLanguage,
      props.token
    );
    if (!val) {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      return;
    }
    const newCategories = categories;
    newCategories.forEach(function (item: Category) {
      if (item.id == id) item.title = newTitle;
    });
    setSuccess(true);
    setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
    setCategories([...newCategories]);
  };

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
            onClick={() => setCategoryAddDialog(true)}
            title="INSERT NEW CATEGORY"
          />
        </div>
      </div>
      <CustomTable
        columns={['50%']}
        columnNames={['category']}
        body={renderRows(categories)}
      />

      <CategoryAddDialog
        category=""
        headerText="Add new Category"
        open={categoryAddDialog}
        onConfirm={(title: string) => {
          onCategoryAdd(title);
          setCategoryAddDialog(false);
        }}
        onRefuse={() => {
          setCategoryAddDialog(false);
        }}
      />

      <CategoryEditDialog
        open={editDialog}
        onConfirm={(newTitle: string) => {
          onCategoryUpdate(currentCategoryId, newTitle);
          setEditDialog(false);
          setCurrentCategoryId(-1);
          setCurrentCategoryTitle('');
        }}
        headerText="Editing Category"
        onRefuse={() => {
          setEditDialog(false);
          setCurrentCategoryId(-1);
          setCurrentCategoryTitle('');
        }}
        category={currentCategoryTitle}
      />

      <DeleteDialog
        open={deleteDialog}
        onConfirm={() => {
          onCategoryDelete(currentCategoryId);
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
