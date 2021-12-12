import React from "react";
import {
  Question,
  Topic,
  ToTranslateTopic,
} from "../../../interfaces/Interfaces";
import TranslateField from "../../../components/input/TranslateQuestionField";
import CustomButton from "../../../components/buttons/Button";
import QuestionsReview from "../../../components/lists/QuestionsReview";

const MIN_QUESTIONS = 10;
export default function CreatePageBody({
  classes,
  setReview,
  isReview,
  loading,
  onSubmit,
  onQuestionDelete,
  onQuestionAdd,
  sourceQuestions,
  targetQuestions,
  onQuestionChange,
  onSubmitReview,
}: {
  classes: any;
  loading: boolean;
  setReview: (val: boolean) => void;
  isReview: boolean;
  onSubmit: () => void;
  onQuestionDelete: (index: number) => void;
  onQuestionAdd: (index: number) => void;
  sourceQuestions: Question[];
  targetQuestions: Question[];
  onQuestionChange: (index: number, question: Question) => void;
  onSubmitReview: () => void;
}) {
  const isQuestionListVisible = () => {
    return (
      !isReview && sourceQuestions.length > 0 && targetQuestions.length > 0
    );
  };

  const isReviewButtonVisible = () => {
    return !isReview && isQuestionListVisible();
  };

  return (
    <>
      {isQuestionListVisible() && (
        <div style={{ marginBottom: 50 }}>
          {targetQuestions.map((q, i) => (
            <TranslateField
              index={i}
              key={i}
              sourceQuestion={sourceQuestions[i]}
              targetQuestion={q}
              onDelete={onQuestionDelete}
              onChange={onQuestionChange}
              onAdd={onQuestionAdd}
            />
          ))}
        </div>
      )}
      {isReview && (
        <QuestionsReview
          classes={classes}
          questions={targetQuestions}
          onChange={onQuestionChange}
          onSubmit={onSubmit}
          onClose={() => setReview(false)}
          loading={loading}
        />
      )}
      {isReviewButtonVisible() && (
        <div className={classes.buttonContainer}>
          <CustomButton onClick={onSubmitReview} title="Submit For Review" />
        </div>
      )}
    </>
  );
}
