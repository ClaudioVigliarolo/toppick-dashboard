import React from "react";
import { getCategories, getTopics } from "../api/api";
import { Category, PageProps, Topic } from "../interfaces/Interfaces";
import TableTopics from "../components/tables/TableTopics";
import CustomButton from "src/components/buttons/CustomButton";
import SearchBar from "src/components/input/searchBar";
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
  const [addDialog, setAddDialog] = React.useState<boolean>(false);
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
        categories={categories}
        searchText={searchText}
        onDelete={onDelete}
        onEdit={onEdit}
        topics={topics}
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
          selectedCategoriesTitles: string[],
          selectedRelatedTitles: string[]
        ) => {
          onTopicUpdate(
            {
              id: currentTopic.id,
              title: newTitle,
              related: getRelatedFromTitle(topics, selectedRelatedTitles),
              source: "TopPicks Creators",
              timestamp: new Date(),
              categories: getCategoriesFromTitles(
                categories,
                selectedCategoriesTitles
              ),
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
        categories={categories.map((categ) => categ.title)}
        related={topics
          .map((topic) => topic.title)
          .filter((s) => s != currentTopic.title)}
        headerText="Add New Topic"
        topic=""
        onConfirm={(
          newTitle: string,
          selectedCategoriesTitles: string[],
          selectedRelatedTitles: string[]
        ) => {
          onTopicAdd(
            {
              id: getHash(newTitle, currentLanguage),
              title: newTitle,
              related: getRelatedFromTitle(topics, selectedRelatedTitles),
              source: "TopPicks Creators",
              timestamp: new Date(),
              categories: getCategoriesFromTitles(
                categories,
                selectedCategoriesTitles
              ),
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
          setDeleteDialog(false);
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
