import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import {
  CircularProgress,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import LinkOutlinedIcon from "@material-ui/icons/LinkOutlined";
import BookmarkAddedIcon from "@material-ui/icons/Bookmark";
import { CONSTANTS } from "src/constants/constants";
import QuestionDialog from "../dialogs/QuestionDialog";
import { Example, Question } from "src/interfaces/Interfaces";
import CustomButton from "../buttons/Button";
import { COLORS } from "src/constants/Colors";
const LIST_ITEM_HEIGTH = 100;
const LIST_ITEM_MARGIN = 25;

const NO_QUESTION: Question = {
  id: -1,
  title: "",
  examples: [],
};

export default function QuestionsList({
  questions,
  onSubmit,
  onChange,
  loading,
  classes,
  onClose,
}: {
  questions: Question[];
  onSubmit: () => void;
  onChange: (index: number, question: Question) => void;
  loading: boolean;
  classes: any;
  onClose: () => void;
}) {
  const [articlesDialog, setArticlesDialog] = React.useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] =
    React.useState<Question>(NO_QUESTION);
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    React.useState<number>(-1);

  const renderRow = ({ index }: ListChildComponentProps) => {
    return (
      <ListItem
        button
        key={index}
        style={{
          backgroundColor: "white",
          marginBottom: 25,
          height: LIST_ITEM_HEIGTH,
        }}
      >
        <ListItemIcon>
          {questions[index].article ||
          (questions[index].examples as Example[]).length > 0 ? (
            <BookmarkAddedIcon
              onClick={() => {
                setCurrentQuestion(questions[index]);
                setCurrentQuestionIndex(index);
                setArticlesDialog(true);
              }}
            />
          ) : (
            <LinkOutlinedIcon
              onClick={() => {
                setCurrentQuestion(questions[index]);
                setCurrentQuestionIndex(index);
                setArticlesDialog(true);
              }}
            />
          )}
        </ListItemIcon>
        <ListItemText secondary={questions[index].title} primary={index + 1} />
      </ListItem>
    );
  };

  return (
    <div className={classes.QuestionsReviewContainer}>
      <FixedSizeList
        width={
          window.innerWidth > CONSTANTS.SMALL_SCREEN
            ? window.innerWidth * 0.7
            : window.innerWidth * 0.4
        }
        height={questions.length * (LIST_ITEM_MARGIN + LIST_ITEM_HEIGTH)}
        itemSize={50}
        itemCount={questions.length}
      >
        {renderRow}
      </FixedSizeList>
      <div style={{ marginTop: 50 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <div className={classes.buttonContainer}>
            <CustomButton
              onClick={onClose}
              color="red"
              title="Revert, change something"
            />
            <CustomButton
              onClick={onSubmit}
              color={COLORS.blue}
              title="Submit, everything's fine"
            />
          </div>
        )}{" "}
      </div>
      <QuestionDialog
        open={articlesDialog}
        onConfirm={(q) => {
          onChange(currentQuestionIndex, q);
          setCurrentQuestion(NO_QUESTION);
          setArticlesDialog(false);
        }}
        headerText="Edit Question"
        question={currentQuestion}
        onRefuse={() => {
          setCurrentQuestion(NO_QUESTION);
          setArticlesDialog(false);
        }}
      />
    </div>
  );
}
