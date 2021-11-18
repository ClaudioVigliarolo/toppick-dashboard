import React from "react";
import { getCategories, getTopics } from "../../api/api";
import {
  Category,
  CategoryTopic,
  PageProps,
  Related,
  Topic,
  TopicLevel,
  TopicType,
} from "../../interfaces/Interfaces";
import TableTopics from "../../components/tables/TableTopics";
import CustomButton from "../../components/buttons/CustomButton";
import SearchBar from "../../components/input/SearchBar";
import TopicAddDialog from "../../components/dialogs/TopicDialog";
import TopicEditDialog from "../../components/dialogs/TopicDialog";
import Switch from "../../components/select/Switch";
import DeleteDialog from "../../components/dialogs/ConfirmDialog";
import { useAppStyles } from "../../styles/common";
import {
  onTopicAdd,
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
  const [topicAddDialog, setTopicAddDialog] = React.useState<boolean>(false);
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const [multipleDelete, setMultipleDelete] = React.useState<boolean>(true);

  const classes = useAppStyles();

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const retrievedTopics = await getTopics(currentLanguage);
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

  const onEdit = (topic: Topic) => {
    setCurrentTopic(topic);
    setEditDialog(true);
  };

  const onDelete = (topic: Topic) => {
    setCurrentTopic(topic);
    setDeleteDialog(true);
  };

  console.log("cccc", currentTopic);

  return (
    <>
      <div className={classes.headerSection}>
        <SearchBar
          placeholder="Filter Topics"
          setSearchText={(text) => setSearchText(text)}
          searchText={searchText}
        />
        <CustomButton
          onClick={() => setTopicAddDialog(true)}
          title="INSERT NEW TOPIC"
        />
      </div>
      <TableTopics
        searchText={searchText}
        onDelete={onDelete}
        onEdit={onEdit}
        topics={topics}
      />

      <TopicEditDialog
        open={editDialog}
        loading={loading}
        related={topics}
        source={currentTopic.source}
        type={currentTopic.type}
        preselectedRelated={currentTopic.related}
        preselectedCategories={currentTopic.categories}
        topic={currentTopic.title}
        level={currentTopic.level}
        image={currentTopic.image}
        description={currentTopic.description}
        categories={categories}
        onConfirm={async (
          newTitle: string,
          newSource: string,
          newType: TopicType,
          newLevel: TopicLevel,
          newDescription: string,
          newImage: string,
          selectedCategories: CategoryTopic[],
          selectedRelated: Related[]
        ) => {
          await onTopicUpdate(
            {
              id: currentTopic.id,
              title: newTitle,
              related: selectedRelated,
              source: newSource,
              description: newDescription,
              image: newImage,
              type: newType,
              level: newLevel,
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
        loading={loading}
        headerText="Add New Topic"
        topic=""
        onConfirm={async (
          newTitle: string,
          newSource: string,
          newType: TopicType,
          newLevel: TopicLevel,
          newDescription: string,
          newImage: string,
          selectedCategories: CategoryTopic[],
          selectedRelated: Related[]
        ) => {
          await onTopicAdd(
            {
              id: getHash(newTitle, currentLanguage),
              title: newTitle,
              type: newType,
              image: newImage,
              description: newDescription,
              related: selectedRelated,
              source: newSource,
              level: newLevel,
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
        children={
          <Switch
            text="Multiple Delete"
            textColor="black"
            handleChange={() => setMultipleDelete(!multipleDelete)}
            value={multipleDelete}
          />
        }
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
      />
    </>
  );
}
