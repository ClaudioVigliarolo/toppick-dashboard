import React from "react";
import { isSelected } from "@/utils/utils";
import { CustomDialog, TabData } from "@/components/ui/dialog/DialogStyles";
import Related from "./sections/Related";
import Overview from "./sections/Overview";
import { Category, CategoryTopic } from "@/interfaces/dash_topics";

interface CategoryDialogProps {
  open: boolean;
  loading: boolean;
  onConfirm: (category: Category) => void;
  onRefuse: () => void;
  categoryTopics: CategoryTopic[];
  headerText: string;
  category: Category;
}

const NO_CATEGORY: Category = {
  id: -1,
  ref_id: -1,
  title: "",
  categoryTopics: [],
  description: "",
  image: "",
};

export default function CategoryDialog(props: CategoryDialogProps) {
  const [category, setCategory] = React.useState<Category>(NO_CATEGORY);
  React.useEffect(() => {
    setCategory(props.category);
  }, [props.category]);

  const onConfirm = async () => {
    props.onConfirm(category);
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
    category.categoryTopics.length > 0;

  const handleCategoriesChange = (index: number) => {
    const newCategory = { ...category };
    if (isSelected(category.categoryTopics, props.categoryTopics[index])) {
      newCategory.categoryTopics = category.categoryTopics.filter(
        (s) => s.title !== props.categoryTopics[index].title
      );
    } else {
      newCategory.categoryTopics = [
        ...newCategory.categoryTopics,
        props.categoryTopics[index],
      ];
    }
    setCategory(newCategory);
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
          selectedCategoryTopics={category.categoryTopics}
          handleCategoriesChange={handleCategoriesChange}
          categoryTopics={props.categoryTopics}
        />
      ),
    },
  ];

  return (
    <>
      <CustomDialog
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
