import React from "react";
import Chip from "@/components/ui/select/ObjectChip";
import { DashLabel } from "@toppick/common";
import { makeStyles } from "@material-ui/core";

interface RelatedProps {
  categories: DashLabel[];
  topics: DashLabel[];
  selectedCategories: DashLabel[];
  selectedTopics: DashLabel[];
  handleCategoriesChange: (i: number) => void;
  handleTopicsChange: (i: number) => void;
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
}));

export default function Related({
  categories,
  topics,
  selectedCategories,
  selectedTopics,
  handleCategoriesChange,
  handleTopicsChange,
}: RelatedProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
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
    </div>
  );
}
