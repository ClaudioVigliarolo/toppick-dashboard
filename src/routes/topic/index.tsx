import React from "react";
import TableTopics from "@/components/topic/TableTopics";
import Button from "@/components/ui/buttons/Button";
import SearchBar from "@/components/ui/SearchBar";
import TopicDialog from "@/components/topic/dialog";
import DeleteDialog from "@/components/ui/dialog/ConfirmDialog";
import { useAppStyles } from "@/styles/common";
import { AuthContext } from "@/context/AuthContext";
import { StatusContext } from "@/context/StatusContext";
import {
  createTopic,
  deleteTopic,
  updateTopic,
} from "@toppick/common/build/api";
import { TopicCreated, TopicFeatured } from "@toppick/common/build/interfaces";
import SearchDialog from "@/components/search/keyword_dialog_preview";
import { getErrorMessage } from "@toppick/common/build/utils";
import { getTopics } from "@toppick/common/build/api";

export default function TopicPage() {
  const [topics, setTopics] = React.useState<TopicFeatured[]>([]);
  const [currentTopic, setCurrentTopic] = React.useState<TopicFeatured | null>(
    null
  );
  const [isShowCreateDialog, setIsShowCreateDialog] =
    React.useState<boolean>(false);
  const [isShowUpdateDialog, setIsShowUpdateDialog] =
    React.useState<boolean>(false);
  const [searchDialog, setSearchDialog] = React.useState<boolean>(false);
  const [isShowDeleteDialog, setIsShowDeleteDialog] =
    React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const { setIsAppLoading, setAppSuccess, setAppError } =
    React.useContext(StatusContext);
  const { authToken, currentLanguage } = React.useContext(AuthContext);

  const classes = useAppStyles();

  React.useEffect(() => {
    (async () => {
      setIsAppLoading(true);
      try {
        const retrievedTopics = await getTopics({
          sort_by_timestamp: true,
          include_inactive: true,
          include_info: true,
        });
        if (retrievedTopics) {
          setTopics(retrievedTopics);
        }
      } catch (error) {
        setAppError();
      }
      setIsAppLoading(false);
    })();
  }, [currentLanguage]);

  const onUpdateTopic = async (topic: TopicCreated) => {
    setIsLoading(true);
    setError("");
    try {
      const newTopic = await updateTopic(authToken, currentTopic!.id, topic);
      const index = topics.findIndex((topic) => topic.id == newTopic.id);
      topics[index] = newTopic;
      setTopics([...topics]);
      setIsShowUpdateDialog(false);
      setCurrentTopic(null);
      setAppSuccess();
    } catch (error) {
      setError(getErrorMessage(error));
    }
    setIsLoading(false);
  };

  const onDeleteSubmit = async () => {
    setIsAppLoading(true);
    try {
      await deleteTopic(authToken, currentTopic!.id);
      const newTopics = topics.filter((topic) => topic.id !== currentTopic!.id);
      setTopics(newTopics);
      setCurrentTopic(null);
      setIsShowDeleteDialog(false);
      setAppSuccess();
    } catch (error) {
      setAppError(getErrorMessage(error));
    }
    setIsAppLoading(false);
  };
  const onCreateTopic = async (topic: TopicCreated) => {
    setIsLoading(true);
    setError("");
    try {
      const newTopic = await createTopic(authToken, topic);
      topics.unshift(newTopic);
      setTopics([...topics]);
      setIsShowCreateDialog(false);
      setCurrentTopic(null);
      setAppSuccess();
    } catch (error) {
      setError(getErrorMessage(error));
    }
    setIsLoading(false);
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
          onClick={() => setIsShowCreateDialog(true)}
          title="Create New Topic"
        />
      </div>
      <TableTopics
        searchText={searchText}
        topics={topics}
        onDeleteTopic={(topic) => {
          setCurrentTopic(topic);
          setIsShowDeleteDialog(true);
        }}
        onUpdateTopic={(topic) => {
          setCurrentTopic(topic);
          setIsShowUpdateDialog(true);
        }}
        onUpdateSearch={(topic) => {
          setCurrentTopic(topic);
          setSearchDialog(true);
        }}
      />

      <TopicDialog
        open={isShowUpdateDialog}
        loading={isLoading}
        topic={currentTopic}
        error={error}
        onSubmit={onUpdateTopic}
        onRefuse={() => {
          setCurrentTopic(null);
          setIsShowUpdateDialog(false);
          setError("");
        }}
        headerText="Edit Topic"
      />

      <TopicDialog
        open={isShowCreateDialog}
        loading={isLoading}
        error={error}
        headerText="Create New Topic"
        topic={null}
        onSubmit={onCreateTopic}
        onRefuse={() => {
          setCurrentTopic(null);
          setIsShowCreateDialog(false);
          setError("");
        }}
      />

      {currentTopic && (
        <SearchDialog
          open={searchDialog}
          headerText="Edit Search"
          topicId={currentTopic.id}
          onClose={() => {
            setCurrentTopic(null);
            setSearchDialog(false);
          }}
        />
      )}

      <DeleteDialog
        open={isShowDeleteDialog}
        onConfirm={onDeleteSubmit}
        title="Proceed to Delete the topic?"
        description="The topic  record will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setCurrentTopic(null);
          setIsShowDeleteDialog(false);
        }}
      />
    </>
  );
}
