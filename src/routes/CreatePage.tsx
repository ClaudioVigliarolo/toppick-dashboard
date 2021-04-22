import React from "react";
import {
  addToTranslateTopic,
  getCategories,
  getQuestionsByTopic,
  getTopics,
} from "../api/api";
import { Category, PageProps, Topic } from "../interfaces/Interfaces";
import TopicAddDialog from "../components/dialogs/TopicDialog";
import { useAppStyles } from "../styles/common";
import Select from "src/components/select/Select";
import CustomButton from "src/components/buttons/CustomButton";
import TextArea from "src/components/input/NumberedTextarea";
import QuestionsList from "src/components/lists/QuestionsList";
import {
  getCategoriesFromTitles,
  getRelatedFromTitle,
  getTopicIdFromTitle,
  onQuestionsAdd,
  onTopicAdd,
} from "src/utils/topics";
import { countTextLines, getHash, getLinesFromText } from "src/utils/utils";
import { COLORS } from "src/constants/Colors";

const MIN_QUESTIONS = -1;
const NO_TOPIC = "Select A Topic";
export default function CreatePage({
  token,
  currentLanguage,
  setLoading,
  onError,
  onSuccess,
}: PageProps) {
  const [selectedTopic, setSelectedTopic] = React.useState<string>(NO_TOPIC);
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
      const retrievedCategories = await getCategories(currentLanguage, token);
      if (retrievedCategories != null) {
        setCategories(retrievedCategories);
      }

      const retrievedTopics = await getTopics(currentLanguage, token);
      if (retrievedTopics != null) {
        setTopics(retrievedTopics);
      }
      setLoading(false);
      setSelectedTopic(NO_TOPIC);
    })();
  }, [currentLanguage]);

  const onSubmitReview = (): void => {
    setReview(true);
    setQuestionsArray(getLinesFromText(questionsText));
  };

  const handleTopicChange = async (
    event: React.ChangeEvent<{ value: any }>
  ) => {
    setSelectedTopic(event.target.value);
    if (event.target.value !== NO_TOPIC) {
      setLoading(true);
      const retrievedQuestions = await getQuestionsByTopic(
        getTopicIdFromTitle(topics, event.target.value),
        token
      );
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

  const renderHeaderText = () => {
    if (isReview) {
      return "Step 3: Proofread before submitting  ";
    } else if (selectedTopic !== NO_TOPIC) {
      return "Step 2: Insert each question in a row ";
    } else if (selectedTopic === NO_TOPIC) {
      return "Let's start by picking a Topic ";
    }
  };
  {
    console.log("suso", selectedTopic);
  }
  return (
    <div className={classes.container}>
      <h1 className={classes.headerText}>{renderHeaderText()}</h1>

      {isHeaderSectionVisible() && (
        <div className={classes.headerSection}>
          <Select
            handleChange={handleTopicChange}
            value={selectedTopic}
            values={topics.map((t) => t.title)}
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
                  onClick={async () => {
                    await onQuestionsAdd(
                      questionsArray,
                      selectedTopic,
                      topics,
                      currentLanguage,
                      token,
                      setLoading,
                      async () => {
                        await addToTranslateTopic(
                          getTopicIdFromTitle(topics, selectedTopic),
                          currentLanguage,
                          token
                        );
                        onSuccess();
                      },
                      onError
                    );
                    //add translations
                    window.scrollTo(0, 0);
                    setReview(false);
                    setSelectedTopic(NO_TOPIC);
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
        categories={categories.map((categ) => categ.title)}
        related={topics
          .map((topic) => topic.title)
          .filter((s) => s != selectedTopic)}
        headerText="Add New Topic"
        topic=""
        onConfirm={async (
          newTitle: string,
          selectedCategoriesTitles: string[],
          selectedRelatedTitles: string[]
        ) => {
          await onTopicAdd(
            {
              id: getHash(newTitle, currentLanguage),
              title: newTitle,
              related: getRelatedFromTitle(topics, selectedRelatedTitles),
              source: "TopPicks, " + "username",
              timestamp: new Date(),
              categories: getCategoriesFromTitles(
                categories,
                selectedCategoriesTitles
              ),
              ref_id: getHash(newTitle, currentLanguage),
            },
            topics,
            currentLanguage,
            token,
            setTopics,
            setLoading,
            () => {
              setSelectedTopic(newTitle);
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
