import React from "react";
import { Question, Topic } from "../../interfaces/Interfaces";
import QuestionField from "../../components/input/CreateQuestionField";
import CustomButton from "../../components/buttons/CustomButton";
import QuestionsReview from "src/components/lists/QuestionsReview";
import QuestionsQuickAddDialog from "src/components/dialogs/QuestionsQuickAddDialog";
import { getHash } from "src/utils/utils";

const MIN_QUESTIONS = 10;
export default function CreatePageBody({
  selectedTopic,
  classes,
  defaultTopic,
  setReview,
  isReview,
  loading,
  onSubmit,
  resetTopic,
  onQuestionDelete,
  onQuestionAdd,
  questions,
  onQuestionChange,
  onSubmitReview,
  setQuestions,
}: {
  classes: any;
  selectedTopic: Topic;
  defaultTopic: Topic;
  loading: boolean;
  setReview: (val: boolean) => void;
  resetTopic: () => void;
  isReview: boolean;
  onSubmit: (questions: Question[]) => void;
  onQuestionDelete: (index: number) => void;
  onQuestionAdd: (index: number) => void;
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  onQuestionChange: (index: number, question: Question) => void;
  onSubmitReview: () => void;
}) {
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
        <div className={classes.CreateQuestionFieldContainer}>
          {questions.map((q, i) => (
            <QuestionField
              index={i}
              onDelete={onQuestionDelete}
              onChange={onQuestionChange}
              question={q}
              onAdd={onQuestionAdd}
            />
          ))}
        </div>
      )}
      {isReview && (
        <div className={classes.QuestionsReviewContainer}>
          <QuestionsReview
            classes={classes}
            questions={questions}
            onChange={onQuestionChange}
            onSubmit={() => onSubmit(questions)}
            onClose={() => setReview(false)}
            loading={loading}
          />
        </div>
      )}
      {isReviewButtonVisible() && (
        <div className={classes.buttonContainer}>
          <CustomButton onClick={onSubmitReview} title="Submit For Review" />
        </div>
      )}
    </>
  );
}
