import React from "react";
import { CustomDialog } from "./DialogStyles";
import Chip from "../select/Chip";
import { TextField } from "@material-ui/core";
import { Category } from "../../interfaces/Interfaces";
interface TopicDialogProps {
  topic: string;
  open: boolean;
  placeholder?: string;
  onConfirm: (
    topicTitle: string,
    selectedCategoriesTitles: string[],
    selectedRelatedTitles: string[]
  ) => void;
  onRefuse: () => void;
  categories: string[];
  preselectedCategories: string[];
  preselectedRelated: string[];
  headerText: string;
  related: string[];
}

export default function TopicDialog(props: TopicDialogProps) {
  const [topic, setTopic] = React.useState<string>("");
  const [selectedRelated, setSelectedRelated] = React.useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setTopic(props.topic);
    setSelectedCategories(props.preselectedCategories);
    setSelectedRelated(props.preselectedRelated);
  }, [props.categories, props.topic, props.preselectedCategories]);

  const onSubmit = async (newTopic: string, selectedCategories: string[]) => {
    setError(false);
    if (newTopic == "" || selectedCategories.length == 0) {
      setError(true);
      return;
    }
    props.onConfirm(newTopic, selectedCategories, selectedRelated);
  };

  const handleCategoriesChange = (
    event: React.ChangeEvent<{ value: string[] }>
  ) => {
    setSelectedCategories(event.target.value);
  };

  const handleRelatedChange = (
    event: React.ChangeEvent<{ value: string[] }>
  ) => {
    setSelectedRelated(event.target.value);
  };

  return (
    <>
      <CustomDialog
        open={props.open}
        headerText={props.headerText}
        minWidth={600}
        children={
          <>
            <TextField
              error={error}
              autoFocus
              placeholder={props.placeholder}
              InputLabelProps={{ shrink: true }}
              margin="dense"
              label="text"
              id="standard-helperText"
              value={topic}
              onChange={(e) => setTopic(e.currentTarget.value)}
              fullWidth
            />
            <Chip
              width={300}
              selectedValues={selectedCategories}
              values={props.categories}
              header="Related Categories"
              error={error}
              handleChange={handleCategoriesChange}
            />

            <Chip
              width={300}
              selectedValues={selectedRelated}
              values={props.related}
              header="Related Topics"
              error={error}
              handleChange={handleRelatedChange}
            />
          </>
        }
        onConfirm={() => {
          onSubmit(topic, selectedCategories);
        }}
        onRefuse={props.onRefuse}
      />
    </>
  );
}
