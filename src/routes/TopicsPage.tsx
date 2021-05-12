import React from "react";
import { getCategories, getTopics } from "../api/api";
import {
  Category,
  CategoryTopic,
  PageProps,
  Related,
  Topic,
} from "../interfaces/Interfaces";
import TableTopics from "../components/tables/TableTopics";
import CustomButton from "../components/buttons/CustomButton";
import SearchBar from "../components/input/SearchBar";
import TopicAddDialog from "../components/dialogs/TopicDialog";
import TopicEditDialog from "../components/dialogs/TopicDialog";
import DeleteDialog from "../components/dialogs/ConfirmDialog";
import { useAppStyles } from "../styles/common";

import {
  getCategoriesFromTitles,
  getRelatedFromTitle,
  onTopicAdd,
  onTopicDelete,
  onTopicUpdate,
} from "src/utils/topics";
import { getHash } from "src/utils/utils";

const NO_TOPIC: Topic = {
  categories: [],
  id: -1,
  related: [],
  source: "",
  timestamp: new Date(),
  title: "",
  ref_id: -1,
};

export default function ViewPage({
  token,
  currentLanguage,
  setLoading,
  onError,
  onSuccess,
}: PageProps) {
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [currentTopic, setCurrentTopic] = React.useState<Topic>(NO_TOPIC);
  const [topicAddDialog, setTopicAddDialog] = React.useState<boolean>(false);
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>("");

  const classes = useAppStyles();

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const retrievedTopics = await getTopics(currentLanguage, token);
      if (retrievedTopics != null) {
        setTopics(retrievedTopics);
      }
      const retrievedCategories = await getCategories(currentLanguage, token);
      if (retrievedCategories != null) {
        setCategories(retrievedCategories);
      }
      setLoading(false);
    })();
  }, [currentLanguage]);

  const onEdit = (topic: Topic) => {
    setCurrentTopic(topic);
    setEditDialog(true);
  };

  const onDelete = (topic: Topic) => {
    setCurrentTopic(topic);
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
            onClick={() => setTopicAddDialog(true)}
            title="INSERT NEW TOPIC"
          />
        </div>
      </div>
      <TableTopics
        searchText={searchText}
        onDelete={onDelete}
        onEdit={onEdit}
        topics={topics}
      />

      <TopicEditDialog
        open={editDialog}
        related={topics}
        preselectedRelated={currentTopic.related}
        preselectedCategories={currentTopic.categories}
        topic={currentTopic.title}
        categories={categories}
        onConfirm={(
          newTitle: string,
          selectedCategories: CategoryTopic[],
          selectedRelated: Related[]
        ) => {
          onTopicUpdate(
            {
              id: currentTopic.id,
              title: newTitle,
              related: selectedRelated,
              source: "TopPicks Creators",
              timestamp: new Date(),
              categories: selectedCategories,
              ref_id: currentTopic.ref_id,
            },
            topics,
            currentLanguage,
            token,
            setTopics,
            setLoading,
            onSuccess,
            onError
          );
          setCurrentTopic(NO_TOPIC);
          setEditDialog(false);
        }}
        onRefuse={() => {
          setCurrentTopic(NO_TOPIC);
          setEditDialog(false);
        }}
        headerText="Edit Topic"
      />

      <TopicAddDialog
        open={topicAddDialog}
        preselectedCategories={[]}
        preselectedRelated={[]}
        categories={categories}
        related={topics}
        headerText="Add New Topic"
        topic=""
        onConfirm={(
          newTitle: string,
          selectedCategories: CategoryTopic[],
          selectedRelated: Related[]
        ) => {
          onTopicAdd(
            {
              id: getHash(newTitle, currentLanguage),
              title: newTitle,
              related: selectedRelated,
              source: "TopPicks Creators",
              timestamp: new Date(),
              categories: selectedCategories,
              ref_id: getHash(newTitle, currentLanguage),
            },
            topics,
            currentLanguage,
            token,
            setTopics,
            setLoading,
            onSuccess,
            onError
          );
          setTopicAddDialog(false);
        }}
        onRefuse={() => {
          setCurrentTopic(NO_TOPIC);
          setTopicAddDialog(false);
        }}
      />

      <DeleteDialog
        open={deleteDialog}
        onConfirm={() => {
          onTopicDelete(
            currentTopic.ref_id,
            topics,
            currentLanguage,
            token,
            setTopics,
            setLoading,
            onSuccess,
            onError
          );
          setCurrentTopic(NO_TOPIC);
          setDeleteDialog(false);
        }}
        title="Proceed to Delete the question?"
        description="The question record will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setCurrentTopic(NO_TOPIC);
          setDeleteDialog(false);
        }}
      />
    </>
  );
}
