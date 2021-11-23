import { TextField } from "@material-ui/core";
import React from "react";
import { NO_IMAGE_URL } from "src/constants/constants";
import { CategoryTopic, Topic, Value } from "src/interfaces/Interfaces";
import { isSelected } from "src/utils/utils";
import Chip from "../select/ObjectChip";
import { CustomDialog, TabData } from "./DialogsStyles2";

interface CategoryDialogProps {
  open: boolean;
  loading: boolean;
  onConfirm: (
    category: string,
    description: string,
    imageUrl: string,
    categTopics: CategoryTopic[]
  ) => void;
  onRefuse: () => void;
  category: string;
  preselectedCategTopics: CategoryTopic[];
  categTopics: CategoryTopic[];
  headerText: string;
  description?: string;
  image?: string;
}

export default function CategoryDialog(props: CategoryDialogProps) {
  const [category, setCategory] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [selectedCategTopics, setSelectedCategTopics] = React.useState<
    CategoryTopic[]
  >([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setCategory(props.category);
    setSelectedCategTopics(props.preselectedCategTopics);

    props.description && setDescription(props.description);
    props.image && setImageUrl(props.image);
  }, [props.category, props.preselectedCategTopics]);

  const onSubmit = async () => {
    setError(false);
    props.onConfirm(category, description, imageUrl, selectedCategTopics);
  };

  const isSubmitEnabled = (): boolean =>
    category.length > 0 &&
    imageUrl.length > 0 &&
    selectedCategTopics.length > 0;

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

  const tabs: TabData[] = [
    {
      label: "Overview",
      children: (
        <>
          <TextField
            autoFocus
            placeholder="Title"
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label="Title"
            id="standard-helperText"
            value={category}
            onChange={(e) => setCategory(e.currentTarget.value)}
            style={{ width: 500, alignSelf: "center", marginTop: 10 }}
          />

          <TextField
            autoFocus
            placeholder="Type or paste description here..."
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label="Description"
            id="outlined-multiline-flexible"
            multiline
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            style={{ width: 500, alignSelf: "center" }}
          />

          <img
            src={imageUrl ? imageUrl : NO_IMAGE_URL}
            style={{ height: 200, alignSelf: "center", marginTop: 20 }}
          />
          <TextField
            autoFocus
            placeholder="Paste the Image Url here"
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label="Link"
            id="standard-helperText"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.currentTarget.value)}
            style={{ width: 300, alignSelf: "center", marginTop: 10 }}
          />
        </>
      ),
    },
    {
      label: "Related",
      children: (
        <>
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
      ),
    },
  ];

  return (
    <>
      <CustomDialog
        open={props.open}
        headerText={props.headerText}
        minWidth={600}
        minHeigth={600}
        onConfirm={onSubmit}
        onRefuse={props.onRefuse}
        loading={props.loading}
        tabData={tabs}
        confirmButtonDisabled={!isSubmitEnabled()}
      />
    </>
  );
}
