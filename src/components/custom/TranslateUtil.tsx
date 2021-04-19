import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Category,
  Lang,
  Topic,
  ToTranslateTopic,
} from "../../interfaces/Interfaces";

import CustomButton from "../buttons/CustomButton";
import TopicAddDialog from "../dialogs/TopicDialog";
import Select from "../select/TranslateSelect";
import TextArea from "../input/NumberedTextarea";
import QuestionsList from "../lists/QuestionsList";
import {
  getCategoriesFromTitles,
  getRelatedFromTitle,
  ondeleteToTranslateTopic,
  onQuestionsAdd,
  onTopicAdd,
  onTranslateQuestions,
} from "src/utils/topics";
import { COLORS } from "src/constants/Colors";
import { getHash } from "src/utils/utils";
import { FormControlLabel, Switch } from "@material-ui/core";

const MIN_QUESTIONS = -1;
const NO_TOPIC_SELECTED = {
  dest_lang: Lang.EN,
  id: -1,
  source_questions: [],
  source_title: "Select a Topic To Translate",
  topic_id: -1,
};

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
    },

    headerText: {
      color: "white",
      textAlign: "center",
      marginTop: -50,
      marginBottom: 50,
      maxWidth: "50vw",
    },

    buttonContainer: {
      marginTop: 100,
      display: "flex",
      flexDirection: "row",
      width: 600,
      justifyContent: "space-evenly",
      paddingBottom: 100,
    },
    questionsListContainer: {
      marginTop: 50,
    },
    switchContainer: {
      marginBottom: 100,
    },
  })
);

