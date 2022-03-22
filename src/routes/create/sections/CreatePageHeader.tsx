import React from "react";
import Select from "@/components/ui/select/ObjectSelect";
import Button from "@/components/ui/buttons/Button";
import { DashLabel } from "@toppick/common";
export default function CreatePageHeader({
  isReview,
  selectedTopic,
  isUpdate,
  defaultTopic,
  classes,
  handleTopicChange,
  onTopicCreate,
  topics,
}: {
  isReview: boolean;
  selectedTopic: DashLabel;
  isUpdate: boolean;
  classes: any;
  defaultTopic: DashLabel;
  onTopicCreate: () => void;
  handleTopicChange: (index: number) => void;
  topics: DashLabel[];
}) {
  const isHeaderSectionVisible = () => {
    return !isReview;
  };

  const isAddnewTopicVisible = () => {
    return selectedTopic === defaultTopic;
  };

  const renderHeaderText = () => {
    if (isReview) {
      return "Proofread before submitting  ";
    } else if (selectedTopic !== defaultTopic) {
      return isUpdate ? "Edit the questions" : "Insert new questions";
    } else if (selectedTopic === defaultTopic) {
      return "Let's start by picking a Topic ";
    }
  };

  return (
    <div>
      <h1 className={classes.headerText}>{renderHeaderText()}</h1>
      {isHeaderSectionVisible() && (
        <div
          className={classes.headerSection}
          style={{
            justifyContent: isAddnewTopicVisible() ? "space-between" : "center",
          }}
        >
          <Select
            handleChange={handleTopicChange}
            value={selectedTopic}
            values={topics}
            defaultValue={defaultTopic}
            width={400}
          />
          {isAddnewTopicVisible() && (
            <Button onClick={onTopicCreate} title="Create new Topic" />
          )}
        </div>
      )}
    </div>
  );
}
