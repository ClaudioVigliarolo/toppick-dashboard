import React from "react";
import { getCategories, getTopics, getToTranslateTopics } from "../../api/api";
import {
  onaAchiveToTranslateTopic,
  ondeleteToTranslateTopic,
  onQuestionsAdd,
  onTopicCreate,
  onUnarchiveToTranslateTopic,
} from "src/utils/topics";
import { getHash, getQuestionHash } from "src/utils/utils";
import { getGoogleTranslatedQuestions, getQuestionsByTopic } from "src/api/api";
import {
  Category,
  CategoryTopic,
  Lang,
  PageProps,
  Question,
  TopicRelated,
  Topic,
  TopicLevel,
  TopicType,
  ToTranslateTopic,
} from "../../interfaces/Interfaces";
import { useAppStyles } from "src/styles/common";
import TranslatePageBody from "./sections/TranslatePageBody";
import TranslatePageHeader from "./sections/TranslatePageHeader";
import TopicDialog from "src/components/dialogs/TopicDialog";

const NEW_TARGET_QUESTION: Question = {
  id: -1,
  title: "",
  new: true,
  examples: [],
};

const NEW_SOURCE_QUESTION: Question = {
  id: -1,
  title: "Custom Question",
  new: true,
  examples: [],
};

const NO_TOTRANSLATE_TOPIC: ToTranslateTopic = {
  source_lang: Lang.EN,
  dest_lang: Lang.EN,
  id: -1,
  ref_id: -1,
  source_categories: [],
  source_related: [],
  source_title: "Pick A topic To Translate",
  topic_id: -1,
  level: 0,
  source: "",
  description: "",
  image: "",
  type: 0,
};

const NO_TOPIC: Topic = {
  categories: [],
  id: -1,
  related: [],
  source: "",
  type: 0,
  level: 0,
  timestamp: new Date(),
  title: "",
  ref_id: -1,
  description: "",
  image: "",
  active: false,
  approved: false,
};

