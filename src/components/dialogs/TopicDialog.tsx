import React from "react";
import { CustomDialog, TabData } from "./DialogsStyles2";
import Chip from "../select/ObjectChip";
import { TextField } from "@material-ui/core";
import {
  CategoryTopic,
  MaterialUiColor,
  RadioButton,
  Related,
  Topic,
  TopicLevel,
  TopicType,
  Value,
} from "src/interfaces/Interfaces";
import { hasVal, isSelected } from "src/utils/utils";
import Select from "../select/SimpleSelect";
import TypeSelect from "../select/ObjectSelect";

import { CONSTANTS, NO_IMAGE_URL } from "src/constants/constants";
import Switch from "../select/Switch";
interface TopicDialogProps {
  topic: string;
  open: boolean;
  loading: boolean;
  onConfirm: (
    topicTitle: string,
    source: string,
    type: TopicType,
    level: TopicLevel,
    description: string,
    image: string,
    active: boolean,
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
  description?: string;
  active: boolean;
  image?: string;
  placeholderRelated?: string;
}

export default function TopicDialog(props: TopicDialogProps) {
  const [topic, setTopic] = React.useState<string>("");
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [topicType, setTopicType] = React.useState<RadioButton>(
    CONSTANTS.TOPIC_TYPES_RADIO[0]
  );
  const [related, setRelated] = React.useState<Related[]>([]);
  const [active, setActive] = React.useState<boolean>(false);
  const [level, setLevel] = React.useState<string>(CONSTANTS.TOPIC_LEVELS[1]);
  const [source, setSource] = React.useState<string>(
    CONSTANTS.TOPIC_SOURCES[0]
  );
  const [selectedRelated, setSelectedRelated] = React.useState<Related[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<
    CategoryTopic[]
  >([]);

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
    if (props.type) {
      const topicType = CONSTANTS.TOPIC_TYPES_RADIO.find(
        (t) => t.value == props.type
      );
      if (topicType) {
        setTopicType(topicType);
      }
    }
    hasVal(props.source) && setSource(props.source as string);
    hasVal(props.active) && setActive(props.active);
    hasVal(props.description) && setDescription(props.description as string);
    hasVal(props.image) && setImageUrl(props.image as string);
    hasVal(props.level) &&
      setLevel(CONSTANTS.TOPIC_LEVELS[props.level as TopicLevel]);
  }, [
    props.categories,
    props.topic,
    props.preselectedCategories,
    props.source,
    props.active,
    props.description,
    props.image,
    props.level,
    props.preselectedRelated,
    props.related,
    props.type,
  ]);

  const onSubmit = async (
    newTopic: string,
    selectedCategories: CategoryTopic[]
  ) => {
    props.onConfirm(
      newTopic,
      source,
      topicType.value,
      CONSTANTS.TOPIC_LEVELS.indexOf(level),
      description,
      imageUrl,
      active,
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

  const handleRadioChange = (index: number) => {
    setTopicType(CONSTANTS.TOPIC_TYPES_RADIO[index]);
  };

  const isSubmitEnabled = (): boolean =>
    topic.length > 0 &&
    imageUrl.length > 0 &&
    level.length > 0 &&
    selectedCategories.length > 0;

  const tabs: TabData[] = [
    {
      label: "Overview",
      children: (
        <>
          <div
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              cursor: "pointer",
              color: "orange",
              fontSize: 30,
            }}
          >
            <Switch
              text=""
              color={MaterialUiColor.Primary}
              handleChange={() => setActive(!active)}
              value={active}
            />
          </div>

          <TextField
            placeholder={props.placeholderTitle}
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label="Title"
            id="standard-helperText"
            value={topic}
            onChange={(e) => setTopic(e.currentTarget.value)}
            style={{ width: 500, alignSelf: "center", marginTop: 10 }}
          />

          <TextField
            placeholder={props.placeholderTitle}
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label="Description"
            id="outlined-multiline-flexible"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            style={{ width: 500, alignSelf: "center" }}
          />

          <img
            src={imageUrl ? imageUrl : NO_IMAGE_URL}
            alt="img"
            style={{ height: 200, alignSelf: "center", marginTop: 20 }}
          />
          <TextField
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
            selectedValues={selectedCategories}
            values={props.categories.sort((a, b) =>
              a.title.localeCompare(b.title)
            )}
            header={
              props.placeholderCategories
                ? props.placeholderCategories
                : "Related Categories"
            }
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
            handleChange={handleRelatedChange}
          />
        </>
      ),
    },

    {
      label: "Info",
      children: (
        <>
          <div style={{ alignSelf: "center", marginTop: 20 }}>
            <Select
              handleChange={handleSourceChange}
              value={source}
              values={CONSTANTS.TOPIC_SOURCES}
              color="black"
              width={300}
              header="Source"
              defaultValue={CONSTANTS.TOPIC_SOURCES[0]}
            />
          </div>
          <div style={{ alignSelf: "center", marginTop: 20 }}>
            <Select
              handleChange={handleLevelChange}
              value={level}
              values={CONSTANTS.TOPIC_LEVELS}
              color="black"
              width={300}
              header="Level"
              defaultValue={level}
            />
          </div>
          <div style={{ alignSelf: "center", marginTop: 20, marginBottom: 20 }}>
            <TypeSelect
              value={topicType}
              handleChange={handleRadioChange}
              width={300}
              color="black"
              header="Type"
              values={CONSTANTS.TOPIC_TYPES_RADIO}
            />
          </div>

          <div style={{ alignSelf: "center", marginTop: 20, marginBottom: 20 }}>
            <TypeSelect
              value={topicType}
              handleChange={handleRadioChange}
              width={300}
              color="black"
              header="Type"
              values={CONSTANTS.TOPIC_TYPES_RADIO}
            />
          </div>
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
        minHeigth={560}
        loading={props.loading}
        tabData={tabs}
        confirmButtonDisabled={!isSubmitEnabled()}
        onConfirm={() => {
          onSubmit(topic, selectedCategories);
        }}
        onRefuse={props.onRefuse}
      />
    </>
  );
}
