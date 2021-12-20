import React from "react";
import { getCategories, getQuestionsByTopic, getTopics } from "../../api/api";

const NEW_QUESTION: Question = {
  id: -1,
  title: "",
  new: true,
  examples: [],
};
import {
  Category,
  Example,
  PageProps,
  Question,
  Topic,
} from "../../interfaces/Interfaces";
import { useAppStyles } from "../../styles/common";
import TopicDialog from "src/components/dialogs/TopicDialog";
import CreatePageHeader from "./sections/CreatePageHeader";
import CreatePageBody from "./sections/CreatePageBody";

import { onQuestionsAdd, onTopicCreate } from "src/utils/topics";
import {
  generateExamples,
  getHash,
  parseExamples,
  removeExamples,
} from "src/utils/utils";

const NO_TOPIC: Topic = {
  categories: [],
  id: -1,
  related: [],
  type: 0,
  level: 0,
  source: "",
  timestamp: new Date(),
  title: "Select A Topic",
  ref_id: -1,
  description: "",
  image: "",
  active: false,
  approved: false,
};

export default function CreatePage({
  token,
  currentLanguage,
  setLoading,
  loading,
  onError,
  onSuccess,
}: PageProps) {
  const [selectedTopic, setSelectedTopic] = React.useState<Topic>(NO_TOPIC);
  const [topicAddDialog, setTopicCreateDialog] = React.useState<boolean>(false);
  const [currentQuestions, setCurrentQuestions] = React.useState<Question[]>(
    []
  );
  const [isUpdate, setIsUpdate] = React.useState<boolean>(false);
  const [isReview, setReview] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [topics, setTopics] = React.useState<Topic[]>([]);

  const classes = useAppStyles();

  React.useEffect(() => {
    (async () => {
      onReset();
      setLoading(true);
      const retrievedCategories = await getCategories(currentLanguage);
      if (retrievedCategories != null) {
        setCategories(retrievedCategories);
      }

      const retrievedTopics = await getTopics(currentLanguage, token);
      //sort by timestamp
      if (retrievedTopics != null) {
        setTopics(
          retrievedTopics.sort((a, b) => a.title.localeCompare(b.title))
        );
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
      const retrievedQuestions = await getQuestionsByTopic(topics[index].id);
      console.log("MY RETREIVD!!!!", retrievedQuestions);
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

  const onQuestionChange = (index: number, question: Question) => {
    {
      const newQuestions = [...currentQuestions];
      if (question.new) {
        question.id = getHash(
          question.title + "*" + question.title + "*" + index
        );
      }
      newQuestions[index] = question;
      setCurrentQuestions(newQuestions);
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

  const onSubmit = async (questions: Question[]) => {
    console.log("MY QQQ", questions);
    await onQuestionsAdd(
      questions,
      selectedTopic.id,
      currentLanguage,
      token,
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
      token,
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
        classes={classes}
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
