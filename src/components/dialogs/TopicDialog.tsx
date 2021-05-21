import React from "react";
import { CustomDialog } from "./DialogStyles";
import Chip from "../select/ObjectChip";
import { TextField } from "@material-ui/core";
import { CategoryTopic, Related, Topic } from "src/interfaces/Interfaces";
import { isSelected } from "src/utils/utils";

interface TopicDialogProps {
  topic: string;
  open: boolean;
  loading: boolean;
  onConfirm: (
    topicTitle: string,
    selectedCategories: CategoryTopic[],
    selectedRelated: Related[]
  ) => void;
  onRefuse: () => void;
  categories: CategoryTopic[];
  preselectedCategories: CategoryTopic[];
  preselectedRelated: Related[];
  headerText: string;
  related: Topic[];
  placeholderTitle?: string;
  placeholderCategories?: string;
  placeholderRelated?: string;
}

export default function TopicDialog(props: TopicDialogProps) {
  const [topic, setTopic] = React.useState<string>("");
  const [related, setRelated] = React.useState<Related[]>([]);
  const [selectedRelated, setSelectedRelated] = React.useState<Related[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<
    CategoryTopic[]
  >([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setTopic(props.topic);
    const newRelated = [...props.related];
    setRelated(
      newRelated
        .sort((a, b) => a.title.localeCompare(b.title))
        .filter((c) => c.title !== props.topic)
    );
    setSelectedCategories(props.preselectedCategories);
    setSelectedRelated(props.preselectedRelated);
  }, [props.categories, props.topic, props.preselectedCategories]);

  const onSubmit = async (
    newTopic: string,
    selectedCategories: CategoryTopic[]
  ) => {
    setError(false);
    if (newTopic == "" || selectedCategories.length == 0) {
      setError(true);
      return;
    }
    props.onConfirm(newTopic, selectedCategories, selectedRelated);
  };

  const handleCategoriesChange = (index: number) => {
    if (isSelected(selectedCategories, props.categories[index])) {
      setSelectedCategories([
        ...selectedCategories.filter(
          (s) => s.title !== props.categories[index].title
        ),
      ]);
    } else {
      setSelectedCategories([...selectedCategories, props.categories[index]]);
    }
  };

  const handleRelatedChange = (index: number) => {
    if (isSelected(selectedRelated, related[index])) {
      setSelectedRelated([
        ...selectedRelated.filter((s) => s.title !== related[index].title),
      ]);
    } else {
      setSelectedRelated([...selectedRelated, related[index]]);
    }
  };

  return (
    <>
      <CustomDialog
        open={props.open}
        headerText={props.headerText}
        minWidth={600}
        loading={props.loading}
        children={
          <>
            <TextField
              error={error}
              autoFocus
              placeholder={props.placeholderTitle}
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
              values={props.categories.sort((a, b) =>
                a.title.localeCompare(b.title)
              )}
              header={
                props.placeholderCategories
                  ? props.placeholderCategories
                  : "Related Categories"
              }
              error={error}
              handleChange={handleCategoriesChange}
            />

            <Chip
              width={300}
              selectedValues={selectedRelated}
              values={related}
              header={
                props.placeholderRelated
                  ? props.placeholderRelated
                  : "Related Topics"
              }
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
