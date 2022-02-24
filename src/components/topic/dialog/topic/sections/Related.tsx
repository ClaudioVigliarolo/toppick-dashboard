import React from "react";
import { TopicCategory, TopicRelated } from "@/interfaces/dash_topics";
import Chip from "@/components/ui/select/ObjectChip";

interface RelatedProps {
  categories: TopicCategory[];
  topics: TopicRelated[];
  selectedCategories: TopicCategory[];
  selectedTopics: TopicRelated[];
  handleCategoriesChange: (i: number) => void;
  handleRelatedChange: (i: number) => void;
}
export default function Related({
  categories,
  topics,
  selectedCategories,
  selectedTopics,
  handleCategoriesChange,
  handleRelatedChange,
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
        handleChange={handleRelatedChange}
      />
    </>
  );
}
