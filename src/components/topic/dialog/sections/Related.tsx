import React from "react";
import Chip from "@/components/ui/select/Chip";
import {
  CategoryFeatured,
  TopicFeatured,
} from "@toppick/common/build/interfaces";
import { useDialogStyles } from "@/components/ui/dialog/Dialog";

interface RelatedProps {
  categories: CategoryFeatured[];
  topics: TopicFeatured[];
  selectedCategories: CategoryFeatured[];
  selectedTopics: TopicFeatured[];
  handleCategoriesChange: (index: number) => void;
  handleTopicsChange: (index: number) => void;
}

export default function Related({
  categories,
  topics,
  selectedCategories,
  selectedTopics,
  handleCategoriesChange,
  handleTopicsChange,
}: RelatedProps) {
  const classes = useDialogStyles();

  return (
    <div className={classes.tabContainer}>
      <Chip
        selectedValues={selectedCategories.map((v) => v.title)}
        values={categories.map((v) => v.title)}
        header="Related Categories"
        containerClassName={classes.fieldContainer}
        handleChange={handleCategoriesChange}
      />
      <Chip
        selectedValues={selectedTopics.map((v) => v.title)}
        values={topics.map((v) => v.title)}
        header="Related Topics"
        containerClassName={classes.fieldContainer}
        handleChange={handleTopicsChange}
      />
    </div>
  );
}
