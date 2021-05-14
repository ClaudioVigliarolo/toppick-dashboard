import React from "react";
import {
  addToTranslateTopic,
  getCategories,
  getQuestionsByTopic,
  getTopics,
} from "../api/api";
import {
  Category,
  CategoryTopic,
  PageProps,
  Related,
  Topic,
} from "../interfaces/Interfaces";
import TopicAddDialog from "../components/dialogs/TopicDialog";
import { useAppStyles } from "../styles/common";
import Select from "../components/select/Select";
import CustomButton from "../components/buttons/CustomButton";
import TextArea from "../components/input/NumberedTextarea";
import QuestionsList from "../components/lists/QuestionsList";
import { onQuestionsAdd, onTopicAdd } from "src/utils/topics";
import { countTextLines, getHash, getLinesFromText } from "src/utils/utils";
import { COLORS } from "src/constants/Colors";

const MIN_QUESTIONS = 5;

const NO_TOPIC: Topic = {
  categories: [],
  id: -1,
  related: [],
  source: "",
  timestamp: new Date(),
  title: "Select A Topic",
  ref_id: -1,
};

export default function CreatePage({
  token,
  currentLanguage,
  setLoading,
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
      const retrievedCategories = await getCategories(currentLanguage, token);
      if (retrievedCategories != null) {
        setCategories(retrievedCategories);
      }

      const retrievedTopics = await getTopics(currentLanguage, token);
      //sort by timestamp
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

  const handleTopicChange = async (index: number) => {
    setSelectedTopic(topics[index]);
    if (topics[index] !== NO_TOPIC) {
      setLoading(true);
      const retrievedQuestions = await getQuestionsByTopic(
        topics[index].id,
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
            placeholder="Type or paste your questions here (min: 10 lines)"
            value={questionsText}
          />
        </div>
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
                      currentLanguage,
                      token,
                      setLoading,
                      async () => {
                        await addToTranslateTopic(
                          selectedTopic.id,
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
        categories={categories}
        related={topics}
        headerText="Add New Topic"
        topic=""
        onConfirm={async (
          newTopicTitle: string,
          selectedCategories: CategoryTopic[],
          selectedRelated: Related[]
        ) => {
          const newTopic: Topic = {
            id: getHash(newTopicTitle, currentLanguage),
            title: newTopicTitle,
            related: selectedRelated,
            source: "TopPicks, " + "username",
            timestamp: new Date(),
            categories: selectedCategories,
            ref_id: getHash(newTopicTitle, currentLanguage),
          };
          await onTopicAdd(
            newTopic,
            topics,
            currentLanguage,
            token,
            setTopics,
            setLoading,
            () => {
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
