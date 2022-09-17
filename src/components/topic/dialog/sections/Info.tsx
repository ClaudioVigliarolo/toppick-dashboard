import React from "react";
import { CONSTANTS } from "@/constants/app";
import Select from "@/components/ui/select/SimpleSelect";
import Chip from "@/components/ui/select/ObjectChip";
import TagSelector from "@/components/ui/select/TagSelector";
import {
  BooleanValues,
  TopicInterest,
  TopicLevel,
  TopicSource,
  TopicTag,
  TopicType,
} from "@toppick/common/build/interfaces";
import { useAppDialogStyles } from "@/components/ui/dialog/Dialog";

interface InfoProps {
  handleSourceChange: (event: React.ChangeEvent<any>) => void;
  handleLevelChange: (event: React.ChangeEvent<any>) => void;
  handleFeaturedChange: (event: React.ChangeEvent<any>) => void;
  handleInterestsChange: (index: number) => void;
  source: string;
  interests: TopicInterest[];
  selectedInterests: TopicInterest[];
  level: TopicLevel;
  onTagRemove: (i: number) => void;
  onTagAdd: (title: string) => void;
  tags: TopicTag[];
  featured: string;
  handleTypeChange: (event: React.ChangeEvent<any>) => void;
  type: TopicType;
}

export default function Info({
  handleSourceChange,
  source,
  handleLevelChange,
  selectedInterests,
  handleInterestsChange,
  level,
  onTagRemove,
  tags,
  interests,
  onTagAdd,
  featured,
  handleFeaturedChange,
  handleTypeChange,
  type,
}: InfoProps) {
  const classes = useAppDialogStyles();
  return (
    <>
      <div className={classes.tabContainer}>
        <Select
          handleChange={handleSourceChange}
          value={source}
          values={Object.values(TopicSource)}
          color="black"
          className={classes.fieldContainer}
          header="Source"
          defaultValue={source}
        />
        <Select
          handleChange={handleLevelChange}
          value={level}
          values={Object.values(TopicLevel)}
          color="black"
          className={classes.fieldContainer}
          header="Level"
          defaultValue={level}
        />

        <Select
          handleChange={handleTypeChange}
          value={type}
          values={Object.values(TopicType)}
          color="black"
          className={classes.fieldContainer}
          header="Type"
          defaultValue={type}
        />

        <Select
          handleChange={handleFeaturedChange}
          value={featured}
          values={Object.values(BooleanValues)}
          color="black"
          className={classes.fieldContainer}
          header="Featured"
          defaultValue={featured}
        />
      </div>
      <div className={classes.selectContainer}>
        <Chip
          width="90%"
          selectedValues={selectedInterests}
          values={interests}
          header="Topic Interests"
          handleChange={handleInterestsChange}
        />

        <div
          className={classes.fieldContainer}
          style={{ maxWidth: "80%", marginTop: 5 }}
        >
          <TagSelector tags={tags} onRemove={onTagRemove} onAdd={onTagAdd} />
        </div>
      </div>
    </>
  );
}
