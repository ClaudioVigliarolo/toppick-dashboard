import React from "react";
import TableTopics from "@/components/topic/TableTopics";
import Button from "@/components/ui/buttons/Button";
import SearchBar from "@/components/ui/SearchBar";
import TopicDialog from "@/components/topic/dialog";
import DeleteDialog from "@/components/ui/dialog/ConfirmDialog";
import { useAppStyles } from "@/styles/common";
import { AuthContext } from "@/context/AuthContext";
import { StatusContext } from "@/context/StatusContext";
import { getAllTopics } from "@/services/topic";
import { TopicCreated, TopicFeatured } from "@toppick/common";
import { onTopicCreate, onTopicDelete, onTopicUpdate } from "@/utils/topics";
import SearchDialog from "@/components/search/dialog";

export default function TopicPage() {
  const [topics, setTopics] = React.useState<TopicFeatured[]>([]);
  const [currentTopic, setCurrentTopic] = React.useState<TopicFeatured | null>(
    null
  );
  const [topicAddDialog, setTopicCreateDialog] = React.useState<boolean>(false);
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [searchDialog, setSearchDialog] = React.useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const { setLoading, onSuccess, onError, loading } =
    React.useContext(StatusContext);
  const { authToken, currentLanguage } = React.useContext(AuthContext);

  const classes = useAppStyles();

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const retrievedTopics = await getAllTopics();
        if (retrievedTopics) {
          setTopics(retrievedTopics);
        }
      } catch (error) {
        onError();
      }
      setLoading(false);
    })();
  }, [currentLanguage]);

  const onUpdateTopic = (topic: TopicFeatured) => {
    setCurrentTopic(topic);
    setEditDialog(true);
  };
  const onUpdateSearch = (topic: TopicFeatured) => {
    setCurrentTopic(topic);
    setSearchDialog(true);
  };

  const onDeleteShow = (topic: TopicFeatured) => {
    setCurrentTopic(topic);
    setDeleteDialog(true);
  };

  const onUpdateSubmit = async (newTopic: TopicCreated) => {
    await onTopicUpdate(
      newTopic,
      topics,
      currentLanguage,
      authToken,
      setTopics,
      setLoading,
      onSuccess,
      onError
    );
    setCurrentTopic(null);
    setEditDialog(false);
  };

  const onDeleteSubmit = () => {
    onTopicDelete(
      currentTopic!.id,
      topics,
      currentLanguage,
      authToken,
      setTopics,
      setLoading,
      onSuccess,
      onError
    );
    setCurrentTopic(null);
    setDeleteDialog(false);
  };
  const onCreateSubmit = async (newTopic: TopicCreated) => {
    await onTopicCreate(
      newTopic,
      topics,
      currentLanguage,
      authToken,
      setTopics,
      setLoading,
      onSuccess,
      onError
    );
    setTopicCreateDialog(false);
    setCurrentTopic(null);
    setEditDialog(false);
  };

  return (
    <>
      <div className={classes.headerSection}>
        <SearchBar
          placeholder="Filter Topics"
          setSearchText={(text) => setSearchText(text)}
          searchText={searchText}
        />
        <Button
          onClick={() => setTopicCreateDialog(true)}
          title="CREATE NEW TOPIC"
        />
      </div>
      <TableTopics
        searchText={searchText}
        onDeleteTopic={onDeleteShow}
        onUpdateTopic={onUpdateTopic}
        onUpdateSearch={onUpdateSearch}
        topics={topics}
      />

      <TopicDialog
        open={editDialog}
        loading={loading}
        topic={currentTopic}
        onConfirm={onUpdateSubmit}
        onRefuse={() => {
          setCurrentTopic(null);
          setEditDialog(false);
        }}
        headerText="Edit Topic"
      />

      <TopicDialog
        open={topicAddDialog}
        loading={loading}
        headerText="Create New Topic"
        topic={null}
        onConfirm={onCreateSubmit}
        onRefuse={() => {
          setCurrentTopic(null);
          setTopicCreateDialog(false);
        }}
      />

      <SearchDialog
        open={searchDialog}
        headerText="Edit Search"
        id={currentTopic ? currentTopic.id : null}
        onClose={() => {
          setCurrentTopic(null);
          setSearchDialog(false);
        }}
      />

      <DeleteDialog
        open={deleteDialog}
        onConfirm={onDeleteSubmit}
        title="Proceed to Delete the question?"
        description="The question  record will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setCurrentTopic(null);
          setDeleteDialog(false);
        }}
      />
    </>
  );
}
