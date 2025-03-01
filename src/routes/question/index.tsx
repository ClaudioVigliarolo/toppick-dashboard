import React from "react";
import { useAppStyles } from "@/styles/common";
import Select from "@/components/ui/select/Select";
import { StatusContext } from "@/context/StatusContext";
import Button from "@/components/ui/button/Button";
import {
  QuestionCreated,
  QuestionFeatured,
  TopicFeatured,
} from "@toppick/common/build/interfaces";
import {
  createQuestion,
  deleteQuestion,
  getQuestions,
  getTopics,
  updateQuestion,
} from "@toppick/common/build/api";
import QuestionDialog from "@/components/question/dialog";
import { getErrorMessage } from "@toppick/common/build/utils";
import axios, { AxiosResponse } from "axios";
import { LibraryParams } from "@toppick/common/build/config/config";
import NoQuestionAdded from "@/components/question/NoQuestionAdded";
import DragAndDrop from "@/components/ui/DragAndDrop";
import { getAuthToken } from "@/utils/auth";

const DEFAULT_TOPIC: TopicFeatured = {
  active: false,
  id: -1,
  slug: "",
  timestamp: new Date(),
  title: "select a topic",
  description: "",
  image: "",
};

export default function QuestionPage() {
  const [currentTopic, setCurrentTopic] =
    React.useState<TopicFeatured>(DEFAULT_TOPIC);
  const [currentQuestions, setCurrentQuestions] = React.useState<
    QuestionFeatured[]
  >([]);
  const [currentQuestion, setCurrentQuestion] =
    React.useState<QuestionFeatured | null>(null);
  const [isShowQuestionUpdateDialog, setIsShowQuestionUpdateDialog] =
    React.useState<boolean>(false);
  const [isShowQuestionCreateDialog, setIsShowQuestionCreateDialog] =
    React.useState<boolean>(false);
  const [isQuestionsLoaded, setIsQuestionsLoaded] =
    React.useState<boolean>(false);

  const [topics, setTopics] = React.useState<TopicFeatured[]>([]);
  const { setIsAppLoading, setAppError } = React.useContext(StatusContext);
  const [error, setError] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const classes = useAppStyles();

  React.useEffect(() => {
    (async () => {
      onReset();
      setIsAppLoading(true);
      try {
        const allTopics = await getTopics({
          sort_by_title: true,
          include_inactive: true,
        });
        setTopics(allTopics);
      } catch (error) {
        setAppError();
      }
      setIsAppLoading(false);
    })();
  }, []);

  const renderHeaderText = () => {
    if (currentTopic !== DEFAULT_TOPIC) {
      return "Update topic questions";
    } else if (currentTopic === DEFAULT_TOPIC) {
      return "Let's start by picking a Topic ";
    }
  };

  const handleTopicChange = async (e: React.ChangeEvent<any>) => {
    const selectedTopic = topics.find((t) => t.title === e.target.value);
    if (!selectedTopic) {
      return onReset();
    }
    setCurrentTopic(selectedTopic);

    if (selectedTopic === DEFAULT_TOPIC) {
      return;
    }
    setIsAppLoading(true);
    try {
      setCurrentQuestions(
        await getQuestions(await getAuthToken(), {
          topic_id: selectedTopic.id,
          include_inactive: true,
        })
      );
      setIsQuestionsLoaded(true);
    } catch (error) {
      console.log(error);
      setAppError();
    }
    setIsAppLoading(false);
  };

  const onReset = async () => {
    window.scrollTo(0, 0);
    setCurrentTopic(DEFAULT_TOPIC);
    setCurrentQuestions([]);
    setIsQuestionsLoaded(false);
  };

  const onDeleteQuestion = async () => {
    setIsLoading(true);
    setError("");
    try {
      await deleteQuestion(await getAuthToken(), currentQuestion!.id);
      const questions = currentQuestions.filter(
        (k) => k.id !== currentQuestion!.id
      );
      setCurrentQuestions(questions);
      setCurrentQuestion(null);
      setIsShowQuestionUpdateDialog(false);
    } catch (error) {
      setError(getErrorMessage(error));
    }
    setIsLoading(false);
  };

  const onQuestionUpdate = async (updatedQuestion: QuestionCreated) => {
    setIsLoading(true);
    setError("");
    try {
      const question = await updateQuestion(
        await getAuthToken(),
        currentQuestion!.id,
        updatedQuestion
      );
      const questions = [...currentQuestions];
      const index = questions.findIndex((k) => k.id == question.id);
      questions[index] = question;
      setCurrentQuestions(questions);
      setIsShowQuestionUpdateDialog(false);
      setCurrentQuestion(null);
    } catch (error) {
      setError(getErrorMessage(error));
    }
    setIsLoading(false);
  };

  const sortQuestions = async (
    token: string,
    topic_id: number,
    questions: { id: number; index: number }[]
  ): Promise<AxiosResponse> => {
    return await axios.patch(
      `${LibraryParams.hostname}/api/content/questions/sort`,
      {
        questions,
        topic_id,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  };

  const onSortQuestions = async (
    questions: { title: string; id: number }[]
  ) => {
    setIsAppLoading(true);

    const sortedKeywords: { id: number; index: number }[] = questions.map(
      (k, i) => ({
        id: k.id,
        index: i,
      })
    );
    try {
      await sortQuestions(
        await getAuthToken(),
        currentTopic.id,
        sortedKeywords
      );
    } catch (error) {
      setAppError(error);
    }
    setIsAppLoading(false);
  };

  const onQuestionCreate = async (createdQuestion: QuestionCreated) => {
    setIsLoading(true);
    setError("");
    try {
      const question = await createQuestion(
        await getAuthToken(),
        createdQuestion
      );
      setCurrentQuestions([...currentQuestions, question]);
      setIsShowQuestionCreateDialog(false);
      setCurrentQuestion(null);
    } catch (error) {
      setError(getErrorMessage(error));
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.headerText}>{renderHeaderText()}</h1>
      <div
        className={classes.headerSection}
        style={{
          justifyContent:
            currentTopic !== DEFAULT_TOPIC ? "space-between" : "center",
        }}
      >
        <Select
          handleChange={handleTopicChange}
          value={currentTopic.title}
          values={topics.map((v) => v.title)}
          defaultValue={DEFAULT_TOPIC.title}
          containerStyles={{ width: 400 }}
        />
        {currentTopic !== DEFAULT_TOPIC && (
          <Button
            onClick={() => setIsShowQuestionCreateDialog(true)}
            title="Create Question"
          />
        )}
      </div>
      <div>
        <DragAndDrop
          items={currentQuestions}
          onDragEnd={onSortQuestions}
          itemStyles={{
            minHeight: 100,
            minWidth: 600,
          }}
          onEdit={(id) => {
            setCurrentQuestion(
              currentQuestions.find((question) => question.id === id)!
            );
            setIsShowQuestionUpdateDialog(true);
          }}
        />
      </div>
      <QuestionDialog
        open={isShowQuestionUpdateDialog}
        headerText="Edit Question"
        onClose={() => {
          setCurrentQuestion(null);
          setIsShowQuestionUpdateDialog(false);
        }}
        error={error}
        loading={isLoading}
        topicId={currentTopic.id!}
        questionId={currentQuestion ? currentQuestion.id : undefined}
        onSubmit={onQuestionUpdate}
        onDelete={onDeleteQuestion}
      />
      <QuestionDialog
        open={isShowQuestionCreateDialog}
        topicId={currentTopic.id!}
        headerText="Create Question"
        onClose={() => {
          setCurrentQuestion(null);
          setIsShowQuestionCreateDialog(false);
        }}
        error={error}
        loading={isLoading}
        questionId={currentQuestion ? currentQuestion.id : undefined}
        onSubmit={onQuestionCreate}
      />
      {isQuestionsLoaded && currentQuestions.length === 0 && (
        <NoQuestionAdded />
      )}
    </div>
  );
}
