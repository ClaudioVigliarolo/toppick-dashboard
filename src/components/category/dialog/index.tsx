import React from "react";
import { AppDialog, TabData } from "@/components/ui/dialog/DialogStyles";
import Related from "./sections/Related";
import Overview from "./sections/Overview";
import {
  CategoryDetail,
  CategoryFeatured,
  Lang,
  DashLabel,
  CategoryCreated,
} from "@toppick/common";
import { getTopicLabels } from "@/services/topic";
import { getCategoryDetails } from "@/services/category";

interface CategoryDialogProps {
  open: boolean;
  loading: boolean;
  onConfirm: (category: CategoryCreated) => void;
  onRefuse: () => void;
  headerText: string;
  category: CategoryFeatured | null;
}

const NO_CATEGORY: CategoryDetail = {
  id: -1,
  title: "",
  description: "",
  image: "",
  topicCounter: 0,
};

export default function CategoryDialog(props: CategoryDialogProps) {
  const [category, setCategory] = React.useState<CategoryDetail>(NO_CATEGORY);
  const [topics, setTopics] = React.useState<DashLabel[]>([]);
  const [selectedTopics, setSelectedTopics] = React.useState<DashLabel[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        if (props.category) {
          const categoryDetail = await getCategoryDetails(props.category.title);
          setCategory(categoryDetail);
          const selectedTopics = await getTopicLabels({
            type: "category",
            id: props.category.id,
          });
          setSelectedTopics(selectedTopics);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [props.category]);

  React.useEffect(() => {
    (async () => {
      try {
        const allTopics = await getTopicLabels({
          type: "topics",
          take_all: true,
        });
        setTopics(allTopics);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const onConfirm = async () => {
    const newCategory: CategoryCreated = {
      id: category.id,
      description: category.description,
      image: category.image,
      title: category.title,
      topics: selectedTopics.map((topic) => ({
        lang: Lang.EN,
        topic_id: topic.id,
      })),
    };
    props.onConfirm(newCategory);

    //reset state
    setSelectedTopics([]);
    setCategory(NO_CATEGORY);
  };

  const setDescription = (e: React.ChangeEvent<any>) => {
    setCategory({ ...category, description: e.currentTarget.value });
  };

  const setTitle = (e: React.ChangeEvent<any>) => {
    setCategory({ ...category, title: e.currentTarget.value });
  };

  const setImage = (e: React.ChangeEvent<any>) => {
    setCategory({ ...category, image: e.currentTarget.value });
  };

  const isSubmitEnabled = (): boolean =>
    category.description != "" &&
    category.image != "" &&
    selectedTopics.length > 0;

  const handleCategoriesChange = (index: number) => {
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

  const tabs: TabData[] = [
    {
      label: "Overview",
      children: (
        <Overview
          description={category.description}
          image={category.image}
          title={category.title}
          setDescription={setDescription}
          setImage={setImage}
          setTitle={setTitle}
        />
      ),
    },
    {
      label: "Related",
      children: (
        <Related
          selectedTopics={selectedTopics}
          handleCategoriesChange={handleCategoriesChange}
          topics={topics}
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
        minHeight={600}
        onConfirm={onConfirm}
        onRefuse={props.onRefuse}
        loading={props.loading}
        tabData={tabs}
        confirmButtonDisabled={!isSubmitEnabled()}
      />
    </>
  );
}
