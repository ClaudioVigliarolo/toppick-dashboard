import React from "react";
import Select from "@/components/ui/select/Select";
import Chip from "@/components/ui/select/Chip";
import TagSelector from "@/components/topic/TopicTagSelector";
import {
  BooleanValues,
  TopicInterest,
  TopicLevel,
  TopicSource,
  TopicTag,
  TopicType,
} from "@toppick/common/build/interfaces";
import { useDialogStyles } from "@/components/ui/dialog/Dialog";

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
  const classes = useDialogStyles();
  return (
    <>
      <div className={classes.tabContainer}>
        <Select
          handleChange={handleSourceChange}
          value={source}
          values={Object.values(TopicSource)}
          color="black"
          containerClassName={classes.fieldContainer}
          header="Source"
        />
        <Select
          handleChange={handleLevelChange}
          value={level}
          values={Object.values(TopicLevel)}
          color="black"
          containerClassName={classes.fieldContainer}
          header="Level"
        />

        <Select
          handleChange={handleTypeChange}
          value={type}
          values={Object.values(TopicType)}
          color="black"
          containerClassName={classes.fieldContainer}
          header="Type"
        />

        <Select
          handleChange={handleFeaturedChange}
          value={featured}
          values={Object.values(BooleanValues)}
          color="black"
          containerClassName={classes.fieldContainer}
          header="Featured"
        />
      </div>
      <Chip
        selectedValues={selectedInterests.map((v) => v.title)}
        values={interests.map((v) => v.title)}
        header="Topic Interests"
        handleChange={handleInterestsChange}
        containerClassName={classes.fieldContainer}
      />
      <div className={classes.fieldContainer}>
        <TagSelector tags={tags} onRemove={onTagRemove} onAdd={onTagAdd} />
      </div>
    </>
  );
}
