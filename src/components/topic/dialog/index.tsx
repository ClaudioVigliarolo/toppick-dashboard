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
  TopicInterest,
} from "@toppick/common";
import {
  getTopicDetails,
  getTopicLabels,
  getTopicsInterests,
} from "@/services/topic";
import { CONSTANTS } from "@/constants/app";
import { getCategoryLabels } from "@/services/category";

const NO_TOPIC: TopicDetail = {
  id: -1,
  source: CONSTANTS.TOPIC_SOURCES[0],
  title: "",
  description: "",
  image: "",
  level: TopicLevel.Medium,
  questionCounter: 0,
  related_topics_related_topics_source_idTotopics: [],
  topic_categories: [],
  topic_tags: [],
  timestamp: new Date(),
  active: false,
  topic_interests: [],
  featured: false,
  keywordsArticle: [],
  keywordsImage: [],
  keywordsVideo: [],
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
  const [interests, setInterests] = React.useState<TopicInterest[]>([]);
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
          const selectedTopics = await getTopicLabels({
            type: "topic",
            id: props.topic.id,
          });
          const selectedCategories = await getCategoryLabels({
            id: props.topic.id,
          });
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
        const allTopics = await getTopicLabels({
          type: "topic",
          take_all: true,
        });
        const allCategories = await getCategoryLabels({
          take_all: true,
        });
        const allInterests = await getTopicsInterests();
        setTopics(allTopics);
        setCategories(allCategories);
        setInterests(allInterests);
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
      featured: topic.featured!,
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
      topic_interests: topic.topic_interests.map((interest) => ({
        interest_id: interest.interest_id,
      })),
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

  const handleInterestsChange = (index: number) => {
    const newTopic = { ...topic };
    const selectedIndex = newTopic.topic_interests.findIndex(
      (selected) => interests[index].title === selected.interests.title
    );
    if (selectedIndex < 0) {
      //selected
      newTopic.topic_interests.push({
        interests: {
          title: interests[index].title as any,
        },
        interest_id: interests[index].id,
      });
    } else {
      //select
      newTopic.topic_interests.splice(selectedIndex, 1);
    }
    setTopic(newTopic);
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

  const handleFeaturedChange = (e: React.ChangeEvent<any>) => {
    setTopic({ ...topic, featured: e.target.value === "true" });
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
          handleInterestsChange={handleInterestsChange}
          level={topic.level}
          source={topic.source}
          tags={topic.topic_tags}
          interests={interests}
          selectedInterests={topic.topic_interests.map((interest, index) => ({
            id: index,
            title: interest.interests.title,
          }))}
          onTagAdd={onTopicTagAdd}
          onTagRemove={onTopicTagRemove}
          featured={topic.featured ? "true" : "false"}
          handleFeaturedChange={handleFeaturedChange}
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
