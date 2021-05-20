//api call to get all the topics to translate (from user_current_lang to target_lang)
import React from "react";
import { getCategories, getTopics, getToTranslateTopics } from "../api/api";
import CustomButton from "../components/buttons/CustomButton";
import TranslationAddDialog from "../components/dialogs/TopicDialog";
import Select from "../components/select/TranslateSelect";
import TextArea from "../components/input/NumberedTextarea";
import QuestionsList from "../components/lists/QuestionsList";
import {
  ondeleteToTranslateTopic,
  onQuestionsAdd,
  onTopicAdd,
} from "src/utils/topics";
import { COLORS } from "src/constants/Colors";
import { countTextLines, getHash, getLinesFromText } from "src/utils/utils";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { getGoogleTranslatedQuestions, getQuestionsByTopic } from "src/api/api";
import {
  Category,
  CategoryTopic,
  Lang,
  PageProps,
  Related,
  Topic,
  ToTranslateTopic,
} from "../interfaces/Interfaces";
import { useAppStyles } from "src/styles/common";

enum TextAreaIndex {
  Google,
  Blank,
  Original,
}

interface TranslationTextArea {
  google: string;
  blank: string;
  original: string;
}

const DEFAULT_TRANSLATION_TEXTAREA: TranslationTextArea = {
  blank: "",
  google: "",
  original: "",
};

