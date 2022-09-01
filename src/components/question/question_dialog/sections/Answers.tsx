import React from "react";
import { makeStyles, TextField, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Answer, AnswerCreated } from "@toppick/common/build/interfaces";
import {
  createAnswer,
  deleteAnswer,
  getAnswers,
  updateAnswer,
} from "@toppick/common/build/api";
import { AuthContext } from "@/context/AuthContext";
import AnswerDialog from "@/components/question/answer_dialog";
import { AxiosError } from "axios";
import { getErrorMessage } from "@toppick/common/build/utils";
interface AnswersProps {
  questionId: number;
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    width: "90%",
    marginRight: 20,
  },

  answerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  deleteIcon: {
    cursor: "pointer",
    color: "orangered",
  },

  editIcon: {
    cursor: "pointer",
    color: "orange",
  },

  addButtonContainer: {
    alignSelf: "center",
    width: "100%",
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
  },
  addButton: {
    width: 200,
  },
}));

export default function Answers({ questionId }: AnswersProps) {
  const [answers, setAnswers] = React.useState<Answer[]>([]);
  const [isShowCreateDialog, setIsShowCreateDialog] =
    React.useState<boolean>(false);
  const [isShowEditDialog, setIsShowEditDialog] =
    React.useState<boolean>(false);
  const [currentAnswer, setCurrentAnswer] = React.useState<Answer | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const { authToken, userId } = React.useContext(AuthContext);
  const classes = useStyles();

  React.useEffect(() => {
    (async () => {
      try {
        setAnswers([]);
        if (questionId) {
          setAnswers(await getAnswers(authToken, { question_id: questionId }));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [questionId]);

  const onCreateAnswer = async (createdAnswer: AnswerCreated) => {
    setIsLoading(true);
    setError("");
    try {
      const answer = await createAnswer(authToken, createdAnswer);

      setAnswers([...answers, answer]);
      setCurrentAnswer(null);
      setIsShowCreateDialog(false);
    } catch (error) {
      setError(getErrorMessage(error));
    }
    setIsLoading(false);
  };
  const onUpdateAnswer = async (updatedAnswer: AnswerCreated) => {
    setIsLoading(true);
    setError("");
    try {
      const answer = await updateAnswer(
        authToken,
        currentAnswer!.id,
        updatedAnswer
      );
      const index = answers.findIndex((res) => res.id === currentAnswer!.id);
      answers[index] = answer;
      setAnswers([...answers]);
      setCurrentAnswer(null);
      setIsShowEditDialog(false);
    } catch (error) {
      setError(getErrorMessage(error));
    }
    setIsLoading(false);
  };

  const onDeleteAnswer = async () => {
    setError("");
    setIsLoading(true);
    try {
      await deleteAnswer(authToken, currentAnswer!.id);
      const newAnswers = answers.filter((k) => k.id !== currentAnswer!.id);
      setAnswers(newAnswers);
      setIsShowEditDialog(false);
      setCurrentAnswer(null);
    } catch (error) {
      const err = error as AxiosError;
      setError(err.response?.data);
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.container}>
      {answers.map((answer, i) => (
        <div className={classes.answerContainer} key={i}>
          <TextField
            key={i}
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label={"Answer " + (i + 1)}
            id="standard-helperText"
            value={answer.title}
            className={classes.textField}
            disabled={true}
          />
          <EditIcon
            className={classes.editIcon}
            onClick={() => {
              setCurrentAnswer(answer);
              setIsShowEditDialog(true);
            }}
          />
        </div>
      ))}
      <div className={classes.addButtonContainer}>
        <Button
          color="primary"
          size="small"
          onClick={() => {
            setIsShowCreateDialog(true);
          }}
          className={classes.addButton}
        >
          Add New Answer
        </Button>
      </div>
      <AnswerDialog
        onClose={() => setIsShowCreateDialog(false)}
        open={isShowCreateDialog}
        loading={isLoading}
        error={error}
        headerText="Create Answer"
        onSubmit={onCreateAnswer}
        answer={null}
        questionId={questionId}
      />
      <AnswerDialog
        onClose={() => setIsShowEditDialog(false)}
        open={isShowEditDialog}
        loading={isLoading}
        error={error}
        headerText="Edit Answer"
        onSubmit={onUpdateAnswer}
        onDelete={onDeleteAnswer}
        answer={currentAnswer}
        questionId={questionId}
      />
    </div>
  );
}
