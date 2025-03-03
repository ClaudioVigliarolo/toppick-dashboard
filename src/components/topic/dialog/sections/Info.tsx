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
  onSearchRemove: (i: number) => void;
  onSearchTagAdd: (title: string) => void;
  searchTags: TopicTag[];
  onSocialRemove: (i: number) => void;
  onSocialTagAdd: (title: string) => void;
  socialTags: TopicTag[];
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
  searchTags,
  onSearchTagAdd,
  onSearchRemove,
  socialTags,
  onSocialTagAdd,
  onSocialRemove,
  interests,
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
        <Chip
          selectedValues={selectedInterests.map((v) => v.title)}
          values={interests.map((v) => v.title)}
          header="Topic Interests"
          handleChange={handleInterestsChange}
          containerClassName={classes.fieldContainer}
        />
        <div className={classes.fieldContainer}  style={{ marginBottom: 20, marginTop: 20 }}>
          <TagSelector 
            tags={socialTags}
            onRemove={onSocialRemove}
            onAdd={onSocialTagAdd} 
            label="Social tags"
            placeholder="Add a Social Tag"
          />
        </div>
        <div className={classes.fieldContainer}>
          <TagSelector 
            tags={searchTags}
            onRemove={onSearchRemove}
            onAdd={onSearchTagAdd} 
            label="Search tags"
            placeholder="Add a Search Tag"
          />
        </div>
      </div>
    </>
  );
}
