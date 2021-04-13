import React from "react";
import {
  CustomTable,
  StyledEditCell,
  StyledTableCell,
  StyledTableRow,
  useStyles,
} from "./TableStyles";
import { Question, Topic } from "../../interfaces/Interfaces";
import { getQuestions } from "../../api/api";
import { getFormattedDate, getHash } from "../../utils/utils";
import DeleteDialog from "../dialogs/ConfirmDialog";
import QuestionAddDialog from "../dialogs/QuestionDialog";
import QuestionEditDialog from "../dialogs/QuestionDialog";
import CustomButton from "../buttons/CustomButton";
import SearchBar from "../input/searchBar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TransactionAlert from "../alerts/TransactionAlert";
import {
  getTopicIdFromTitle,
  onQuestionAdd,
  onQuestionDelete,
  onQuestionUpdate,
} from "src/utils/topics";

interface TableQuestionsProps {
  topics: Topic[];
  token: string;
  currentLanguage: string;
  setLoading: (newVal: boolean) => void;
}

const DEFAULT_QUESTION: Question = {
  id: -1,
  timestamp: new Date(),
  title: "",
  topic_id: -1,
  topic_title: "",
};

const SCROLL_THRESHOLD = 200;
const DIVIDING_FACTOR = 10;

export default function TableQuestions(props: TableQuestionsProps) {
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = React.useState<Question>(
    DEFAULT_QUESTION
  );

  const [searchText, setSearchText] = React.useState<string>("");
  const [questionAddDialog, setQuestionAddDialog] = React.useState<boolean>(
    false
  );
  const [scrollTop, setScrollTop] = React.useState(0);
  const [currentScroll, setCurrentScroll] = React.useState(0);
  const [lastScrollUpdate, setLastScrollUpdate] = React.useState(0);
  const classes = useStyles();

  React.useEffect(() => {
    (async () => {
      let retrievedQuestions = await getQuestions(
        props.currentLanguage,
        props.token,
        0,
        SCROLL_THRESHOLD
      );
      if (retrievedQuestions != null) {
        setLastScrollUpdate(0);
        setQuestions(questions.splice(0, questions.length));
        setQuestions(retrievedQuestions);
      }
    })();
  }, [props.currentLanguage]);

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
          props.currentLanguage,
          props.token,
          lastScrollUpdate / DIVIDING_FACTOR,
          SCROLL_THRESHOLD / DIVIDING_FACTOR
        );
        if (retrievedQuestions != null) {
          setQuestions([...questions, ...retrievedQuestions]);
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop, props.currentLanguage]);

  const onEdit = (q: Question) => {
    setCurrentQuestion(q);
    setEditDialog(true);
  };

  const onDelete = (q: Question) => {
    setCurrentQuestion(q);
    setDeleteDialog(true);
  };

  const renderRows = (questions: Question[]) => {
    return questions.map((question: Question, index: number) => {
      if (
        question.topic_title.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return (
          <StyledTableRow key={index}>
            <StyledTableCell>{question.topic_title}</StyledTableCell>

            <StyledTableCell>
              {getFormattedDate(question.timestamp)}
            </StyledTableCell>

            <StyledEditCell>
              {question.title}
              <div className={classes.iconsContainer}>
                <EditIcon
                  className={classes.editIcon}
                  onClick={() => {
                    onEdit(question);
                  }}
                />
                <DeleteIcon
                  onClick={() => {
                    onDelete(question);
                  }}
                  className={classes.deleteIcon}
                />
              </div>
            </StyledEditCell>
          </StyledTableRow>
        );
      }
    });
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

      <CustomTable
        columns={["15%", "15%", "70%"]}
        columnNames={["topic", "last update", "question"]}
        body={renderRows(questions)}
      />
      <DeleteDialog
        open={deleteDialog}
        onConfirm={() => {
          onQuestionDelete(
            currentQuestion.id,
            questions,
            props.currentLanguage,
            props.token,
            setQuestions,
            props.setLoading,
            setSuccess,
            setError
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
        topics={props.topics.map((t) => t.title)}
        onConfirm={(newTitle: string, topicTitle: string) => {
          onQuestionUpdate(
            {
              id: currentQuestion.id,
              title: newTitle,
              topic_id: getTopicIdFromTitle(props.topics, topicTitle),
              timestamp: new Date(),
              topic_title: topicTitle,
            },
            questions,
            props.currentLanguage,
            props.token,
            setQuestions,
            props.setLoading,
            setSuccess,
            setError
          );
          setCurrentQuestion(DEFAULT_QUESTION);
          setEditDialog(false);
        }}
        headerText="Editing Question"
        question={currentQuestion.title}
        topic={currentQuestion.topic_title}
        onRefuse={() => {
          setCurrentQuestion(DEFAULT_QUESTION);
          setEditDialog(false);
        }}
      />

      <QuestionAddDialog
        topics={props.topics.map((t) => t.title)}
        topic=""
        headerText="Add a new Question"
        question=""
        open={questionAddDialog}
        onConfirm={(newTitle: string, topicTitle: string) => {
          onQuestionAdd(
            {
              id: getHash(newTitle + "*" + topicTitle),
              title: newTitle,
              topic_id: getTopicIdFromTitle(props.topics, topicTitle),
              timestamp: new Date(),
              topic_title: topicTitle,
            },
            questions,
            props.currentLanguage,
            props.token,
            setQuestions,
            props.setLoading,
            setSuccess,
            setError
          );
          setCurrentQuestion(DEFAULT_QUESTION);
          setQuestionAddDialog(false);
        }}
        onRefuse={() => {
          setQuestionAddDialog(false);
          setCurrentQuestion(DEFAULT_QUESTION);
        }}
      />
      <TransactionAlert success={success} error={error} />
    </>
  );
}
