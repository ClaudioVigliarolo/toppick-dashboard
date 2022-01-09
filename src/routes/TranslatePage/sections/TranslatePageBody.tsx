import React from "react";
import {
  Question,
  Topic,
  ToTranslateTopic,
} from "../../../interfaces/Interfaces";
import TranslateField from "../../../components/input/TranslateQuestionField";
import CustomButton from "../../../components/buttons/Button";
import QuestionsReview from "../../../components/lists/QuestionsReview";
import { makeStyles } from "@material-ui/core";
import { useAppStyles } from "src/styles/common";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
  },
}));

export default function CreatePageBody({
  setReview,
  isReview,
  loading,
  onSubmit,
  onQuestionDelete,
  onQuestionCreate,
  sourceQuestions,
  targetQuestions,
  onQuestionChange,
  onSubmitReview,
}: {
  loading: boolean;
  setReview: (val: boolean) => void;
  isReview: boolean;
  onSubmit: () => void;
  onQuestionDelete: (index: number) => void;
  onQuestionCreate: (index: number) => void;
  sourceQuestions: Question[];
  targetQuestions: Question[];
  onQuestionChange: (index: number, question: Question) => void;
  onSubmitReview: () => void;
}) {
  const appClasses = useAppStyles();
  const classes = useStyles();

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
        <div className={classes.container}>
          {targetQuestions.map((q, i) => (
            <TranslateField
              index={i}
              key={i}
              sourceQuestion={sourceQuestions[i]}
              targetQuestion={q}
              onDelete={onQuestionDelete}
              onChange={onQuestionChange}
              onCreate={onQuestionCreate}
            />
          ))}
        </div>
      )}
      {isReview && (
        <QuestionsReview
          questions={targetQuestions}
          onChange={onQuestionChange}
          onSubmit={onSubmit}
          onClose={() => setReview(false)}
          loading={loading}
        />
      )}
      {isReviewButtonVisible() && (
        <div className={appClasses.buttonContainer}>
          <CustomButton onClick={onSubmitReview} title="Submit For Review" />
        </div>
      )}
    </>
  );
}