interface InsertTopicsPageProps {
  topics: Topic[];
  categories: Category[];
  toTranslateTopics: ToTranslateTopic[];
  currentLanguage: Lang;
  token: string;
  setLoading: (newVal: boolean) => void;
  onSuccess: () => void;
  onError: () => void;
}
export default function InsertTopicsPage(props: InsertTopicsPageProps) {
  const [
    selectedTopicToTranslate,
    setselectedTopicToTranslate,
  ] = React.useState<ToTranslateTopic>(NO_TOPIC_SELECTED);
  const [topicAddDialog, setTopicAddDialog] = React.useState<boolean>(false);
  const [questionsText, setQuestionsText] = React.useState<string>("");
  const [questionsArray, setQuestionsArray] = React.useState<string[]>([]);
  const [toTranslateTopics, setToTranslateTopics] = React.useState<
    ToTranslateTopic[]
  >([]);

  const [error, setError] = React.useState(false);
  const [showGoogleTranslation, setShowGoogleTranslation] = React.useState(
    false
  );
  const [googleTranslations, setGoogleTranslations] = React.useState<string>(
    ""
  );
  const [isQuestionsTranslate, setIsQuestionsTraslate] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const classes = useStyles();
  const [topics, setTopics] = React.useState<Topic[]>([]);

  React.useEffect(() => {
    setTopics(props.topics);
    setToTranslateTopics(props.toTranslateTopics);
  }, [props.toTranslateTopics, props.topics]);

  const onSubmitReview = (): void => {
    const questionsArray = questionsText.match(/[^\r\n]+/g);
    setIsQuestionsTraslate(true);
    questionsArray && setQuestionsArray(questionsArray);
  };

  const onSelectTranslate = (index: number) => {
    setselectedTopicToTranslate(toTranslateTopics[index]);
    setTopicAddDialog(true);
  };

  const loadTranslations = (topicID: number) => {};

  const isQuestionsTranslateButtonVisible = () => {
    const linesArr = questionsText.match(/[^\r\n]+/g);
    if (!linesArr) return false;
    return (
      !isQuestionsTranslate &&
      selectedTopicToTranslate != NO_TOPIC_SELECTED &&
      linesArr.length > MIN_QUESTIONS
    );
  };

  const isTextareaVisible = () => {
    return isQuestionsTranslate;
  };

  const isTranslationSwitchVisible = () => {
    return isQuestionsTranslate;
  };

  const isQuestionsTranslateListVisible = () => {
    return isQuestionsTranslate;
  };

  const isSelectToTranslateVisible = () => {
    return !isQuestionsTranslate;
  };

  const renderHeaderText = () => {
    if (isQuestionsTranslate) {
      return "Step 3: Now, translate the questions. When you are ready click Review";
    } else if (selectedTopicToTranslate !== NO_TOPIC_SELECTED) {
      return "Step 2: Translate the topic in the (target) language";
    } else if (selectedTopicToTranslate === NO_TOPIC_SELECTED) {
      return "Let's start by selecting a Topic to translate ";
    }
  };
  return (
    <div className={classes.container}>
      <h1 className={classes.headerText}>{renderHeaderText()}</h1>

      {isSelectToTranslateVisible() && (
        <div className={classes.headerContainer}>
          <Select
            width={500}
            onDelete={(i: number) =>
              ondeleteToTranslateTopic(
                toTranslateTopics[i].id,
                toTranslateTopics,
                setToTranslateTopics,
                props.currentLanguage,
                props.token
              )
            }
            onSelect={onSelectTranslate}
            value={selectedTopicToTranslate.source_title}
            values={toTranslateTopics.map(
              (t) => t.source_title + " (" + t.dest_lang.toUpperCase() + ")"
            )}
            defaultValue={NO_TOPIC_SELECTED.source_title}
          />
        </div>
      )}

      {isTranslationSwitchVisible() && (
        <div className={classes.switchContainer}>
          <FormControlLabel
            value={showGoogleTranslation}
            control={<Switch style={{ color: "white" }} />}
            label="Show Original Text"
            style={{
              color: "white",
            }}
            onChange={() => setShowGoogleTranslation(!showGoogleTranslation)}
          />
        </div>
      )}

      {isTextareaVisible() &&
        (showGoogleTranslation ? (
          <TextArea
            placeholder="Type or paste your questions here (min: 10 lines)"
            value={googleTranslations}
            handleChange={(text) => {
              setGoogleTranslations(text);
            }}
          />
        ) : (
          <TextArea
            handleChange={(text) => {
              //cannot change the value of source text
            }}
            placeholder="Source text"
            value={selectedTopicToTranslate.source_questions.join("\n")}
          />
        ))}

      {isQuestionsTranslateListVisible() && (
        <div className={classes.questionsListContainer}>
          <QuestionsList
            questions={questionsArray}
            children={
              <div className={classes.buttonContainer}>
                <CustomButton
                  onClick={() => {
                    setIsQuestionsTraslate(false);
                  }}
                  color="red"
                  title="Revert, change something"
                />
                <CustomButton
                  onClick={async () => {
                    await onQuestionsAdd(
                      questionsArray,
                      selectedTopicToTranslate.source_title,
                      topics,
                      props.currentLanguage,
                      props.token,
                      props.setLoading,
                      props.onSuccess,
                      props.onError
                    );
                    window.scrollTo(0, 0);
                    setIsQuestionsTraslate(false);
                    setselectedTopicToTranslate(NO_TOPIC_SELECTED);
                  }}
                  color={COLORS.blue}
                  title="Submit, everything's fine"
                />
              </div>
            }
          />
        </div>
      )}

      {isQuestionsTranslateButtonVisible() && (
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
          .filter((s) => s != selectedTopicToTranslate.source_title)}
        headerText="Add New Topic"
        topic=""
        placeholder={selectedTopicToTranslate.source_title}
        onConfirm={(
          newTitle: string,
          selectedCategoriesTitles: string[],
          selectedRelatedTitles: string[]
        ) => {
          onTopicAdd(
            {
              id: getHash(newTitle),
              title: newTitle,
              related: getRelatedFromTitle(topics, selectedRelatedTitles),
              source: "TopPicks Creators",
              timestamp: new Date(),
              categories: getCategoriesFromTitles(
                props.categories,
                selectedCategoriesTitles
              ),
            },
            topics,
            props.currentLanguage,
            props.token,
            setTopics,
            props.setLoading,
            props.onSuccess,
            props.onError
          );

          ondeleteToTranslateTopic(
            selectedTopicToTranslate.id,
            toTranslateTopics,
            setToTranslateTopics,
            props.currentLanguage,
            props.token
          );

          onTranslateQuestions(
            selectedTopicToTranslate.topic_id,
            setGoogleTranslations,
            props.currentLanguage,
            props.token
          );

          setIsQuestionsTraslate(true);
          setselectedTopicToTranslate(NO_TOPIC_SELECTED);
          setTopicAddDialog(false);
        }}
        onRefuse={() => {
          setselectedTopicToTranslate(NO_TOPIC_SELECTED);
          setTopicAddDialog(false);
        }}
      />
    </div>
  );
}