export default function TranslatePage({
  token,
  currentLanguage,
  setLoading,
  onError,
  loading,
  onSuccess,
}: PageProps) {
  const [selectedTopicToTranslate, setselectedTopicToTranslate] =
    React.useState<ToTranslateTopic>(NO_TOTRANSLATE_TOPIC);
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [targetQuestions, setTargetQuestions] = React.useState<Question[]>([]);
  const [sourceQuestions, setSourceQuestions] = React.useState<Question[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isReview, setReview] = React.useState<boolean>(false);
  const [archived, setArchive] = React.useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = React.useState<Topic>(NO_TOPIC);
  const [topicAddDialog, setTopicCreateDialog] = React.useState<boolean>(false);
  const [toTranslateTopics, setToTranslateTopics] = React.useState<
    ToTranslateTopic[]
  >([]);
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
      if (retrievedTopics != null) {
        setTopics(retrievedTopics);
      }

      //get to translate
      const toTranslateTopics = await getToTranslateTopics(
        currentLanguage,
        false,
        token
      );
      if (toTranslateTopics != null) {
        setToTranslateTopics(
          toTranslateTopics.sort((a, b) =>
            a.source_title.localeCompare(b.source_title)
          )
        );
      }

      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage, token]);

  React.useEffect(() => {
    (async () => {
      //get to translate
      const toTranslateTopics = await getToTranslateTopics(
        currentLanguage,
        archived,
        token
      );
      if (toTranslateTopics != null) {
        setToTranslateTopics(
          toTranslateTopics.sort((a, b) =>
            a.source_title.localeCompare(b.source_title)
          )
        );
      }
      setLoading(false);
    })();
  }, [archived, token, currentLanguage]);

  const onSelectTranslate = (index: number) => {
    console.log("CURRR", toTranslateTopics[index]);
    setselectedTopicToTranslate(toTranslateTopics[index]);
    setTopicCreateDialog(true);
  };

  const onSetOriginalQuestions = async (topicID: number, token: string) => {
    const retrievedQuestions = await getQuestionsByTopic(topicID);
    if (retrievedQuestions) {
      setSourceQuestions(retrievedQuestions);
    }
  };
  const onGoogleTranslateQuestions = async (
    topicID: number,
    from: Lang,
    to: Lang,
    token: string
  ) => {
    const translatedQuestions = await getGoogleTranslatedQuestions(
      topicID,
      from,
      to,
      token
    );

    console.log("my translated", translatedQuestions);
    if (translatedQuestions) {
      setTargetQuestions(translatedQuestions);
    }
  };

  const onDelete = (i: number) => {
    ondeleteToTranslateTopic(
      toTranslateTopics[i].id,
      toTranslateTopics,
      setToTranslateTopics,
      currentLanguage,
      token
    );
  };

  const onArchive = (i: number) => {
    onaAchiveToTranslateTopic(
      toTranslateTopics[i].id,
      toTranslateTopics,
      setToTranslateTopics,
      currentLanguage,
      token
    );
  };

  const onUnarchive = (i: number) => {
    onUnarchiveToTranslateTopic(
      toTranslateTopics[i].id,
      toTranslateTopics,
      setToTranslateTopics,
      currentLanguage,
      token
    );
  };

  const onTranslatedTopicCreate = async (newTopic: Topic) => {
    await onTopicCreate(
      {
        ...newTopic,
        id: getHash(newTopic.title, currentLanguage),
        timestamp: new Date(),
        ref_id: selectedTopicToTranslate.ref_id,
      },
      topics,
      currentLanguage,
      token,
      setTopics,
      setLoading,
      async () => {
        setLoading(true);
        setSelectedTopic(newTopic);
        ondeleteToTranslateTopic(
          selectedTopicToTranslate.id,
          toTranslateTopics,
          setToTranslateTopics,
          currentLanguage,
          token
        );
        await onSetOriginalQuestions(selectedTopicToTranslate.topic_id, token);
        await onGoogleTranslateQuestions(
          selectedTopicToTranslate.topic_id,
          selectedTopicToTranslate.source_lang,
          selectedTopicToTranslate.dest_lang,
          token
        );
        setLoading(false);
        onSuccess();
        setselectedTopicToTranslate(NO_TOTRANSLATE_TOPIC);
        setTopicCreateDialog(false);
      },
      onError
    );
  };

  const onQuestionChange = (index: number, question: Question) => {
    const newQuestions = [...targetQuestions];
    question.id = getQuestionHash(question.title, selectedTopic.title, index);
    newQuestions[index] = question;
    setTargetQuestions(newQuestions);
  };

  const onReset = () => {
    setselectedTopicToTranslate(NO_TOTRANSLATE_TOPIC);
    setSelectedTopic(NO_TOPIC);
    setTargetQuestions([]);
    setSourceQuestions([]);
    window.scrollTo(0, 0);
    setTopicCreateDialog(false);
    setReview(false);
  };

  const onQuestionCreate = (index: number) => {
    const newTargetQuestions = [...targetQuestions];
    const newSourceQuestions = [...sourceQuestions];
    const newTargetQuestion = { ...NEW_TARGET_QUESTION, topic: selectedTopic };
    const newSourceQuestion = { ...NEW_SOURCE_QUESTION, topic: selectedTopic };
    newTargetQuestions.splice(index + 1, 0, newTargetQuestion);
    newSourceQuestions.splice(index + 1, 0, newSourceQuestion);
    setTargetQuestions(newTargetQuestions);
    setSourceQuestions(newSourceQuestions);
  };
  const onQuestionDelete = (index: number) => {
    const newTargetQuestion = [...targetQuestions];
    const newSourceQuestions = [...sourceQuestions];
    newTargetQuestion.splice(index, 1);
    setTargetQuestions(newTargetQuestion);
    newSourceQuestions.splice(index, 1);
    setSourceQuestions(newSourceQuestions);
  };

  const onSubmitReview = () => {
    const newSourceQuestions: Question[] = [];
    const newTargetQuestions: Question[] = [];
    for (let i = 0; i < targetQuestions.length; i++) {
      if (targetQuestions[i].title) {
        newSourceQuestions.push(sourceQuestions[i]);
        newTargetQuestions.push(targetQuestions[i]);
      }
    }
    setSourceQuestions(newSourceQuestions);
    setTargetQuestions(newTargetQuestions);
    setReview(true);
    window.scrollTo(0, 0);
  };

  const onSubmit = async () => {
    await onQuestionsAdd(
      targetQuestions,
      selectedTopic.id,
      currentLanguage,
      token,
      setLoading,
      () => {
        onReset();
        onSuccess();
      },
      onError
    );
  };

  return (
    <div className={classes.container}>
      <TranslatePageHeader
        onDelete={onDelete}
        archived={archived}
        defaultTopic={NO_TOTRANSLATE_TOPIC}
        classes={classes}
        isReview={isReview}
        onArchive={onArchive}
        onSelect={onSelectTranslate}
        selectedTopic={selectedTopicToTranslate}
        setArchive={setArchive}
        toTranslateTopics={toTranslateTopics}
        onUnarchive={onUnarchive}
      />

      <TranslatePageBody
        classes={classes}
        setReview={setReview}
        isReview={isReview}
        loading={loading}
        onSubmitReview={onSubmitReview}
        onSubmit={onSubmit}
        onQuestionDelete={onQuestionDelete}
        onQuestionCreate={onQuestionCreate}
        onQuestionChange={onQuestionChange}
        sourceQuestions={sourceQuestions}
        targetQuestions={targetQuestions}
      />

      <TopicDialog
        open={topicAddDialog}
        loading={loading}
        categories={categories}
        related={topics}
        headerText="Translate Topic"
        titlePlaceholder={selectedTopicToTranslate.source_title}
        descriptionPlaceholder={selectedTopicToTranslate.description}
        onConfirm={onTranslatedTopicCreate}
        onRefuse={onReset}
        topic={selectedTopic}
      />
    </div>
  );
}
