import React from "react";
import { ToTranslateTopic } from "../../../interfaces/Interfaces";
import Select from "../../../components/select/TranslateSelect";
import TabButton from "../../../components/buttons/TabButton";
export default function TranslatePageHeader({
  isReview,
  selectedTopic,
  defaultTopic,
  classes,
  onDelete,
  onArchive,
  onUnarchive,
  onSelect,
  toTranslateTopics,
  archived,
  setArchive,
}: {
  isReview: boolean;
  selectedTopic: ToTranslateTopic;
  classes: any;
  defaultTopic: ToTranslateTopic;
  onDelete: (i: number) => void;
  onArchive: (i: number) => void;
  onUnarchive: (i: number) => void;
  onSelect: (i: number) => void;
  toTranslateTopics: ToTranslateTopic[];
  archived: boolean;
  setArchive: (val: boolean) => void;
}) {
  const isHeaderSectionVisible = () => {
    return !isReview; //!isQuestionsTranslate &&
  };

  const renderHeaderText = () => {
    if (isReview) {
      return "Step 4: Double check the translations and click submit";
    } else if (selectedTopic !== defaultTopic) {
      return "Step 2: Translate the topic in the (target) language";
    } else if (selectedTopic === defaultTopic) {
      return "Let's start by selecting a Topic to translate ";
    }
  };

  return (
    <div>
      <h1 className={classes.headerText}>{renderHeaderText()}</h1>
      {isHeaderSectionVisible() && (
        <div className={classes.headerSection}>
          <Select
            onDelete={onDelete}
            onArchive={onArchive}
            onUnarchive={onUnarchive}
            onSelect={onSelect}
            value={selectedTopic.source_title}
            values={toTranslateTopics.map(
              (t) => t.source_title + " (" + t.source_lang.toUpperCase() + ")"
            )}
            defaultValue={defaultTopic.source_title}
            archived={archived}
          />

          <div>
            <TabButton
              label="Archive"
              selected={archived}
              onClick={() => setArchive(!archived)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
