import React from "react";
import Chip from "@/components/ui/select/Chip";
import { TopicFeatured } from "@toppick/common/build/interfaces";
import { useDialogStyles } from "@/components/ui/dialog/Dialog";

interface RelatedProps {
  topics: TopicFeatured[];
  selectedTopics: TopicFeatured[];
  handleTopicsChange: (index: number) => void;
}
export default function Related({
  topics,
  handleTopicsChange,
  selectedTopics,
}: RelatedProps) {
  const classes = useDialogStyles();
  return (
    <>
      <Chip
        selectedValues={selectedTopics.map((v) => v.title)}
        values={topics.map((v) => v.title)}
        header={"Related Topics"}
        handleChange={handleTopicsChange}
        containerClassName={classes.fieldContainer}
      />
    </>
  );
}
