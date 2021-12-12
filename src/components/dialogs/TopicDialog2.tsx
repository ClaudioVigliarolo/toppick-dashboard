import React from "react";
import { CustomDialog, TabData } from "./DialogsStyles2";
import Chip from "../select/ObjectChip";
import {
  CategoryTopic,
  MaterialUiColor,
  RadioButton,
  TopicRelated,
  Topic,
  TopicLevel,
  TopicType,
  UserApproved,
  Value,
} from "src/interfaces/Interfaces";
import { hasVal, isSelected } from "src/utils/utils";
import Select from "../select/SimpleSelect";
import TypeSelect from "../select/ObjectSelect";
import UserApprovedSection from "./components/UserApprovedSelector";
import { CONSTANTS, NO_IMAGE_URL } from "src/constants/constants";
import Switch from "../select/Switch";
import CustomButton from "../buttons/Button";
import { TextField } from "@material-ui/core";
interface TopicDialogProps {
  open: boolean;
  loading: boolean;
  onConfirm: (newTopic: Topic) => void;
  topic: Topic;
  onRefuse: () => void;
  categories: CategoryTopic[];
  headerText: string;
  related: Topic[];
  placeholderRelated?: string;
  titlePlaceholder?: string;
  placeholderCategories?: string;
}

const NO_TOPIC: Topic = {
  categories: [],
  id: -1,
  related: [],
  source: "",
  level: 0,
  type: 0,
  timestamp: new Date(),
  title: "",
  ref_id: -1,
  description: "",
  image: "",
  active: false,
  approved: false,
};

export default function TopicDialog(props: TopicDialogProps) {
  const [topic, setTopic] = React.useState<Topic>(NO_TOPIC);
  const [topicType, setTopicType] = React.useState<RadioButton>(
    CONSTANTS.TOPIC_TYPES_RADIO[0]
  );
  const [level, setLevel] = React.useState<string>(CONSTANTS.TOPIC_LEVELS[1]);
  const [related, setRelated] = React.useState<TopicRelated[]>([]);
  const [source, setSource] = React.useState<string>(
    CONSTANTS.TOPIC_SOURCES[0]
  );

  React.useEffect(() => {
    setTopic(props.topic);
    const newRelated = [...props.related];
    setRelated(
      newRelated
        .sort((a, b) => a.title.localeCompare(b.title))
        .filter((c) => c.title !== props.topic.title)
    );
    if (props.topic.type) {
      const topicType = CONSTANTS.TOPIC_TYPES_RADIO.find(
        (t) => t.value == props.topic.type
      );
      if (topicType) {
        setTopicType(topicType);
      }
    }

    hasVal(props.topic.level) &&
      setLevel(CONSTANTS.TOPIC_LEVELS[props.topic.level as TopicLevel]);
  }, [props.categories, props.topic, props.related]);

  const onSubmit = async () => {
    props.onConfirm({
      ...topic,
      level: CONSTANTS.TOPIC_LEVELS.indexOf(level),
      type: topicType.value,
    });
  };

  const handleCategoriesChange = (index: number) => {
    const newTopic = { ...topic };
    if (isSelected(topic.categories, props.categories[index])) {
      newTopic.categories = topic.categories.filter(
        (s) => s.title !== props.categories[index].title
      );
    } else {
      newTopic.categories = [...topic.categories, props.categories[index]];
    }
    setTopic(newTopic);
  };

  const handleRelatedChange = (index: number) => {
    const newTopic = { ...topic };
    if (isSelected(topic.related, props.related[index])) {
      newTopic.related = topic.related.filter(
        (s) => s.title !== props.related[index].title
      );
    } else {
      newTopic.related = [...topic.related, props.related[index]];
    }
    setTopic(newTopic);
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
    topic.title.length > 0 &&
    topic.image !== "" &&
    level.length > 0 &&
    topic.categories.length > 0;
  topic.related.length > 0;
  {
    console.log("myyyy", topic.users_approved);
  }
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
              handleChange={() => setTopic({ ...topic, active: !topic.active })}
              value={topic.active}
            />
          </div>

          <TextField
            placeholder={props.titlePlaceholder}
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label="Title"
            id="standard-helperText"
            value={topic.title}
            onChange={(e) =>
              setTopic({ ...topic, title: e.currentTarget.value })
            }
            style={{ width: 500, alignSelf: "center", marginTop: 10 }}
          />

          <TextField
            placeholder={props.titlePlaceholder}
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label="Description"
            id="outlined-multiline-flexible"
            multiline
            rows={3}
            value={topic.description}
            onChange={(e) =>
              setTopic({ ...topic, description: e.currentTarget.value })
            }
            style={{ width: 500, alignSelf: "center" }}
          />

          <img
            src={topic.image ? topic.image : NO_IMAGE_URL}
            alt="img"
            style={{ height: 200, alignSelf: "center", marginTop: 20 }}
          />
          <TextField
            placeholder="Paste the Image Url here"
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label="Link"
            id="standard-helperText"
            value={topic.image}
            onChange={(e) =>
              setTopic({ ...topic, image: e.currentTarget.value })
            }
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
            selectedValues={topic.categories}
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
            selectedValues={topic.related}
            values={props.related.sort((a, b) =>
              a.title.localeCompare(b.title)
            )}
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              alignItems: "center",
            }}
          >
            <div style={{ marginTop: 20 }}>
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
            <div style={{ marginTop: 20 }}>
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
            <div style={{ marginTop: 20, marginBottom: 20 }}>
              <TypeSelect
                value={topicType}
                handleChange={handleRadioChange}
                width={300}
                color="black"
                header="Type"
                values={CONSTANTS.TOPIC_TYPES_RADIO}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  position: "relative",
                }}
              >
                <UserApprovedSection
                  approved={topic.approved}
                  users={topic.users_approved ? topic.users_approved : []}
                  onToggle={() => {
                    setTopic({ ...topic, approved: !topic.approved });
                  }}
                />
              </div>
            </div>
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
        onConfirm={onSubmit}
        onRefuse={props.onRefuse}
      />
    </>
  );
}
