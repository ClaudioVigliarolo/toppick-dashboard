import React from "react";
import { AppDialog, TabData } from "@/components/ui/dialog/DialogStyles";
import Info from "./sections/Info";
import Related from "./sections/Related";
import Overview from "./sections/Overview";
import {
  TopicFeatured,
  TopicDetail,
  DashLabel,
  TopicLevel,
  TopicCreated,
} from "@toppick/common";
import {
  getCategoriesLabels,
  getTopicDetails,
  getTopicsLabels,
} from "@/services/topics";
import { CONSTANTS } from "@/constants/app";

const NO_TOPIC: TopicDetail = {
  id: -1,
  source: CONSTANTS.TOPIC_SOURCES[0],
  title: "",
  description: "",
  image: "",
  articleCounter: 0,
  imageCounter: 0,
  level: TopicLevel.MEDIUM,
  questionCounter: 0,
  related_topics_related_topics_source_idTotopics: [],
  topic_categories: [],
  topic_tags: [],
  timestamp: new Date(),
  videoCounter: 0,
  active: false,
};

interface TopicDialogProps {
  open: boolean;
  loading: boolean;
  onConfirm: (newTopic: TopicCreated) => void;
  topic: TopicFeatured | null;
  onRefuse: () => void;
  headerText: string;
  titlePlaceholder?: string;
  descriptionPlaceholder?: string;
}

export default function TopicDialog(props: TopicDialogProps) {
  const [topic, setTopic] = React.useState<TopicDetail>(NO_TOPIC);
  const [topics, setTopics] = React.useState<DashLabel[]>([]);
  const [categories, setCategories] = React.useState<DashLabel[]>([]);
  const [selectedTopics, setSelectedTopics] = React.useState<DashLabel[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<
    DashLabel[]
  >([]);

  React.useEffect(() => {
    (async () => {
      try {
        if (props.topic) {
          const topicDetail = await getTopicDetails(props.topic.title);
          setTopic(topicDetail);
          //get preselected
          const selectedTopics = await getTopicsLabels(props.topic.id, "topic");
          const selectedCategories = await getCategoriesLabels(props.topic.id);
          setSelectedTopics(selectedTopics);
          setSelectedCategories(selectedCategories);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [props.topic]);

  React.useEffect(() => {
    (async () => {
      try {
        const allTopics = await getTopicsLabels("all");
        const allCategories = await getCategoriesLabels("all");
        setTopics(allTopics);
        setCategories(allCategories);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const onConfirm = async () => {
    const newTopic: TopicCreated = {
      description: topic.description,
      image: topic.image,
      title: topic.title,
      active: topic.active!,
      level: topic.level,
      source: topic.source,
      topic_tags: topic.topic_tags,
      id: topic.id,
      categories: selectedCategories.map((category) => ({
        category_id: category.id,
      })),
      topics: selectedTopics.map((topic) => ({
        dest_id: topic.id,
      })),
      topic_search_keywords: [],
    };

    props.onConfirm(newTopic);

    //reset state
    setSelectedTopics([]);
    setSelectedCategories([]);
    setTopic(NO_TOPIC);
  };

  const handleCategoriesChange = (index: number) => {
    const newSelectedCategories = [...selectedCategories];
    const selectedIndex = selectedCategories.findIndex(
      (selected) => categories[index].id === selected.id
    );
    if (selectedIndex < 0) {
      //selected
      newSelectedCategories.push(categories[index]);
    } else {
      //select
      newSelectedCategories.splice(selectedIndex, 1);
    }
    setSelectedCategories(newSelectedCategories);
  };

  const handleTopicsChange = (index: number) => {
    const newSelectedTopics = [...selectedTopics];
    const selectedIndex = selectedTopics.findIndex(
      (selected) => topics[index].id === selected.id
    );
    if (selectedIndex < 0) {
      //selected
      newSelectedTopics.push(topics[index]);
    } else {
      //select
      newSelectedTopics.splice(selectedIndex, 1);
    }
    setSelectedTopics(newSelectedTopics);
  };

  const handleSourceChange = (e: React.ChangeEvent<any>) => {
    setTopic({ ...topic, source: e.target.value });
  };

  const handleLevelChange = (e: React.ChangeEvent<any>) => {
    setTopic({ ...topic, level: e.target.value });
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

  const onTopicTagRemove = (i: number) => {
    const newTopic = { ...topic };
    newTopic.topic_tags.splice(i, 1);
    setTopic(newTopic);
  };

  const onTopicTagAdd = (tag: string) => {
    const newTags = topic.topic_tags.filter((t) => t.title !== tag);
    newTags.push({
      title: tag,
    });
    setTopic({ ...topic, topic_tags: newTags });
  };

  const isSubmitEnabled = (): boolean =>
    topic.title != "" &&
    topic.image !== "" &&
    topic.topic_tags.length > 0 &&
    selectedTopics.length > 0 &&
    selectedCategories.length > 0;

  const tabs: TabData[] = [
    {
      label: "Overview",
      children: (
        <Overview
          active={topic.active!}
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
          categories={categories}
          topics={topics}
          selectedCategories={selectedCategories}
          selectedTopics={selectedTopics}
          handleTopicsChange={handleTopicsChange}
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
          level={topic.level}
          source={topic.source}
          tags={topic.topic_tags}
          onTagAdd={onTopicTagAdd}
          onTagRemove={onTopicTagRemove}
        />
      ),
    },
  ];
  return (
    <>
      <AppDialog
        open={props.open}
        headerText={props.headerText}
        minWidth={300}
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
