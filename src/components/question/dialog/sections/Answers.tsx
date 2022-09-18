import React from "react";
import { Answer, AnswerCreated } from "@toppick/common/build/interfaces";
import {
  createAnswer,
  deleteAnswer,
  getAnswers,
  updateAnswer,
} from "@toppick/common/build/api";
import { AuthContext } from "@/context/AuthContext";
import AnswerDialog from "@/components/answer/dialog";
import { AxiosError } from "axios";
import { getErrorMessage } from "@toppick/common/build/utils";
import { useDialogStyles } from "@/components/ui/dialog/Dialog";
import DialogEditField from "@/components/ui/button/DialogEditField";
import DialogAddButton from "@/components/ui/button/DialogAddButton";
interface AnswersProps {
  questionId: number;
}

export default function Answers({ questionId }: AnswersProps) {
  const [answers, setAnswers] = React.useState<Answer[]>([]);
  const [isShowCreateDialog, setIsShowCreateDialog] =
    React.useState<boolean>(false);
  const [isShowEditDialog, setIsShowEditDialog] =
    React.useState<boolean>(false);
  const [currentAnswer, setCurrentAnswer] = React.useState<Answer | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const { authToken } = React.useContext(AuthContext);
  const classes = {
    ...useDialogStyles(),
  };

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
      setError(getErrorMessage(error));
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.tabContainer}>
      {answers.map((answer, i) => (
        <DialogEditField
          key={i}
          label={"Answer " + (i + 1)}
          text={answer.title}
          onEdit={() => {
            setCurrentAnswer(answer);
            setIsShowEditDialog(true);
          }}
        />
      ))}
      <DialogAddButton
        onClick={() => {
          setIsShowCreateDialog(true);
        }}
        title="Add New Answer"
      />

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
