import React from "react";
import { CustomDialog } from "./DialogStyles";
import Chip from "../select/ObjectChip";
import { TextField } from "@material-ui/core";
import {
  CategoryTopic,
  Related,
  Topic,
  TopicLevel,
  TopicType,
} from "src/interfaces/Interfaces";
import { isEnum, isSelected } from "src/utils/utils";
import Select from "../select/SimpleSelect";
import { CONSTANTS } from "src/constants/constants";
import RadioSelect from "../select/RadioSelect";
interface TopicDialogProps {
  topic: string;
  open: boolean;
  loading: boolean;
  onConfirm: (
    topicTitle: string,
    source: string,
    type: TopicType,
    level: TopicLevel,
    selectedCategories: CategoryTopic[],
    selectedRelated: Related[]
  ) => void;
  onRefuse: () => void;
  categories: CategoryTopic[];
  preselectedCategories: CategoryTopic[];
  preselectedRelated: Related[];
  headerText: string;
  type?: TopicType;
  level?: TopicLevel;
  related: Topic[];
  placeholderTitle?: string;
  placeholderCategories?: string;
  source?: string;
  placeholderRelated?: string;
}

export default function TopicDialog(props: TopicDialogProps) {
  const [topic, setTopic] = React.useState<string>("");
  const [topicType, setTopicType] = React.useState<TopicType>(
    CONSTANTS.TOPIC_RADIO_TYPES[0].value
  );
  const [related, setRelated] = React.useState<Related[]>([]);
  const [level, setLevel] = React.useState<string>(CONSTANTS.TOPIC_LEVELS[1]);
  const [source, setSource] = React.useState<string>(
    CONSTANTS.TOPIC_SOURCES[0]
  );
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
    props.type && setTopicType(props.type);
    props.source && setSource(props.source);
    props.level !== undefined && setLevel(CONSTANTS.TOPIC_LEVELS[props.level]);
  }, [
    props.categories,
    props.topic,
    props.source,
    props.preselectedCategories,
    props.source,
  ]);

  const onSubmit = async (
    newTopic: string,
    selectedCategories: CategoryTopic[]
  ) => {
    setError(false);
    if (newTopic == "" || selectedCategories.length == 0) {
      setError(true);
      return;
    }
    props.onConfirm(
      newTopic,
      source,
      topicType,
      CONSTANTS.TOPIC_LEVELS.indexOf(level),
      selectedCategories,
      selectedRelated
    );
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

  const handleSourceChange = (event: React.ChangeEvent<any>) => {
    setSource(event.target.value);
  };

  const handleLevelChange = (event: React.ChangeEvent<any>) => {
    setLevel(event.target.value);
  };

  const handleRadioChange = (event: React.ChangeEvent<any>) => {
    console.log(event.target.value);
    setTopicType(parseInt(event.target.value));
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
            <RadioSelect
              value={topicType}
              handleRadioChange={handleRadioChange}
              values={CONSTANTS.TOPIC_RADIO_TYPES}
            />
            <div style={{ alignSelf: "center", marginTop: 10 }}>
              <Select
                handleChange={handleSourceChange}
                value={source}
                values={CONSTANTS.TOPIC_SOURCES}
                color="black"
                width={300}
                defaultValue={CONSTANTS.TOPIC_SOURCES[0]}
              />
            </div>
            <div style={{ alignSelf: "center", marginTop: 10 }}>
              <Select
                handleChange={handleLevelChange}
                value={level}
                values={CONSTANTS.TOPIC_LEVELS}
                color="black"
                width={300}
                defaultValue={level}
              />
            </div>
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
