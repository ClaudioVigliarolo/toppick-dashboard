import React from "react";
import { AppDialog, TabData } from "@/components/ui/dialog/DialogStyles";
import { hasVal, isSelected } from "@/utils/utils";

import Info from "./sections/Info";
import Related from "./sections/Related";
import Overview from "./sections/Overview";
import { CONSTANTS } from "@/constants/app";
import { Topic, CategoryTopic, TopicLevel } from "@/interfaces/dash_topics";

const NO_TOPIC: Topic = {
  categories: [],
  id: -1,
  related: [],
  source: "",
  level: 0,

  timestamp: new Date(),
  title: "",
  ref_id: -1,
  description: "",
  image: "",
  active: false,
  tags: [],
};

interface TopicDialogProps {
  open: boolean;
  loading: boolean;
  onConfirm: (newTopic: Topic) => void;
  topic: Topic;
  onRefuse: () => void;
  categories: CategoryTopic[];
  headerText: string;
  related: Topic[];
  titlePlaceholder?: string;
  descriptionPlaceholder?: string;
}

export default function TopicDialog(props: TopicDialogProps) {
  const [topic, setTopic] = React.useState<Topic>(NO_TOPIC);
  const [level, setLevel] = React.useState<string>(CONSTANTS.TOPIC_LEVELS[1]);
  const [source, setSource] = React.useState<string>(
    CONSTANTS.TOPIC_SOURCES[0]
  );

  React.useEffect(() => {
    setTopic(props.topic);
    hasVal(props.topic.level) &&
      setLevel(CONSTANTS.TOPIC_LEVELS[props.topic.level as TopicLevel]);
  }, [props.categories, props.topic, props.related]);

  const onConfirm = async () => {
    props.onConfirm({
      ...topic,
      level: CONSTANTS.TOPIC_LEVELS.indexOf(level),
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

  const handleSourceChange = (e: React.ChangeEvent<any>) => {
    setSource(e.target.value);
  };

  const handleLevelChange = (e: React.ChangeEvent<any>) => {
    setLevel(e.target.value);
  };

  const setDescription = (e: React.ChangeEvent<any>) => {
    setTopic({ ...topic, description: e.currentTarget.value });
  };

  const setTitle = (e: React.ChangeEvent<any>) => {
    setTopic({ ...topic, title: e.currentTarget.value });
  };

  const setImage = (e: React.ChangeEvent<any>) => {
    setTopic({ ...topic, image: e.currentTarget.value });
  };

  const toggleActive = () => {
    setTopic({ ...topic, active: !topic.active });
  };

  const onTagRemove = (i: number) => {
    const newTopic = { ...topic };
    newTopic.tags.splice(i, 1);
    setTopic(newTopic);
  };

  const onTagAdd = (tag: string) => {
    const newTags = topic.tags.filter((t) => t.title !== tag);
    newTags.push({
      title: tag,
    });
    setTopic({ ...topic, tags: newTags });
  };

  const isSubmitEnabled = (): boolean =>
    topic.title != "" &&
    topic.image !== "" &&
    level !== "" &&
    topic.categories.length > 0 &&
    topic.tags.length > 0 &&
    topic.related.length > 0;

  const tabs: TabData[] = [
    {
      label: "Overview",
      children: (
        <Overview
          active={topic.active}
          description={topic.description}
          image={topic.image}
          setDescription={setDescription}
          setImage={setImage}
          setTitle={setTitle}
          title={topic.title}
          titlePlaceholder={props.titlePlaceholder}
          descriptionPlaceholder={props.descriptionPlaceholder}
          toggleActive={toggleActive}
        />
      ),
    },
    {
      label: "Related",
      children: (
        <Related
          categories={props.categories}
          topics={props.related}
          selectedCategories={topic.categories}
          selectedTopics={topic.related}
          handleRelatedChange={handleRelatedChange}
          handleCategoriesChange={handleCategoriesChange}
        />
      ),
    },

    {
      label: "Info",
      children: (
        <Info
          handleLevelChange={handleLevelChange}
          handleSourceChange={handleSourceChange}
          level={level}
          source={source}
          tags={topic.tags}
          onTagAdd={onTagAdd}
          onTagRemove={onTagRemove}
        />
      ),
    },
  ];

  return (
    <>
      <AppDialog
        open={props.open}
        headerText={props.headerText}
        minWidth={600}
        minHeight={560}
        loading={props.loading}
        tabData={tabs}
        confirmButtonDisabled={!isSubmitEnabled()}
        onConfirm={onConfirm}
        onRefuse={props.onRefuse}
      />
    </>
  );
}
