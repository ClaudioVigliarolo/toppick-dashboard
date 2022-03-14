import React from "react";
import { useAppStyles } from "@/styles/common";
import TopicDialog from "@/components/topic/dialog/topic";
import CreatePageHeader from "./sections/CreatePageHeader";
import CreatePageBody from "./sections/CreatePageBody";

import { onQuestionsAdd, onTopicCreate } from "@/utils/topics";
import {
  generateExamples,
  getHash,
  parseExamples,
  removeExamples,
} from "@/utils/utils";
import {
  Question,
  Topic,
  Category,
  Example,
  CreatedQuestion,
} from "@/interfaces/dash_topics";
import { StatusContext } from "@/context/StatusContext";
import { AuthContext } from "@/context/AuthContext";
import {
  getCategories,
  getQuestionsByTopic,
  getTopics,
} from "@/services/topics";

const NEW_QUESTION: Question = {
  id: -1,
  title: "",
  new: true,
  examples: [],
  ext_resources: [],
  user_id: "",
};

const NO_TOPIC: Topic = {
  categories: [],
  id: -1,
  related: [],
  level: 0,
  source: "",
  timestamp: new Date(),
  title: "Select A Topic",
  ref_id: -1,
  description: "",
  image: "",
  active: false,
  tags: [],
};

export default function CreatePage() {
  const [selectedTopic, setSelectedTopic] = React.useState<Topic>(NO_TOPIC);
  const [topicAddDialog, setTopicCreateDialog] = React.useState<boolean>(false);
  const [currentQuestions, setCurrentQuestions] = React.useState<
    CreatedQuestion[]
  >([]);
  const [isUpdate, setIsUpdate] = React.useState<boolean>(false);
  const [isReview, setReview] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const { setLoading, onSuccess, onError, loading } =
    React.useContext(StatusContext);
  const { authToken, currentLanguage } = React.useContext(AuthContext);

  const classes = useAppStyles();

  React.useEffect(() => {
    (async () => {
      onReset();
      setLoading(true);
      try {
        const retrievedCategories = await getCategories(
          currentLanguage,
          authToken
        );
        if (retrievedCategories) {
          setCategories(retrievedCategories);
        }

        const retrievedTopics = await getTopics(currentLanguage, authToken);
        //sort by timestamp
        if (retrievedTopics) {
          setTopics(
            retrievedTopics.sort((a, b) => a.title.localeCompare(b.title))
          );
        }
      } catch (error) {
        onError();
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  const handleTopicChange = async (index: number) => {
    if (index < 0) {
      return onReset();
    }
    setSelectedTopic(topics[index]);
    if (topics[index] !== NO_TOPIC) {
      setLoading(true);
      try {
        const retrievedQuestions = await getQuestionsByTopic(
          topics[index].id,
          authToken
        );

        if (retrievedQuestions !== null) {
          const newQuestions = [...retrievedQuestions].map((q) => ({
            ...q,
            examples: [],
            title: generateExamples(q.title, q.examples as Example[]),
          }));
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
    }
  };

  const onSubmitToReview = () => {
    const newQuestions = [...currentQuestions]
      .filter((q) => q.title)
      .map((q) => ({
        ...q,
        title: removeExamples(q.title),
        examples: parseExamples(q.title),
      }));
    setCurrentQuestions(newQuestions);
    window.scrollTo(0, 0);
    setReview(true);
  };

  const onRevertFromReview = () => {
    const newQuestions = [...currentQuestions].map((q) => ({
      ...q,
      examples: [],
      title: generateExamples(q.title, q.examples as Example[]),
    }));
    //take current questions and push the examples
    setCurrentQuestions(newQuestions);

    setReview(false);
  };

  const onReset = async () => {
    setReview(false);
    window.scrollTo(0, 0);
    setSelectedTopic(NO_TOPIC);
    setCurrentQuestions([]);
  };

  const onQuestionChange = (index: number, question: CreatedQuestion) => {
    {
      const newQuestions = [...currentQuestions];
      newQuestions[index] = question;
      console.log("MT NNNN", question);
      setCurrentQuestions(newQuestions);
      console.log("MT ALLLLL", newQuestions);
    }
  };

  const onQuestionCreate = (index: number) => {
    const newQuestions = [...currentQuestions];
    const newQuestion = { ...NEW_QUESTION, topic: selectedTopic };
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

  const onSubmit = async (questions: CreatedQuestion[]) => {
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

  const onConfirmTopicCreate = async (topic: Topic) => {
    const newTopic = {
      ...topic,
      id: getHash(topic.title, currentLanguage),
      timestamp: new Date(),
      ref_id: getHash(topic.title, currentLanguage),
    };
    await onTopicCreate(
      newTopic,
      topics,
      currentLanguage,
      authToken,
      setTopics,
      setLoading,
      async () => {
        setSelectedTopic(newTopic);
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
        related={topics}
        categories={categories}
        topic={{ ...NO_TOPIC, title: "" }}
        headerText="Create New Topic"
        onConfirm={onConfirmTopicCreate}
        onRefuse={onRefuseTopicCreate}
      />
    </div>
  );
}
