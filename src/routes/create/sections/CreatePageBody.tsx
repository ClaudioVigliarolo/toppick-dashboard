import React from "react";
import { Question, Topic } from "@/interfaces/dash_topics";
import QuestionField from "@/components/question/CreateQuestionField";
import CustomButton from "@/components/ui/buttons/Button";
import QuestionsReview from "@/components/question/QuestionsReview";
import QuestionsQuickAddDialog from "@/components/question/QuestionsQuickAddDialog";
import { createStyles, makeStyles } from "@material-ui/core";
import { useAppStyles } from "@/styles/common";

const MIN_QUESTIONS = 10;

const useStyles = makeStyles(() =>
  createStyles({
    questionFieldContainer: {
      marginTop: 50,
    },
  })
);

export default function CreatePageBody({
  selectedTopic,
  defaultTopic,
  setReview,
  isReview,
  loading,
  onSubmit,
  resetTopic,
  onQuestionDelete,
  onQuestionCreate,
  questions,
  onQuestionChange,
  onSubmitToReview,
  onRevertFromReview,
  setQuestions,
}: {
  selectedTopic: Topic;
  defaultTopic: Topic;
  loading: boolean;
  setReview: (val: boolean) => void;
  resetTopic: () => void;
  isReview: boolean;
  onSubmitToReview: () => void;
  onQuestionDelete: (index: number) => void;
  onQuestionCreate: (index: number) => void;
  onRevertFromReview: () => void;
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  onQuestionChange: (index: number, question: Question) => void;
  onSubmit: (questions: Question[]) => void;
}) {
  const classes = useStyles();
  const appClasses = useAppStyles();

  const isReviewButtonVisible = () => {
    return (
      !isReview &&
      selectedTopic !== defaultTopic &&
      questions.length >= MIN_QUESTIONS
    );
  };

  const isTextareaVisible = () => {
    return (
      !loading &&
      selectedTopic.id !== defaultTopic.id &&
      !isReview &&
      questions.length === 0
    );
  };

  const isQuestionListVisible = () => {
    return !isTextareaVisible() && !isReview;
  };

  return (
    <>
      <QuestionsQuickAddDialog
        minQuestions={MIN_QUESTIONS}
        loading={loading}
        onConfirm={(questions: Question[]) => {
          setQuestions(questions);
        }}
        topic={selectedTopic}
        open={isTextareaVisible()}
        onRefuse={resetTopic}
      />
      {isQuestionListVisible() && (
        <div className={classes.questionFieldContainer}>
          {questions.map((q, i) => (
            <QuestionField
              key={i}
              index={i}
              onDelete={onQuestionDelete}
              onChange={onQuestionChange}
              question={q}
              onCreate={onQuestionCreate}
            />
          ))}
        </div>
      )}
      {isReview && (
        <QuestionsReview
          questions={questions}
          onChange={onQuestionChange}
          onSubmit={() => onSubmit(questions)}
          onClose={onRevertFromReview}
          loading={loading}
        />
      )}
      {isReviewButtonVisible() && (
        <div className={appClasses.buttonContainer}>
          <CustomButton onClick={onSubmitToReview} title="Submit For Review" />
        </div>
      )}
    </>
  );
}
