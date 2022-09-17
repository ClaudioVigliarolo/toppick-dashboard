import React from "react";
import Chip from "@/components/ui/select/ObjectChip";
import {
  CategoryFeatured,
  TopicFeatured,
} from "@toppick/common/build/interfaces";
import { useAppDialogStyles } from "@/components/ui/dialog/Dialog";

interface RelatedProps {
  categories: CategoryFeatured[];
  topics: TopicFeatured[];
  selectedCategories: CategoryFeatured[];
  selectedTopics: TopicFeatured[];
  handleCategoriesChange: (i: number) => void;
  handleTopicsChange: (i: number) => void;
}

export default function Related({
  categories,
  topics,
  selectedCategories,
  selectedTopics,
  handleCategoriesChange,
  handleTopicsChange,
}: RelatedProps) {
  const classes = useAppDialogStyles();

  return (
    <div className={classes.tabContainer}>
      <Chip
        width={350}
        selectedValues={selectedCategories}
        values={categories.sort((a, b) => a.title.localeCompare(b.title))}
        header="Related Categories"
        handleChange={handleCategoriesChange}
      />
      <Chip
        width={350}
        selectedValues={selectedTopics}
        values={topics.sort((a, b) => a.title.localeCompare(b.title))}
        header="Related Topics"
        handleChange={handleTopicsChange}
      />
    </div>
  );
}
