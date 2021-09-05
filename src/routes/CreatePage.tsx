import React from "react";
import { getCategories, getQuestionsByTopic, getTopics } from "../api/api";
import {
  Category,
  CategoryTopic,
  PageProps,
  Related,
  Topic,
  TopicLevel,
  TopicType,
} from "../interfaces/Interfaces";
import TopicAddDialog from "../components/dialogs/TopicDialog";
import { useAppStyles } from "../styles/common";
import Select from "../components/select/ObjectSelect";
import CustomButton from "../components/buttons/CustomButton";
import TextArea from "../components/input/NumberedTextarea";
import QuestionsList from "../components/lists/QuestionsList";
import { onQuestionsAdd, onTopicAdd } from "src/utils/topics";
import { countTextLines, getHash, getLinesFromText } from "src/utils/utils";
import { COLORS } from "src/constants/Colors";
import { CircularProgress } from "@material-ui/core";

const MIN_QUESTIONS = 15;

const NO_TOPIC: Topic = {
  categories: [],
  id: -1,
  related: [],
  type: 0,
  level: 0,
  source: "",
  timestamp: new Date(),
  title: "Select A Topic",
  ref_id: -1,
};

export default function CreatePage({
  token,
  currentLanguage,
  setLoading,
  loading,
  onError,
  onSuccess,
}: PageProps) {
  const [selectedTopic, setSelectedTopic] = React.useState<Topic>(NO_TOPIC);
  const [topicAddDialog, setTopicAddDialog] = React.useState<boolean>(false);
  const [questionsText, setQuestionsText] = React.useState<string>("");
  const [questionsArray, setQuestionsArray] = React.useState<string[]>([]);
  const [isReview, setReview] = React.useState(false);
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const classes = useAppStyles();

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const retrievedCategories = await getCategories(currentLanguage);
      if (retrievedCategories != null) {
        setCategories(retrievedCategories);
      }

      const retrievedTopics = await getTopics(currentLanguage);
      //sort by timestamp
      if (retrievedTopics != null) {
        setTopics(
          retrievedTopics.sort((a, b) => a.title.localeCompare(b.title))
        );
      }
      setLoading(false);
      setSelectedTopic(NO_TOPIC);
    })();
  }, [currentLanguage]);

  const onSubmitReview = (): void => {
    setReview(true);
    setQuestionsArray(getLinesFromText(questionsText));
  };

  const handleTopicChange = async (index: number) => {
    setSelectedTopic(topics[index]);
    if (topics[index] !== NO_TOPIC) {
      setLoading(true);
      const retrievedQuestions = await getQuestionsByTopic(topics[index].id);
      if (retrievedQuestions !== null) {
        setQuestionsText(retrievedQuestions.map((q) => q.title).join("\n"));
      }
      setLoading(false);
    }
  };

  const isReviewButtonVisible = () => {
    return (
      !isReview &&
      selectedTopic != NO_TOPIC &&
      countTextLines(questionsText) > MIN_QUESTIONS
    );
  };

  const isTextareaVisible = () => {
    return selectedTopic != NO_TOPIC && !isReview;
  };

  const isReviewListVisible = () => {
    return isReview;
  };

  const isHeaderSectionVisible = () => {
    return !isReview;
  };

  const getQuestionsPlaceholder = () => {
    console.log("uuuu", selectedTopic);
    if (selectedTopic.type === TopicType.DIALOG) {
      return "The 1st question is the description of the dialog \nFollows the questions";
    } else {
      return "Type or paste your questions here (min: 10 lines)";
    }
  };

  const renderHeaderText = () => {
    if (isReview) {
      return "Step 3: Proofread before submitting  ";
    } else if (selectedTopic !== NO_TOPIC) {
      return "Step 2: Insert each question in a row ";
    } else if (selectedTopic === NO_TOPIC) {
      return "Let's start by picking a Topic ";
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.headerText}>{renderHeaderText()}</h1>

      {isHeaderSectionVisible() && (
        <div className={classes.headerSection}>
          <Select
            handleChange={handleTopicChange}
            value={selectedTopic}
            values={topics}
            defaultValue={NO_TOPIC}
          />

          <CustomButton
            onClick={() => setTopicAddDialog(true)}
            title="Create new Topic"
          />
        </div>
      )}
      {isTextareaVisible() && (
        <div className={classes.textAreaContainer}>
          <TextArea
            handleChange={(text) => {
              setQuestionsText(text);
            }}
            placeholder={getQuestionsPlaceholder()}
            value={questionsText}
          />
        </div>
      )}
      {isReviewListVisible() && (
        <div className={classes.questionsListContainer}>
          <QuestionsList
            questions={questionsArray}
            children={
              loading ? (
                <CircularProgress />
              ) : (
                <div className={classes.buttonContainer}>
                  <CustomButton
                    onClick={() => {
                      setReview(false);
                    }}
                    color="red"
                    title="Revert, change something"
                  />
                  <CustomButton
                    onClick={async () => {
                      await onQuestionsAdd(
                        [...new Set(questionsArray)],
                        selectedTopic,
                        currentLanguage,
                        token,
                        setLoading,
                        async () => {
                          //add translations
                          window.scrollTo(0, 0);
                          setReview(false);
                          setSelectedTopic(NO_TOPIC);
                          onSuccess();
                        },
                        onError
                      );
                    }}
                    color={COLORS.blue}
                    title="Submit, everything's fine"
                  />
                </div>
              )
            }
          />
        </div>
      )}
      {console.log("sssss", selectedTopic)}
      {isReviewButtonVisible() && (
        <div className={classes.buttonContainer}>
          <CustomButton onClick={onSubmitReview} title="Submit For Review" />
        </div>
      )}

      <TopicAddDialog
        open={topicAddDialog}
        preselectedCategories={[]}
        preselectedRelated={[]}
        categories={categories}
        loading={loading}
        related={topics}
        headerText="Add New Topic"
        topic=""
        onConfirm={async (
          newTopicTitle: string,
          newSource: string,
          newType: TopicType,
          newLevel: TopicLevel,
          selectedCategories: CategoryTopic[],
          selectedRelated: Related[]
        ) => {
          const newID = getHash(newTopicTitle, currentLanguage);
          const newTopic: Topic = {
            id: newID,
            type: newType,
            level: newLevel,
            title: newTopicTitle,
            related: selectedRelated,
            source: newSource,
            timestamp: new Date(),
            categories: selectedCategories,
            ref_id: newID,
          };
          await onTopicAdd(
            newTopic,
            topics,
            currentLanguage,
            token,
            setTopics,
            setLoading,
            async () => {
              setQuestionsText("");
              setSelectedTopic(newTopic);
              setTopicAddDialog(false);
              onSuccess();
            },
            onError
          );
        }}
        onRefuse={() => {
          setSelectedTopic(NO_TOPIC);
          setTopicAddDialog(false);
        }}
      />
    </div>
  );
}
