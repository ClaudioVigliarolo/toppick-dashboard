import React from "react";
import Chip from "@/components/ui/select/ObjectChip";
import { DashLabel } from "@toppick/common";

interface RelatedProps {
  topics: DashLabel[];
  selectedTopics: DashLabel[];
  handleCategoriesChange: (i: number) => void;
}
export default function Related({
  topics,
  handleCategoriesChange,
  selectedTopics,
}: RelatedProps) {
  return (
    <>
      <Chip
        width={300}
        selectedValues={selectedTopics}
        values={topics.sort((a, b) => a.title.localeCompare(b.title))}
        header={"Related Topics"}
        handleChange={handleCategoriesChange}
      />
    </>
  );
}
