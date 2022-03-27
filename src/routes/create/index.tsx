import React from "react";
import { useAppStyles } from "@/styles/common";
import TopicDialog from "@/components/topic/dialog/topic";
import CreatePageHeader from "./sections/CreatePageHeader";
import CreatePageBody from "./sections/CreatePageBody";
import { onQuestionsAdd, onTopicCreate } from "@/utils/topics";
import { StatusContext } from "@/context/StatusContext";
import { AuthContext } from "@/context/AuthContext";
import { getQuestions, getTopicsLabels } from "@/services/topics";
import {
  DashLabel,
  QuestionCreated,
  QuestionDetail,
  TopicCreated,
  TopicFeatured,
  TopicLevel,
} from "@toppick/common";

const NO_TOPIC: TopicFeatured = {
  active: false,
  id: -1,
  timestamp: new Date(),
  title: "select a topic to update",
  description: "",
  image: "",
  level: TopicLevel.EASY,
};

const NEW_QUESTION: QuestionCreated = {
  title: "",
  examples: [],
  resources: [],
  new: false,
  user_id: "",
};

export default function CreatePage() {
  const [selectedTopic, setSelectedTopic] = React.useState<DashLabel>(NO_TOPIC);
  const [topicAddDialog, setTopicCreateDialog] = React.useState<boolean>(false);
  const [currentQuestions, setCurrentQuestions] = React.useState<
    QuestionCreated[]
  >([]);
  const [isUpdate, setIsUpdate] = React.useState<boolean>(false);
  const [isReview, setReview] = React.useState<boolean>(false);
  const [topics, setTopics] = React.useState<DashLabel[]>([]);
  const { setLoading, onSuccess, onError, loading } =
    React.useContext(StatusContext);
  const { authToken, currentLanguage, userId } = React.useContext(AuthContext);

  const classes = useAppStyles();

  React.useEffect(() => {
    (async () => {
      onReset();
      setLoading(true);
      try {
        const allTopics = await getTopicsLabels("all");
        setTopics(allTopics);
      } catch (error) {
        onError();
      }
      setLoading(false);
    })();
  }, [currentLanguage]);

  const handleTopicChange = async (index: number) => {
    if (index < 0) {
      return onReset();
    }
    setSelectedTopic(topics[index]);
    if (topics[index] === NO_TOPIC) {
      return;
    }
    setLoading(true);
    try {
      const retrievedQuestions = await getQuestions(topics[index].id);
      if (retrievedQuestions) {
        const newQuestions: QuestionCreated[] = [...retrievedQuestions].map(
          (q) => ({
            ...q,
            examples: q.examples.map((ex) => ({
              id: ex.id,
              user_id: ex.users!.uid,
              title: ex.title,
            })),
            title: q.title,
            resources: q.resources.map((res) => ({
              id: res.id,
              title: res.title,
              user_id: res.users!.uid,
              url: res.url,
            })),
            new: false,
            user_id: q.user_id,
          })
        );
        setCurrentQuestions(newQuestions);
        if (retrievedQuestions.length > 0) {
          setIsUpdate(true);
        } else {
          setIsUpdate(false);
        }
      }
    } catch (error) {
      onError();
    }
    setLoading(false);
  };

  const onSubmitToReview = () => {
    setCurrentQuestions([...currentQuestions]);
    window.scrollTo(0, 0);
    setReview(true);
  };

  const onRevertFromReview = () => {
    setCurrentQuestions([...currentQuestions]);

    setReview(false);
  };

  const onReset = async () => {
    setReview(false);
    window.scrollTo(0, 0);
    setSelectedTopic(NO_TOPIC);
    setCurrentQuestions([]);
  };

  const onQuestionChange = (index: number, question: QuestionCreated) => {
    {
      const newQuestions = [...currentQuestions];
      newQuestions[index] = question;
      setCurrentQuestions(newQuestions);
    }
  };

  const onQuestionCreate = (index: number) => {
    const newQuestions = [...currentQuestions];
    const newQuestion = {
      ...NEW_QUESTION,
      topic: selectedTopic,
      user_id: userId,
    };
    newQuestions.splice(index + 1, 0, newQuestion);
    setCurrentQuestions(newQuestions);
  };
  const onQuestionDelete = (index: number) => {
    const newQuestions = [...currentQuestions];
    newQuestions.splice(index, 1);
    setCurrentQuestions(newQuestions);
  };

  const onSubmitCallback = () => {
    onReset();
    onSuccess();
  };

  const onSubmit = async (questions: QuestionCreated[]) => {
    await onQuestionsAdd(
      questions,
      selectedTopic.id,
      currentLanguage,
      authToken,
      setLoading,
      onSubmitCallback,
      onError
    );
  };

  const onCreateTopicSubmit = async (newTopic: TopicCreated) => {
    await onTopicCreate(
      newTopic,
      topics as TopicFeatured[],
      currentLanguage,
      authToken,
      setTopics,
      setLoading,
      async () => {
        setSelectedTopic({
          id: topics[0].id,
          title: topics[0].title,
        });
        setTopicCreateDialog(false);
        setIsUpdate(false);
        onSuccess();
      },
      onError
    );
  };

  const onRefuseTopicCreate = async () => {
    setSelectedTopic(NO_TOPIC);
    setTopicCreateDialog(false);
  };

  return (
    <div className={classes.container}>
      <CreatePageHeader
        classes={classes}
        defaultTopic={NO_TOPIC}
        topics={topics}
        handleTopicChange={handleTopicChange}
        isReview={isReview}
        isUpdate={isUpdate}
        onTopicCreate={() => setTopicCreateDialog(true)}
        selectedTopic={selectedTopic}
      />

      <CreatePageBody
        isReview={isReview}
        setReview={setReview}
        onQuestionChange={onQuestionChange}
        onQuestionCreate={onQuestionCreate}
        onSubmit={onSubmit}
        setQuestions={setCurrentQuestions}
        onQuestionDelete={onQuestionDelete}
        questions={currentQuestions}
        defaultTopic={NO_TOPIC}
        loading={loading}
        onSubmitToReview={onSubmitToReview}
        onRevertFromReview={onRevertFromReview}
        resetTopic={() => setSelectedTopic(NO_TOPIC)}
        selectedTopic={selectedTopic}
      />

      <TopicDialog
        open={topicAddDialog}
        loading={loading}
        headerText="Create New Topic"
        topic={null}
        onConfirm={onCreateTopicSubmit}
        onRefuse={onRefuseTopicCreate}
      />
    </div>
  );
}
