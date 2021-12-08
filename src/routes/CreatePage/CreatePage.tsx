import React from "react";
import { getCategories, getQuestionsByTopic, getTopics } from "../../api/api";

const NEW_QUESTION: Question = {
  id: -1,
  timestamp: new Date(),
  title: "",
  new: true,
  topic_id: -1,
};

import {
  Category,
  CategoryTopic,
  PageProps,
  Question,
  Related,
  Topic,
  TopicLevel,
  TopicType,
} from "../../interfaces/Interfaces";
import TopicAddDialog from "../../components/dialogs/TopicDialog";
import { useAppStyles } from "../../styles/common";
import CreatePageHeader from "./CreatePageHeader";
import CreatePageBody from "./CreatePageBody";

import { onQuestionsAdd, onTopicAdd } from "src/utils/topics";
import { getHash } from "src/utils/utils";

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
  const [topicAddDialog, setTopicAddDialog] = React.useState<boolean>(false);
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

      const retrievedTopics = await getTopics(currentLanguage);
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
      if (retrievedQuestions !== null) {
        setCurrentQuestions(retrievedQuestions);
        if (retrievedQuestions.length > 0) {
          setIsUpdate(true);
        } else {
          setIsUpdate(false);
        }
      }
      setLoading(false);
    }
  };

  const onSubmitReview = () => {
    const newQuestions = [...currentQuestions].filter((q) => q.title);
    setCurrentQuestions(newQuestions);
    window.scrollTo(0, 0);
    setReview(true);
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

  const onQuestionAdd = (index: number) => {
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
    await onQuestionsAdd(
      questions,
      selectedTopic,
      currentLanguage,
      token,
      setLoading,
      onSubmitCallback,
      onError
    );
  };

  const onConfirmTopicAdd = async (
    newTitle: string,
    newSource: string,
    newType: TopicType,
    newLevel: TopicLevel,
    newDescription: string,
    newImage: string,
    newActive: boolean,
    selectedCategories: CategoryTopic[],
    selectedRelated: Related[]
  ) => {
    const newID = getHash(newTitle, currentLanguage);
    const newTopic: Topic = {
      id: newID,
      type: newType,
      level: newLevel,
      title: newTitle,
      related: selectedRelated,
      description: newDescription,
      image: newImage,
      source: newSource,
      timestamp: new Date(),
      categories: selectedCategories,
      ref_id: newID,
      active: newActive,
    };
    await onTopicAdd(
      newTopic,
      topics,
      currentLanguage,
      token,
      setTopics,
      setLoading,
      async () => {
        setSelectedTopic(newTopic);
        setTopicAddDialog(false);
        setIsUpdate(false);
        onSuccess();
      },
      onError
    );
  };
  const onRefuseTopicAdd = async () => {
    setSelectedTopic(NO_TOPIC);
    setTopicAddDialog(false);
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
        onTopicAdd={() => setTopicAddDialog(true)}
        selectedTopic={selectedTopic}
      />

      <CreatePageBody
        classes={classes}
        isReview={isReview}
        setReview={setReview}
        onQuestionChange={onQuestionChange}
        onQuestionAdd={onQuestionAdd}
        onSubmitReview={onSubmitReview}
        setQuestions={setCurrentQuestions}
        onQuestionDelete={onQuestionDelete}
        questions={currentQuestions}
        defaultTopic={NO_TOPIC}
        loading={loading}
        onSubmit={onSubmit}
        resetTopic={() => setSelectedTopic(NO_TOPIC)}
        selectedTopic={selectedTopic}
      />

      <TopicAddDialog
        open={topicAddDialog}
        preselectedCategories={[]}
        active={false}
        preselectedRelated={[]}
        categories={categories}
        loading={loading}
        related={topics}
        headerText="Add New Topic"
        topic=""
        onConfirm={onConfirmTopicAdd}
        onRefuse={onRefuseTopicAdd}
      />
    </div>
  );
}
