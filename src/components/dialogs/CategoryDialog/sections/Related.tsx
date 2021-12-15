import React from "react";
import { CategoryTopic } from "../../../../interfaces/Interfaces";
import Chip from "../../../select/ObjectChip";

interface RelatedProps {
  categoryTopics: CategoryTopic[];
  selectedCategoryTopics: CategoryTopic[];
  handleCategoriesChange: (i: number) => void;
}
export default function Related({
  categoryTopics,
  handleCategoriesChange,
  selectedCategoryTopics,
}: RelatedProps) {
  return (
    <>
      <Chip
        width={300}
        selectedValues={selectedCategoryTopics}
        values={categoryTopics.sort((a, b) => a.title.localeCompare(b.title))}
        header={"Related Topics"}
        handleChange={handleCategoriesChange}
      />
    </>
  );
}
