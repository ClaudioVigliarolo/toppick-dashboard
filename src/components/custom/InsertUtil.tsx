import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Category,
  Question,
  Related,
  Topic,
} from "../../interfaces/Interfaces";
import TransactionAlert from "../alerts/TransactionAlert";
import CustomButton from "../buttons/CustomButton";
import TopicAddDialog from "../dialogs/TopicDialog";
import { getHash } from "../../utils/utils";
import { addTopic } from "../../api/api";
import { CONSTANTS } from "../../constants/constants";
import Select from "../select/Select";
import TextArea from "../input/NumberedTextarea";
import QuestionsList from "../lists/QuestionsList";
import { onQuestionsAdd, onTopicAdd } from "src/utils/topics";
import { COLORS } from "src/constants/Colors";

const MIN_QUESTIONS = -1;
const NO_TOPIC = "Select A Topic";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      maxWidth: 400,
      alignItems: "center",
      alignSelf: "center",
    },
    root: {
      width: "100%",
      height: 450,
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },

    chips: {
      display: "flex",
      flexWrap: "wrap",
      alignSelf: "center",
      alignItems: "center",
    },
    chip: {
      margin: 2,
      backgroundColor: "orange",
      color: "white",
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    mainTextInput: {
      width: 500,
      padding: 20,
    },

    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      minHeight: "100vh",
    },
    headerContainer: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      width: 600,
      marginBottom: 80,
    },

    headerText: {
      color: "white",
      textAlign: "center",
      marginTop: -50,
      marginBottom: 50,
    },

    buttonContainer: {
      marginTop: 25,
      display: "flex",
      flexDirection: "row",
      width: 600,
      justifyContent: "space-evenly",
      paddingBottom: 100,
    },
    questionsListContainer: {
      marginTop: 50,
    },
  })
);

const DEFAULT_TOPIC: Topic = {
  categories: [],
  id: -1,
  related: [],
  source: "",
  timestamp: new Date(),
  title: "",
};

interface InsertTopicsPageProps {
  topics: Topic[];
  categories: Category[];
  currentLanguage: string;
  token: string;
  setLoading: (newVal: boolean) => void;
}
export default function InsertTopicsPage(props: InsertTopicsPageProps) {
  const [currentTopic, setCurrentTopic] = React.useState<Topic>(DEFAULT_TOPIC);
  const [selectTopic, setSelectTopic] = React.useState<string>(NO_TOPIC);
  const [topicAddDialog, setTopicAddDialog] = React.useState<boolean>(false);
  const [questionsText, setQuestionsText] = React.useState<string>("");
  const [questionsArray, setQuestionsArray] = React.useState<string[]>([]);
  const [error, setError] = React.useState(false);
  const [isReview, setReview] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const classes = useStyles();
  const [topics, setTopics] = React.useState<Topic[]>([]);

  React.useEffect(() => {
    setTopics(props.topics);
  }, [props.topics, props.categories]);

  const onSubmitReview = (): void => {
    const questionsArray = questionsText.match(/[^\r\n]+/g);
    setReview(true);
    questionsArray && setQuestionsArray(questionsArray);
  };

  const handleTopicChange = (event: React.ChangeEvent<{ value: any }>) => {
    setSelectTopic(event.target.value);
  };

  const isReviewButtonVisible = () => {
    const linesArr = questionsText.match(/[^\r\n]+/g);
    if (!linesArr) return false;
    return (
      !isReview && selectTopic != NO_TOPIC && linesArr.length > MIN_QUESTIONS
    );
  };

  const isTextareaVisible = () => {
    return selectTopic != NO_TOPIC && !isReview;
  };

  const isReviewListVisible = () => {
    return isReview;
  };

  const isHeaderContainerVisible = () => {
    return !isReview;
  };

  const renderHeaderText = () => {
    if (isReview) {
      return "Step 3: Proofread before submitting  ";
    } else if (selectTopic !== NO_TOPIC) {
      return "Step 2: Insert each question in a row ";
    } else if (selectTopic === NO_TOPIC) {
      return "Step 1: Select A topic ";
    }
  };
  return (
    <div className={classes.container}>
      <h1 className={classes.headerText}>{renderHeaderText()}</h1>

      {isHeaderContainerVisible() && (
        <div className={classes.headerContainer}>
          <Select
            handleChange={handleTopicChange}
            value={selectTopic}
            values={props.topics.map((t) => t.title)}
            defaultValue={NO_TOPIC}
          />

          <CustomButton
            onClick={() => setTopicAddDialog(true)}
            title="Create new Topic"
          />
        </div>
      )}
      {isTextareaVisible() && (
        <TextArea
          handleChange={(text) => {
            setQuestionsText(text);
          }}
          placeholder="Type or paste your questions here (min: 10 lines)"
          value={questionsText}
        />
      )}
      {isReviewListVisible() && (
        <div className={classes.questionsListContainer}>
          <QuestionsList
            questions={questionsArray}
            children={
              <div className={classes.buttonContainer}>
                <CustomButton
                  onClick={() => {
                    setReview(false);
                  }}
                  color="red"
                  title="Revert, change something"
                />
                <CustomButton
                  onClick={() => {
                    onQuestionsAdd(
                      questionsArray,
                      selectTopic,
                      topics,
                      props.currentLanguage,
                      props.token,
                      props.setLoading,
                      setSuccess,
                      setError
                    );
                  }}
                  color={COLORS.blue}
                  title="Submit, everything's fine"
                />
              </div>
            }
          />
        </div>
      )}

      {isReviewButtonVisible() && (
        <div className={classes.buttonContainer}>
          <CustomButton onClick={onSubmitReview} title="Submit For Review" />
        </div>
      )}

      <TopicAddDialog
        open={topicAddDialog}
        preselectedCategories={[]}
        preselectedRelated={[]}
        categories={props.categories.map((categ) => categ.title)}
        related={topics
          .map((topic) => topic.title)
          .filter((s) => s != currentTopic.title)}
        headerText="Add New Topic"
        topic=""
        onConfirm={(
          topicTitle: string,
          selectedCategoriesTitle: string[],
          selectedRelatedTitles: string[]
        ) => {
          onTopicAdd(
            topicTitle,
            selectedCategoriesTitle,
            selectedRelatedTitles,
            topics,
            props.categories,
            props.currentLanguage,
            props.token,
            setTopics,
            props.setLoading,
            setSuccess,
            setError
          );
          setCurrentTopic(DEFAULT_TOPIC);
          setTopicAddDialog(false);
        }}
        onRefuse={() => {
          setCurrentTopic(DEFAULT_TOPIC);
          setTopicAddDialog(false);
        }}
      />
      <TransactionAlert success={success} error={error} />
    </div>
  );
}
