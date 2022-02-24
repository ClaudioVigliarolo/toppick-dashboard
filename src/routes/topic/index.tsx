import React from "react";
import { getCategories, getTopics } from "@/services/api";
import { Category, Topic } from "@/interfaces/dash_topics";
import { MaterialUiColor, PageProps } from "@/interfaces/app";
import TableTopics from "@/components/topic/TableTopics";
import CustomButton from "@/components/ui/buttons/Button";
import SearchBar from "@/components/ui/SearchBar";
import TopicDialog from "@/components/topic/dialog/topic";
import Switch from "@/components/ui/select/Switch";
import DeleteDialog from "@/components/ui/dialog/ConfirmDialog";
import { useAppStyles } from "@/styles/common";
import {
  onTopicCreate,
  onTopicDeleteUnique,
  onTopicUpdate,
} from "@/utils/topics";
import { getHash } from "@/utils/utils";

const NO_TOPIC: Topic = {
  categories: [],
  id: -1,
  related: [],
  source: "",
  level: 0,

  timestamp: new Date(),
  title: "",
  ref_id: -1,
  description: "",
  image: "",
  active: false,
  approved: false,
  tags: [],
};

export default function ViewPage({
  token,
  currentLanguage,
  setLoading,
  onError,
  loading,
  onSuccess,
}: PageProps) {
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [currentTopic, setCurrentTopic] = React.useState<Topic>(NO_TOPIC);
  const [topicAddDialog, setTopicCreateDialog] = React.useState<boolean>(false);
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
  const onUpdate = (topic: Topic) => {
    setCurrentTopic(topic);
    setEditDialog(true);
  };

  const onDeleteShow = (topic: Topic) => {
    setCurrentTopic(topic);
    setDeleteDialog(true);
  };

  const onUpdateSubmit = async (newTopic: Topic) => {
    await onTopicUpdate(
      newTopic,
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
  };

  const onDeleteSubmit = () => {
    onTopicDeleteUnique(
      currentTopic.id,
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
  };
  const onCreateSubmit = async (newTopic: Topic) => {
    await onTopicCreate(
      {
        ...newTopic,
        id: getHash(newTopic.title, currentLanguage),
        timestamp: new Date(),
        ref_id: getHash(newTopic.title, currentLanguage),
      },
      topics,
      currentLanguage,
      token,
      setTopics,
      setLoading,
      onSuccess,
      onError
    );

    setTopicCreateDialog(false);
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
          onClick={() => setTopicCreateDialog(true)}
          title="INSERT NEW TOPIC"
        />
      </div>
      <TableTopics
        searchText={searchText}
        onDelete={onDeleteShow}
        onUpdate={onUpdate}
        topics={topics}
      />

      <TopicDialog
        open={editDialog}
        loading={loading}
        related={topics}
        categories={categories}
        topic={currentTopic}
        onConfirm={onUpdateSubmit}
        onRefuse={() => {
          setCurrentTopic(NO_TOPIC);
          setEditDialog(false);
        }}
        headerText="Edit Topic"
      />

      <TopicDialog
        open={topicAddDialog}
        categories={categories}
        related={topics}
        loading={loading}
        headerText="Add New Topic"
        topic={NO_TOPIC}
        onConfirm={onCreateSubmit}
        onRefuse={() => {
          setCurrentTopic(NO_TOPIC);
          setTopicCreateDialog(false);
        }}
      />

      <DeleteDialog
        open={deleteDialog}
        onConfirm={onDeleteSubmit}
        title="Proceed to Delete the question?"
        description="The question record will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setCurrentTopic(NO_TOPIC);
          setDeleteDialog(false);
        }}
      ></DeleteDialog>
    </>
  );
}
