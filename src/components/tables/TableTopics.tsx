import React from "react";
import {
  CustomTable,
  StyledEditCell,
  StyledTableRow,
  useStyles,
  StyledTableCell,
} from "./TableStyles";
import { Category, Topic, Related } from "../../interfaces/Interfaces";
import DeleteDialog from "../dialogs/ConfirmDialog";
import TopicAddDialog from "../dialogs/TopicDialog";
import TopicEditDialog from "../dialogs/TopicDialog";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TransactionAlert from "../alerts/TransactionAlert";
import { getFormattedDate } from "../../utils/utils";
import SearchBar from "../input/searchBar";
import CustomButton from "../buttons/CustomButton";
import { onTopicAdd, onTopicDelete, onTopicUpdate } from "src/utils/topics";

interface TableTopicsProps {
  topics: Topic[];
  categories: Category[];
  token: string;
  currentLanguage: string;
  setLoading: (newVal: boolean) => void;
}

const DEFAULT_TOPIC: Topic = {
  categories: [],
  id: -1,
  related: [],
  source: "",
  timestamp: new Date(),
  title: "",
};

export default function TableTopics(props: TableTopicsProps) {
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [currentTopic, setCurrentTopic] = React.useState<Topic>(DEFAULT_TOPIC);

  const [searchText, setSearchText] = React.useState<string>("");
  const [topicAddDialog, setTopicAddDialog] = React.useState<boolean>(false);
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const classes = useStyles();

  React.useEffect(() => {
    setTopics(props.topics);
    setCategories(props.categories);
  }, [props.topics, props.categories]);

  const onEdit = (topic: Topic) => {
    setCurrentTopic(topic);
    setEditDialog(true);
  };

  const onDelete = (topic: Topic) => {
    setCurrentTopic(topic);
    setDeleteDialog(true);
  };

  const renderRows = (topics: Topic[]) => {
    return topics.map((topic: Topic, index: number) => {
      if (topic.title.toLowerCase().includes(searchText.toLowerCase())) {
        return (
          <StyledTableRow key={index}>
            <StyledTableCell> {topic.title}</StyledTableCell>
            <StyledTableCell>{topic.source}</StyledTableCell>
            <StyledTableCell>
              {getFormattedDate(topic.timestamp)}
            </StyledTableCell>
            <StyledEditCell>
              {topic.related.map((r: Related) => r.title + " ")}
              <div className={classes.iconsContainer}>
                <EditIcon
                  className={classes.editIcon}
                  onClick={() => {
                    onEdit(topic);
                  }}
                />
                <DeleteIcon
                  onClick={() => {
                    onDelete(topic);
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
            onClick={() => setTopicAddDialog(true)}
            title="INSERT NEW TOPIC"
          />
        </div>
      </div>
      <CustomTable
        columns={["15%", "20%", "20%", "45%"]}
        columnNames={["title", "source", "last update", "related"]}
        body={renderRows(topics)}
      />

      <TopicEditDialog
        open={editDialog}
        related={topics
          .map((topic) => topic.title)
          .filter((s) => s != currentTopic.title)}
        preselectedRelated={currentTopic.related.map((r) => r.title)}
        preselectedCategories={currentTopic.categories.map((r) => r.title)}
        topic={currentTopic.title}
        categories={categories.map((categ) => categ.title)}
        onConfirm={(
          newTitle: string,
          selectedCategoriesTitle: string[],
          selectedRelatedTitles: string[]
        ) => {
          onTopicUpdate(
            currentTopic.id,
            newTitle,
            selectedCategoriesTitle,
            selectedRelatedTitles,
            topics,
            categories,
            props.currentLanguage,
            props.token,
            setTopics,
            props.setLoading,
            setSuccess,
            setError
          );
          setCurrentTopic(DEFAULT_TOPIC);
          setEditDialog(false);
        }}
        onRefuse={() => {
          setCurrentTopic(DEFAULT_TOPIC);
          setEditDialog(false);
        }}
        headerText="Edit Topic"
      />

      <TopicAddDialog
        open={topicAddDialog}
        preselectedCategories={[]}
        preselectedRelated={[]}
        categories={categories.map((categ) => categ.title)}
        related={topics
          .map((topic) => topic.title)
          .filter((s) => s != currentTopic.title)}
        headerText="Add New Topic"
        topic=""
        onConfirm={(
          topicTitle: string,
          selectedCategoriesTitle: string[],
          selectedRelatedTitles: string[]
        ) => {
          onTopicAdd(
            topicTitle,
            selectedCategoriesTitle,
            selectedRelatedTitles,
            topics,
            categories,
            props.currentLanguage,
            props.token,
            setTopics,
            props.setLoading,
            setSuccess,
            setError
          );
          setDeleteDialog(false);
        }}
        onRefuse={() => {
          setCurrentTopic(DEFAULT_TOPIC);
          setTopicAddDialog(false);
        }}
      />

      <DeleteDialog
        open={deleteDialog}
        onConfirm={() => {
          onTopicDelete(
            currentTopic.id,
            topics,
            props.currentLanguage,
            props.token,
            setTopics,
            props.setLoading,
            setSuccess,
            setError
          );
          setCurrentTopic(DEFAULT_TOPIC);
          setDeleteDialog(false);
        }}
        title="Proceed to Delete the question?"
        description="The question record will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setCurrentTopic(DEFAULT_TOPIC);
          setDeleteDialog(false);
        }}
      />
      <TransactionAlert success={success} error={error} />
    </>
  );
}