const NO_TOTRANSLATE_TOPIC = {
  source_lang: Lang.EN,
  dest_lang: Lang.EN,
  id: -1,
  ref_id: -1,
  source_categories: [],
  source_related: [],
  source_title: "Pick A topic To Translate",
  topic_id: -1,
};

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
  const [selectedTopicToTranslate, setselectedTopicToTranslate] =
    React.useState<ToTranslateTopic>(NO_TOTRANSLATE_TOPIC);
  const [translationTextArea, setTranslationTextArea] =
    React.useState<TranslationTextArea>(DEFAULT_TRANSLATION_TEXTAREA);
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [textAreaIndex, setTextAreaIndex] = React.useState<number>(
    TextAreaIndex.Google
  );
  const [translatedQuestionsArray, setTranslatedQuestionsArray] =
    React.useState<string[]>([]);
  const [isReview, setReview] = React.useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = React.useState<Topic>(NO_TOPIC);
  const [topicAddDialog, setTopicAddDialog] = React.useState<boolean>(false);
  const [toTranslateTopics, setToTranslateTopics] = React.useState<
    ToTranslateTopic[]
  >([]);
  const [isQuestionsTranslate, setIsQuestionsTranslate] = React.useState(false);
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

      //get to translate
      const toTranslateTopics = await getToTranslateTopics(
        currentLanguage,
        token
      );
      if (toTranslateTopics != null) {
        setToTranslateTopics(
          toTranslateTopics.sort((a, b) =>
            a.source_title.localeCompare(b.source_title)
          )
        );
      }

      setLoading(false);
    })();
  }, [currentLanguage]);

  React.useEffect(() => {
    setReview(false);
    setIsQuestionsTranslate(false);
    setselectedTopicToTranslate(NO_TOTRANSLATE_TOPIC);
    window.scrollTo(0, 0);
  }, [currentLanguage]);

  const handleTextAreaSwitchChange = (
    event: React.MouseEvent<HTMLElement>,
    newVal: number | null
  ) => {
    setTextAreaIndex(newVal !== null ? newVal : textAreaIndex);
  };

  const onSubmitReview = (): void => {
    setReview(true);
    setTranslatedQuestionsArray(
      getLinesFromText(translationTextArea[textAreaIndex])
    );
  };
  const onSelectTranslate = (index: number) => {
    setselectedTopicToTranslate(toTranslateTopics[index]);
    setTopicAddDialog(true);
  };

  const isTextareaVisible = () => {
    return isQuestionsTranslate && !isReview;
  };

  const isTranslationSwitchVisible = () => {
    return isQuestionsTranslate && !isReview;
  };

  const isSelectToTranslateVisible = () => {
    return !isQuestionsTranslate && !isReview;
  };

  const onTranslationTextAreaChange = (text: string) => {
    const newTextArea = translationTextArea;
    newTextArea[textAreaIndex] = text;
    setTranslationTextArea({ ...newTextArea });
  };

  const onSetOriginalQuestions = async (topicID: number, token: string) => {
    const originalQuestions = await getQuestionsByTopic(topicID, token);
    if (originalQuestions !== null) {
      const newTextArea = translationTextArea;
      const originalQuestionsText = originalQuestions
        .map((q) => q.title)
        .join("\n");
      newTextArea[TextAreaIndex.Original] = originalQuestionsText;
      setTranslationTextArea({ ...newTextArea });
    }
  };

  const onGoogleTranslateQuestions = async (
    topicID: number,
    from: Lang,
    to: Lang,
    token: string
  ) => {
    const googleTranslations = await getGoogleTranslatedQuestions(
      topicID,
      from,
      to,
      token
    );

    if (googleTranslations !== null) {
      const newTextArea = translationTextArea;
      const googleTranslationsText = googleTranslations.join("\n");
      newTextArea[TextAreaIndex.Google] = googleTranslationsText;
      setTranslationTextArea({ ...newTextArea });
    }
  };

  const onSetBlankSheet = async () => {
    const newTextArea = translationTextArea;
    newTextArea[TextAreaIndex.Blank] = "";
    setTranslationTextArea({ ...newTextArea });
  };

  const isReviewButtonVisible = () => {
    if (
      isReview ||
      !isQuestionsTranslate ||
      (translationTextArea === DEFAULT_TRANSLATION_TEXTAREA &&
        textAreaIndex !== TextAreaIndex.Original)
    )
      return false;

    const currentTextAreaLength = countTextLines(
      translationTextArea[textAreaIndex]
    );
    const originalTextAreaLength = countTextLines(
      translationTextArea[TextAreaIndex.Original]
    );

    return currentTextAreaLength > 5;
    /*
    return (
      Math.abs(originalTextAreaLength - currentTextAreaLength) <=
        originalTextAreaLength / 3 &&
      Math.abs(originalTextAreaLength + currentTextAreaLength) >=
        originalTextAreaLength / 3
    );*/
  };

  const isReviewListVisible = () => {
    return isReview;
  };

  const renderHeaderText = () => {
    if (isReview) {
      return "Step 4: Double check the translations and click submit";
    } else if (isQuestionsTranslate) {
      return "Step 3: Now, translate the questions. You are free to choose how to translate. When you are ready click Review ->";
    } else if (selectedTopicToTranslate !== NO_TOTRANSLATE_TOPIC) {
      return "Step 2: Translate the topic in the (target) language";
    } else if (selectedTopicToTranslate === NO_TOTRANSLATE_TOPIC) {
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
                currentLanguage,
                token
              )
            }
            onSelect={onSelectTranslate}
            value={selectedTopicToTranslate.source_title}
            values={toTranslateTopics.map(
              (t) => t.source_title + " (" + t.dest_lang.toUpperCase() + ")"
            )}
            defaultValue={NO_TOTRANSLATE_TOPIC.source_title}
          />
        </div>
      )}
      {isTranslationSwitchVisible() && (
        <div className={classes.switchContainer}>
          <ToggleButtonGroup
            value={textAreaIndex}
            exclusive
            onChange={handleTextAreaSwitchChange}
            aria-label="text alignment"
          >
            <ToggleButton
              value={TextAreaIndex.Original}
              aria-label="left aligned"
            >
              <p>Original Text</p>
            </ToggleButton>
            <ToggleButton value={TextAreaIndex.Google} aria-label="centered">
              <p>Google Translated</p>
            </ToggleButton>
            <ToggleButton
              value={TextAreaIndex.Blank}
              aria-label="right aligned"
            >
              <p>Blank Sheet</p>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      )}

      {isTextareaVisible() && (
        <div className={classes.textAreaContainer}>
          <TextArea
            placeholder="Type or paste your questions here (min: 10 lines)"
            value={translationTextArea[textAreaIndex]}
            handleChange={onTranslationTextAreaChange}
            readOnly={textAreaIndex === TextAreaIndex.Original}
          />
        </div>
      )}

      {isReviewButtonVisible() && (
        <div className={classes.buttonContainer}>
          <CustomButton onClick={onSubmitReview} title="Submit For Review" />
        </div>
      )}

      {isReviewListVisible() && (
        <div className={classes.questionsListContainer}>
          <QuestionsList
            questions={translatedQuestionsArray}
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
                      [...new Set(translatedQuestionsArray)],
                      selectedTopic,
                      currentLanguage,
                      token,
                      setLoading,
                      () => {
                        setReview(false);
                        setIsQuestionsTranslate(false);
                        setSelectedTopic(NO_TOPIC);
                        setselectedTopicToTranslate(NO_TOTRANSLATE_TOPIC);
                        window.scrollTo(0, 0);
                        onSuccess();
                      },
                      onError
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

      <TranslationAddDialog
        open={topicAddDialog}
        preselectedCategories={selectedTopicToTranslate.source_categories}
        preselectedRelated={selectedTopicToTranslate.source_related}
        categories={categories}
        related={topics}
        headerText="Add New Topic"
        topic=""
        placeholderTitle={selectedTopicToTranslate.source_title}
        onConfirm={async (
          newTitle: string,
          selectedCategories: CategoryTopic[],
          selectedRelated: Related[]
        ) => {
          const newTopic: Topic = {
            id: getHash(newTitle, currentLanguage),
            title: newTitle,
            related: selectedRelated,
            source: "TopPicks Creators",
            timestamp: new Date(),
            categories: selectedCategories,
            ref_id: selectedTopicToTranslate.ref_id,
          };

          onTopicAdd(
            newTopic,
            topics,
            currentLanguage,
            token,
            setTopics,
            setLoading,
            async () => {
              setLoading(true);
              setSelectedTopic(newTopic);
              ondeleteToTranslateTopic(
                selectedTopicToTranslate.id,
                toTranslateTopics,
                setToTranslateTopics,
                currentLanguage,
                token
              );

              await onSetOriginalQuestions(
                selectedTopicToTranslate.topic_id,
                token
              );

              await onGoogleTranslateQuestions(
                selectedTopicToTranslate.topic_id,
                selectedTopicToTranslate.source_lang,
                selectedTopicToTranslate.dest_lang,
                token
              );

              await onSetBlankSheet();
              setLoading(false);
              onSuccess();
              setIsQuestionsTranslate(true);
              setselectedTopicToTranslate(NO_TOTRANSLATE_TOPIC);
              setTopicAddDialog(false);
            },
            onError
          );
        }}
        onRefuse={() => {
          setselectedTopicToTranslate(NO_TOTRANSLATE_TOPIC);
          setTopicAddDialog(false);
        }}
      />
    </div>
  );
}
