import React from "react";
import { getCategories, getTopics } from "../../api/api";
import {
  Category,
  MaterialUiColor,
  PageProps,
  Topic,
} from "../../interfaces/Interfaces";
import TableTopics from "../../components/tables/TableTopics";
import CustomButton from "../../components/buttons/Button";
import SearchBar from "../../components/input/SearchBar";
import TopicDialog from "../../components/dialogs/TopicDialog";
import Switch from "../../components/select/Switch";
import DeleteDialog from "../../components/dialogs/ConfirmDialog";
import { useAppStyles } from "../../styles/common";
import {
  onTopicCreate,
  onTopicDeleteMany,
  onTopicDeleteUnique,
  onTopicUpdate,
} from "src/utils/topics";
import { getHash } from "src/utils/utils";

const NO_TOPIC: Topic = {
  categories: [],
  id: -1,
  related: [],
  source: "",
  level: 0,
  type: 0,
  timestamp: new Date(),
  title: "",
  ref_id: -1,
  description: "",
  image: "",
  active: false,
  approved: false,
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
  const [multipleDelete, setMultipleDelete] = React.useState<boolean>(true);

  const classes = useAppStyles();

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const retrievedTopics = await getTopics(currentLanguage, token);
      if (retrievedTopics != null) {
        setTopics(retrievedTopics);
      }
      const retrievedCategories = await getCategories(currentLanguage);
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

  const onDelete = (topic: Topic) => {
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
        onDelete={onDelete}
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
        onConfirm={() => {
          multipleDelete
            ? onTopicDeleteMany(
                currentTopic.ref_id,
                topics,
                currentLanguage,
                token,
                setTopics,
                setLoading,
                onSuccess,
                onError
              )
            : onTopicDeleteUnique(
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
        }}
        title="Proceed to Delete the question?"
        description="The question record will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setCurrentTopic(NO_TOPIC);
          setDeleteDialog(false);
        }}
      >
        <Switch
          text="Multiple Delete"
          textColor="black"
          switchColor={MaterialUiColor.Secondary}
          handleChange={() => setMultipleDelete(!multipleDelete)}
          value={multipleDelete}
        />
      </DeleteDialog>
    </>
  );
}
