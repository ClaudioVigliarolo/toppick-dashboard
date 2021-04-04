import React from "react";
import {
  CustomTable,
  StyledEditCell,
  StyledTableRow,
  useStyles,
  StyledTableCell,
} from "./TableStyles";
import {
  Category,
  Topic,
  CategoryTopic,
  Related,
} from "../../interfaces/Interfaces";
import { CONSTANTS } from "../../constants/constants";
import { addTopic, deleteTopic, updateTopic } from "../../api/api";
import DeleteDialog from "../dialogs/ConfirmDialog";
import TopicAddDialog from "../dialogs/TopicDialog";
import TopicEditDialog from "../dialogs/TopicDialog";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TransactionAlert from "../alerts/TransactionAlert";
import { getFormattedDate, getHash } from "../../utils/utils";
import SearchBar from "../input/searchBar";
import CustomButton from "../buttons/CustomButton";

interface TableTopicsProps {
  topics: Topic[];
  categories: Category[];
  token: string;
  currentLanguage: string;
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

  const onTopicUpdate = async (
    newTitle: string,
    selectedCategoriesTitles: string[],
    topicID: number,
    selectedRelatedTitles: string[]
  ): Promise<void> => {
    //new categories for added topic
    const updatedCategories: Category[] = [];
    selectedCategoriesTitles.forEach((title: string) => {
      const id = props.categories.find((x) => x.title === title)?.id;
      if (id) {
        updatedCategories.push({ id, title });
      }
    });

    //new related for  topic
    const newRelated: Related[] = [];
    selectedRelatedTitles.forEach((title: string) => {
      const id = topics.find((x) => x.title === title)?.id;
      if (id) {
        newRelated.push({ id, title });
      }
    });

    const updatedTopic: Topic = {
      id: topicID,
      source: "Top Picks Creator",
      timestamp: new Date(),
      title: newTitle,
      related: newRelated,
      categories: updatedCategories,
    };
    const val = await updateTopic(
      updatedTopic,
      props.currentLanguage,
      props.token
    );
    if (!val) {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      return;
    }
    //new topic updated successfully, update locally
    const newTopics = topics;
    const topicIndex = topics.findIndex((topic: Topic) => topic.id == topicID);
    newTopics[topicIndex].title = newTitle;
    newTopics[topicIndex].timestamp = new Date();
    newTopics[topicIndex].categories = updatedCategories;
    newTopics[topicIndex].related = [];

    //push new updated arrays
    setTopics([...newTopics]);

    //newTopics.push({ title: topicTitle, id: categoryHash });
    setSuccess(true);
    setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  };

  const onTopicAdd = async (
    topicTitle: string,
    selectedCategoriesTitles: string[],
    selectedRelatedTitles: string[]
  ): Promise<void> => {
    //new topic id
    const topicID = getHash(topicTitle);

    //new categories for added topic
    const newCategories: Category[] = [];
    selectedCategoriesTitles.forEach((title: string) => {
      const id = props.categories.find((x) => x.title === title)?.id;
      if (id) {
        newCategories.push({ id, title });
      }
    });

    //new related for added topic
    const newRelated: Related[] = [];
    selectedRelatedTitles.forEach((title: string) => {
      const id = topics.find((x) => x.title === title)?.id;
      if (id) {
        newRelated.push({ id, title });
      }
    });

    console.log("!!!!", newCategories);

    const newTopic: Topic = {
      id: topicID,
      source: "Top Picks Creator",
      timestamp: new Date(),
      title: topicTitle,
      related: newRelated,
      categories: newCategories,
    };

    const val = await addTopic(newTopic, props.currentLanguage, props.token);
    if (!val) {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      return;
    }

    //new topic added successfully, add locally
    const newTopics = topics;

    //update topic array
    newTopics.unshift(newTopic);

    //push new updated arrays
    setTopics([...newTopics]);

    setSuccess(true);
    setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  };

  const onTopicDelete = async (id: number): Promise<void> => {
    const val = await deleteTopic(id, props.currentLanguage, props.token);
    if (!val) {
      setError(true);
      setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
      return;
    }
    const newTopics = topics.filter((topic: Topic) => topic.id != id);
    setTopics([...newTopics]);
    setSuccess(true);
    setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
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
          topicTitle: string,
          selectedCategoriesTitle: string[],
          selectedRelatedTitles: string[]
        ) => {
          onTopicUpdate(
            topicTitle,
            selectedCategoriesTitle,
            currentTopic.id,
            selectedRelatedTitles
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
            selectedRelatedTitles
          );
          setCurrentTopic(DEFAULT_TOPIC);
          setTopicAddDialog(false);
        }}
        onRefuse={() => {
          setCurrentTopic(DEFAULT_TOPIC);
          setTopicAddDialog(false);
        }}
      />

      <DeleteDialog
        open={deleteDialog}
        onConfirm={() => {
          onTopicDelete(currentTopic.id);
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
