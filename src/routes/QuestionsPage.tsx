import React from "react";
import { getCategories, getQuestions, getTopics } from "../api/api";
import { Category, PageProps, Question, Topic } from "../interfaces/Interfaces";
import TableCategories from "../components/tables/TableCategories";
import CustomButton from "src/components/buttons/CustomButton";
import SearchBar from "src/components/input/searchBar";
import DeleteDialog from "../components/dialogs/ConfirmDialog";
import QuestionAddDialog from "../components/dialogs/QuestionDialog";
import QuestionEditDialog from "../components/dialogs/QuestionDialog";
import { useAppStyles } from "../styles/common";
import {
  getTopicIdFromTitle,
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
  topic_id: -1,
  topic_title: "",
};

const SCROLL_THRESHOLD = 200;
const DIVIDING_FACTOR = 10;
const ITEMS_PER_SCROLL = 50;

export default function ViewPage({
  token,
  currentLanguage,
  setLoading,
  onError,
  onSuccess,
}: PageProps) {
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = React.useState<Question>(
    NO_QUESTION
  );
  const [searchText, setSearchText] = React.useState<string>("");
  const [questionAddDialog, setQuestionAddDialog] = React.useState<boolean>(
    false
  );
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [scrollTop, setScrollTop] = React.useState(0);
  const [currentScroll, setCurrentScroll] = React.useState(0);
  const [lastScrollUpdate, setLastScrollUpdate] = React.useState(0);
  const classes = useAppStyles();

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const retrievedTopics = await getTopics(currentLanguage, token);
      if (retrievedTopics != null) {
        setTopics(retrievedTopics);
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
        <CustomButton
          onClick={() => setQuestionAddDialog(true)}
          title="INSERT NEW QUESTION"
        />
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
        topics={topics.map((t) => t.title)}
        onConfirm={(newTitle: string, topicTitle: string) => {
          onQuestionUpdate(
            {
              id: currentQuestion.id,
              title: newTitle,
              topic_id: getTopicIdFromTitle(topics, topicTitle),
              timestamp: new Date(),
              topic_title: topicTitle,
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
        topic={currentQuestion.topic_title}
        onRefuse={() => {
          setCurrentQuestion(NO_QUESTION);
          setEditDialog(false);
        }}
      />

      <QuestionAddDialog
        topics={topics.map((t) => t.title)}
        topic=""
        headerText="Add a new Question"
        question=""
        open={questionAddDialog}
        onConfirm={(newTitle: string, topicTitle: string) => {
          onQuestionAdd(
            {
              id: getHash(newTitle + "*" + topicTitle),
              title: newTitle,
              topic_id: getTopicIdFromTitle(topics, topicTitle),
              timestamp: new Date(),
              topic_title: topicTitle,
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
