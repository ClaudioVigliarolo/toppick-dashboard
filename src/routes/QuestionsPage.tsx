import React from "react";
import { getQuestions, getQuestionTopics } from "../api/api";
import {
  PageProps,
  Question,
  QuestionTopic,
  Topic,
} from "../interfaces/Interfaces";
import CustomButton from "../components/buttons/CustomButton";
import SearchBar from "../components/input/SearchBar";
import DeleteDialog from "../components/dialogs/ConfirmDialog";
import QuestionAddDialog from "../components/dialogs/QuestionDialog";
import QuestionEditDialog from "../components/dialogs/QuestionDialog";
import { useAppStyles } from "../styles/common";
import {
  onQuestionAdd,
  onQuestionDelete,
  onQuestionUpdate,
} from "src/utils/topics";
import { getHash } from "src/utils/utils";
import TableQuestions from "../components/tables/TableQuestions";

const NO_QUESTION: Question = {
  id: -1,
  timestamp: new Date(),
  title: "",
  topic: {
    id: -1,
    title: "",
  },
};

const NO_TOPIC: Topic = {
  categories: [],
  id: -1,
  related: [],
  source: "",
  timestamp: new Date(),
  title: "Select A Topic",
  ref_id: -1,
};

const SCROLL_THRESHOLD = 200;
const DIVIDING_FACTOR = 10;
const ITEMS_PER_SCROLL = 50;

export default function ViewPage({
  token,
  currentLanguage,
  loading,
  setLoading,
  onError,
  onSuccess,
}: PageProps) {
  const [topics, setTopics] = React.useState<QuestionTopic[]>([]);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] =
    React.useState<Question>(NO_QUESTION);
  const [searchText, setSearchText] = React.useState<string>("");
  const [questionAddDialog, setQuestionAddDialog] =
    React.useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [scrollTop, setScrollTop] = React.useState(0);
  const [currentScroll, setCurrentScroll] = React.useState(0);
  const [lastScrollUpdate, setLastScrollUpdate] = React.useState(0);
  const classes = useAppStyles();

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const retrievedQuestionTopics = await getQuestionTopics(
        currentLanguage,
        token
      );
      if (retrievedQuestionTopics != null) {
        setTopics(retrievedQuestionTopics);
      }
      setLoading(false);
    })();
  }, [currentLanguage]);

  React.useEffect(() => {
    (async () => {
      let retrievedQuestions = await getQuestions(
        currentLanguage,
        token,
        0,
        SCROLL_THRESHOLD
      );
      if (retrievedQuestions != null) {
        setLastScrollUpdate(0);
        setQuestions(questions.splice(0, questions.length));
        setQuestions(retrievedQuestions);
      }
    })();
  }, [currentLanguage]);

  React.useEffect(() => {
    async function onScroll() {
      let currentPosition = window.pageYOffset;
      setCurrentScroll(Math.max(currentPosition, currentScroll));

      if (currentPosition > scrollTop) {
        setScrollTop(currentPosition <= 0 ? 0 : currentPosition);
      }

      if (currentPosition > lastScrollUpdate + SCROLL_THRESHOLD) {
        setLastScrollUpdate(lastScrollUpdate + SCROLL_THRESHOLD);
        let retrievedQuestions = await getQuestions(
          currentLanguage,
          token,
          lastScrollUpdate / DIVIDING_FACTOR,
          lastScrollUpdate / DIVIDING_FACTOR + ITEMS_PER_SCROLL
        );
        if (retrievedQuestions != null) {
          setQuestions([...questions, ...retrievedQuestions]);
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop, currentLanguage]);

  const onEdit = (q: Question) => {
    setCurrentQuestion(q);
    setEditDialog(true);
  };

  const onDelete = (q: Question) => {
    setCurrentQuestion(q);
    setDeleteDialog(true);
  };

  return (
    <>
      <div className={classes.headerSection}>
        <SearchBar
          placeholder="Filter by topic"
          setSearchText={(text) => setSearchText(text)}
          searchText={searchText}
        />
        <div>
          <CustomButton
            onClick={() => setQuestionAddDialog(true)}
            title="INSERT NEW QUESTION"
          />
        </div>
      </div>

      <TableQuestions
        onDelete={onDelete}
        onEdit={onEdit}
        questions={questions}
        searchText={searchText}
      />
      <DeleteDialog
        open={deleteDialog}
        onConfirm={() => {
          onQuestionDelete(
            currentQuestion.id,
            questions,
            currentLanguage,
            token,
            setQuestions,
            setLoading,
            onSuccess,
            onError
          );
          setDeleteDialog(false);
        }}
        title="Proceed to Delete the question?"
        description="The question record will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setDeleteDialog(false);
        }}
      />

      <QuestionEditDialog
        open={editDialog}
        loading={loading}
        topics={topics}
        onConfirm={async (newTitle: string, topic: QuestionTopic) => {
          await onQuestionUpdate(
            {
              id: currentQuestion.id,
              title: newTitle,
              timestamp: new Date(),
              topic: {
                id: topic.id,
                title: topic.title,
              },
            },
            questions,
            currentLanguage,
            token,
            setQuestions,
            setLoading,
            onSuccess,
            onError
          );
          setCurrentQuestion(NO_QUESTION);
          setEditDialog(false);
        }}
        headerText="Editing Question"
        question={currentQuestion.title}
        topic={currentQuestion.topic}
        onRefuse={() => {
          setCurrentQuestion(NO_QUESTION);
          setEditDialog(false);
        }}
      />

      <QuestionAddDialog
        topics={topics}
        topic={NO_TOPIC}
        loading={loading}
        headerText="Add a new Question"
        question=""
        open={questionAddDialog}
        onConfirm={async (newTitle: string, topic: QuestionTopic) => {
          await onQuestionAdd(
            {
              id: getHash(newTitle + "*" + topic.title),
              title: newTitle,
              timestamp: new Date(),
              topic: {
                id: topic.id,
                title: topic.title,
              },
            },
            questions,
            currentLanguage,
            token,
            setQuestions,
            setLoading,
            onSuccess,
            onError
          );
          setCurrentQuestion(NO_QUESTION);
          setQuestionAddDialog(false);
        }}
        onRefuse={() => {
          setQuestionAddDialog(false);
          setCurrentQuestion(NO_QUESTION);
        }}
      />
    </>
  );
}
