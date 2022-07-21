import React from "react";
import { AppDialog, TabData } from "@/components/ui/dialog/DialogStyles";
import Info from "./sections/Info";
import Related from "./sections/Related";
import Overview from "./sections/Overview";
import {
  TopicFeatured,
  TopicDetail,
  TopicLevel,
  TopicCreated,
  TopicInterest,
  CategoryFeatured,
} from "@toppick/common/build/interfaces";
import { getTopicDetails, getTopicsInterests } from "@toppick/common/build/api";
import { CONSTANTS } from "@/constants/app";
import { getCategories } from "@toppick/common/build/api";
import { getTopics } from "@toppick/common/build/api";

const DEFAULT_TOPIC: TopicDetail = {
  id: -1,
  source: CONSTANTS.TOPIC_SOURCES[0],
  title: "",
  description: "",
  slug: "",
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
  error: string;
  onSubmit: (newTopic: TopicCreated) => void;
  topic: TopicFeatured | null;
  onRefuse: () => void;
  headerText: string;
  titlePlaceholder?: string;
  descriptionPlaceholder?: string;
}

export default function TopicDialog({
  error,
  headerText,
  loading,
  onSubmit,
  onRefuse,
  open,
  topic,
  descriptionPlaceholder,
  titlePlaceholder,
}: TopicDialogProps) {
  const [currentTopic, setCurrentTopic] =
    React.useState<TopicDetail>(DEFAULT_TOPIC);
  const [topics, setCurrentTopics] = React.useState<TopicFeatured[]>([]);
  const [interests, setInterests] = React.useState<TopicInterest[]>([]);
  const [categories, setCategories] = React.useState<CategoryFeatured[]>([]);
  const [selectedTopics, setSelectedTopics] = React.useState<TopicFeatured[]>(
    []
  );
  const [selectedCategories, setSelectedCategories] = React.useState<
    CategoryFeatured[]
  >([]);

  React.useEffect(() => {
    (async () => {
      try {
        if (topic) {
          const topicDetail = await getTopicDetails({
            id: topic.id,
            include_interests: true,
          });
          setCurrentTopic(topicDetail);
          //get preselected
          const selectedTopics = await getTopics({
            topic_id: topic.id,
          });
          const selectedCategories = await getCategories({
            topic_id: topic.id,
          });
          setSelectedTopics(selectedTopics);
          setSelectedCategories(selectedCategories);
        } else {
          setCurrentTopic(DEFAULT_TOPIC);
          setSelectedCategories([]);
          setSelectedTopics([]);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [topic]);

  React.useEffect(() => {
    (async () => {
      try {
        const allTopics = await getTopics({
          sort_by_title: true,
        });
        const allCategories = await getCategories({
          sort_by_title: true,
        });
        const allInterests = await getTopicsInterests();

        setCurrentTopics(allTopics);
        setCategories(allCategories);
        setInterests(allInterests);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const onConfirm = async () => {
    const newTopic: TopicCreated = {
      description: currentTopic.description,
      image: currentTopic.image,
      title: currentTopic.title,
      slug: currentTopic.slug,
      active: currentTopic.active!,
      featured: currentTopic.featured!,
      level: currentTopic.level,
      source: currentTopic.source,
      topic_tags: currentTopic.topic_tags,
      id: currentTopic.id,
      categories: selectedCategories.map((category) => ({
        category_id: category.id,
      })),
      topics: selectedTopics.map((currentTopic) => ({
        dest_id: currentTopic.id,
      })),
      topic_interests: currentTopic.topic_interests!.map((interest) => ({
        interest_id: interest.interest_id,
      })),
    };
    onSubmit(newTopic);
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
    const newTopic = { ...currentTopic };
    const selectedIndex = newTopic.topic_interests!.findIndex(
      (selected) => interests[index].title === selected.interests.title
    );
    if (selectedIndex < 0) {
      //selected
      newTopic.topic_interests!.push({
        interests: {
          title: interests[index].title as any,
        },
        interest_id: interests[index].id,
      });
    } else {
      //select
      newTopic.topic_interests!.splice(selectedIndex, 1);
    }
    setCurrentTopic(newTopic);
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
    setCurrentTopic({ ...currentTopic, featured: e.target.value === "true" });
  };

  const handleSourceChange = (e: React.ChangeEvent<any>) => {
    setCurrentTopic({ ...currentTopic, source: e.target.value });
  };

  const handleLevelChange = (e: React.ChangeEvent<any>) => {
    setCurrentTopic({ ...currentTopic, level: e.target.value });
  };

  const setDescription = (e: React.ChangeEvent<any>) => {
    setCurrentTopic({ ...currentTopic, description: e.currentTarget.value });
  };

  const setTitle = (e: React.ChangeEvent<any>) => {
    setCurrentTopic({ ...currentTopic, title: e.currentTarget.value });
  };

  const setSlug = (e: React.ChangeEvent<any>) => {
    setCurrentTopic({ ...currentTopic, slug: e.currentTarget.value });
  };

  const setImage = (e: React.ChangeEvent<any>) => {
    setCurrentTopic({ ...currentTopic, image: e.currentTarget.value });
  };

  const toggleActive = () => {
    setCurrentTopic({ ...currentTopic, active: !currentTopic.active });
  };

  const onTopicTagRemove = (i: number) => {
    const newTopic = { ...currentTopic };
    newTopic.topic_tags.splice(i, 1);
    setCurrentTopic(newTopic);
  };

  const onTopicTagAdd = (tag: string) => {
    const newTags = currentTopic.topic_tags.filter((t) => t.title !== tag);
    newTags.push({
      title: tag,
    });
    setCurrentTopic({ ...currentTopic, topic_tags: newTags });
  };

  const isShowSubmit = (): boolean =>
    currentTopic.title != "" &&
    currentTopic.image !== "" &&
    currentTopic.topic_tags.length > 0 &&
    selectedTopics.length > 0 &&
    selectedCategories.length > 0;

  const tabs: TabData[] = [
    {
      label: "Overview",
      children: (
        <Overview
          active={currentTopic.active!}
          description={currentTopic.description}
          image={currentTopic.image}
          setDescription={setDescription}
          setImage={setImage}
          setTitle={setTitle}
          setSlug={setSlug}
          title={currentTopic.title}
          slug={currentTopic.slug}
          titlePlaceholder={titlePlaceholder}
          descriptionPlaceholder={descriptionPlaceholder}
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
          level={currentTopic.level}
          source={currentTopic.source}
          tags={currentTopic.topic_tags}
          interests={interests}
          selectedInterests={currentTopic.topic_interests!.map(
            (interest, index) => ({
              id: index,
              title: interest.interests.title,
            })
          )}
          onTagAdd={onTopicTagAdd}
          onTagRemove={onTopicTagRemove}
          featured={currentTopic.featured ? "true" : "false"}
          handleFeaturedChange={handleFeaturedChange}
        />
      ),
    },
  ];
  return (
    <>
      <AppDialog
        open={open}
        headerText={headerText}
        minWidth={300}
        minHeight={560}
        loading={loading}
        tabData={tabs}
        error={error}
        confirmButtonDisabled={!isShowSubmit()}
        onConfirm={onConfirm}
        onRefuse={onRefuse}
      />
    </>
  );
}
