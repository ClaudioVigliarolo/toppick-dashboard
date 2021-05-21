import { TextField } from "@material-ui/core";
import React from "react";
import { CategoryTopic, Topic, Value } from "src/interfaces/Interfaces";
import { isSelected } from "src/utils/utils";
import Chip from "../select/ObjectChip";
import { CustomDialog } from "./DialogStyles";

interface CategoryDialogProps {
  open: boolean;
  loading: boolean;
  onConfirm: (category: string, categTopics: CategoryTopic[]) => void;
  onRefuse: () => void;
  category: string;
  preselectedCategTopics: CategoryTopic[];
  categTopics: CategoryTopic[];
  headerText: string;
}

export default function CategoryDialog(props: CategoryDialogProps) {
  const [category, setCategory] = React.useState<string>("");
  const [selectedCategTopics, setSelectedCategTopics] = React.useState<
    CategoryTopic[]
  >([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setCategory(props.category);
    setSelectedCategTopics(props.preselectedCategTopics);
  }, [props.category, props.preselectedCategTopics]);

  const onSubmit = async (newCategory: string) => {
    setError(false);
    setCategory("");
    if (newCategory == "" || selectedCategTopics.length == 0) {
      setError(true);
      return;
    }
    props.onConfirm(newCategory, selectedCategTopics);
  };

  const handleCategTopicChange = (index: number) => {
    if (isSelected(selectedCategTopics, props.categTopics[index])) {
      setSelectedCategTopics([
        ...selectedCategTopics.filter(
          (s) => s.title !== props.categTopics[index].title
        ),
      ]);
    } else {
      setSelectedCategTopics([
        ...selectedCategTopics,
        props.categTopics[index],
      ]);
    }
  };

  return (
    <>
      <CustomDialog
        open={props.open}
        headerText={props.headerText}
        minWidth={500}
        onConfirm={() => onSubmit(category)}
        onRefuse={props.onRefuse}
        loading={props.loading}
        children={
          <>
            <TextField
              error={error}
              autoFocus
              InputLabelProps={{ shrink: true }}
              margin="dense"
              label="text"
              id="standard-helperText"
              value={category}
              onChange={(e) => setCategory(e.currentTarget.value)}
              fullWidth
            />
            <Chip
              width={300}
              selectedValues={selectedCategTopics}
              values={props.categTopics.sort((a, b) =>
                a.title.localeCompare(b.title)
              )}
              header={"Related Topics"}
              error={error}
              handleChange={handleCategTopicChange}
            />
          </>
        }
      />
    </>
  );
}
