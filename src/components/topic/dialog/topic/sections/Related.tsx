import React from "react";
import Chip from "@/components/ui/select/ObjectChip";
import { DashLabel } from "@toppick/common";

interface RelatedProps {
  categories: DashLabel[];
  topics: DashLabel[];
  selectedCategories: DashLabel[];
  selectedTopics: DashLabel[];
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
  return (
    <>
      <Chip
        width={300}
        selectedValues={selectedCategories}
        values={categories.sort((a, b) => a.title.localeCompare(b.title))}
        header="Related Categories"
        handleChange={handleCategoriesChange}
      />
      <Chip
        width={300}
        selectedValues={selectedTopics}
        values={topics.sort((a, b) => a.title.localeCompare(b.title))}
        header="Related Topics"
        handleChange={handleTopicsChange}
      />
    </>
  );
}
