/* utils for inserting, modifing, removing topics  */
import { AxiosError } from "axios";
import { getLinesFromText } from "../utils/utils";
import { Lang } from "@/interfaces/ui";
import { createTopic, updateTopic, deleteTopic } from "@/services/topic";
import {
  CategoryFeatured,
  DashLabel,
  TopicCreated,
  TopicFeatured,
  CategoryCreated,
  QuestionCreated,
} from "@toppick/common";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/services/category";
import { createQuestions } from "@/services/question";

export const onCategoryCreate = async (
  category: CategoryCreated,
  categories: CategoryFeatured[],
  currentLanguage: Lang,
  token: string,
  setCategories: (categories: CategoryFeatured[]) => void,
  onLoading: (val: boolean) => void,
  onSuccess: (val?: string) => void,
  onError: (val?: string) => void
): Promise<void> => {
  onLoading(true);
  try {
    const newCategory = await createCategory(category, currentLanguage, token);
    const newCategories = [...categories];
    newCategories.unshift({
      id: newCategory.id,
      slug: newCategory.slug,
      image: newCategory.image,
      title: newCategory.title,
      _count: {
        topic_categories: category.topics.length,
      },
    });
    setCategories(newCategories);
    onSuccess();
  } catch (error) {
    onError();
  }
  onLoading(false);
};

export const onCategoryUpdate = async (
  category: CategoryCreated,
  categories: CategoryFeatured[],
  currentLanguage: Lang,
  token: string,
  setCategories: (categories: CategoryFeatured[]) => void,
  onLoading: (val: boolean) => void,
  onSuccess: (val?: string) => void,
  onError: (val?: string) => void
) => {
  onLoading(true);
  try {
    const newCategory = await updateCategory(category, currentLanguage, token);
    const newCategories = [...categories];
    const updatedIndex = newCategories.findIndex(
      (cat) => cat.id === newCategory.id
    );
    newCategories[updatedIndex] = {
      _count: { topic_categories: category.topics.length },
      image: newCategory.image,
      slug: newCategory.slug,
      title: newCategory.title,
      id: newCategory.id,
    };

    setCategories(newCategories);
    onSuccess();
  } catch (error) {
    onError();
  }
  onLoading(false);
};

export const onCategoryDelete = async (
  id: number,
  categories: CategoryFeatured[],
  currentLanguage: Lang,
  token: string,
  setCategories: (categories: CategoryFeatured[]) => void,
  onLoading: (val: boolean) => void,
  onSuccess: (val?: string) => void,
  onError: (val?: string) => void
) => {
  onLoading(true);
  try {
    await deleteCategory(id, currentLanguage, token);
    const newCategories = categories.filter((categ) => categ.id !== id);
    setCategories([...newCategories]);
    onSuccess();
  } catch (error) {
    onError();
  }
  onLoading(false);
};

export const onTopicCreate = async (
  topic: TopicCreated,
  topics: TopicFeatured[],
  currentLanguage: Lang,
  token: string,
  setTopics: (topics: TopicFeatured[]) => void,
  onLoading: (val: boolean) => void,
  onSuccess: (val?: string) => void,
  onError: (val?: string) => void
): Promise<void> => {
  onLoading(true);
  try {
    const { id, active, description, image, level, timestamp, title, slug } =
      await createTopic(topic, currentLanguage, token);

    //update topic array
    topics.unshift({
      active: active!,
      description,
      id,
      timestamp,
      title,
      slug,
    });

    //push new updated arrays
    setTopics([...topics]);

    onLoading(false);
    onSuccess();
  } catch (error) {
    onError();
  }
};

export const onTopicUpdate = async (
  updatedTopic: TopicCreated,
  topics: TopicFeatured[],
  currentLanguage: Lang,
  token: string,
  setTopics: (topics: TopicFeatured[]) => void,
  onLoading: (val: boolean) => void,
  onSuccess: (val?: string) => void,
  onError: (val?: string) => void
): Promise<void> => {
  onLoading(true);
  try {
    const { id, active, description, image, level, timestamp, title, slug } =
      await updateTopic(updatedTopic, currentLanguage, token);

    const index = topics.findIndex((topic) => topic.id == updatedTopic.id);

    topics[index] = {
      id,
      active: active!,
      description,
      timestamp,
      title,
      slug,
    };
    setTopics([...topics]);
    onSuccess();
  } catch (error) {
    onError();
  }

  onLoading(false);
};

export const onTopicDelete = async (
  id: number,
  topics: TopicFeatured[],
  token: string,
  setTopics: (topics: TopicFeatured[]) => void,
  onLoading: (val: boolean) => void,
  onSuccess: (val?: string) => void,
  onError: (val?: string) => void
): Promise<void> => {
  onLoading(true);
  try {
    await deleteTopic(id, token);
    const newTopics = topics.filter((topic) => topic.id !== id);
    setTopics([...newTopics]);
    onLoading(false);
    onSuccess();
  } catch (error) {
    onError();
  }
};

export const onQuestionsAdd = async (
  questions: QuestionCreated[],
  topicId: number,
  currentLanguage: Lang,
  token: string,
  onLoading: (val: boolean) => void,
  onSuccess: (val?: string) => void,
  onError: (val?: string) => void
) => {
  onLoading(true);
  if (topicId < 0 || questions.length < 0) {
    onLoading(false);
    return onError();
  }
  try {
    await createQuestions(questions, topicId, currentLanguage, token);
    onSuccess();
  } catch (error) {
    const err = error as AxiosError;
    onError(err.response?.data);
  }
  onLoading(false);
};

export const generateQuestions = (
  text: string,
  topic: DashLabel,
  userId: string
): QuestionCreated[] => {
  const questionsStr = getLinesFromText(text);
  const questions: any[] = questionsStr.map((title, index) => ({
    timestamp: new Date(),
    title: title,
    examples: [],
    new: true,
    user_id: userId,
    resources: [],
  }));

  return questions;
};
