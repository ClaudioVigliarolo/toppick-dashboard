/* utils for inserting, modifing, removing topics  */
import { getLinesFromText } from "../utils/utils";
import { Lang } from "@/interfaces/app";
import {
  createTopic,
  updateTopic,
  deleteTopic,
  addQuestions,
  createCategory,
  deleteCategory,
  deleteQuestion,
  updateCategory,
} from "@/services/topics";
import {
  CategoryDetail,
  CategoryFeatured,
  DashLabel,
  TopicDetail,
  TopicCreated,
  TopicFeatured,
  CategoryCreated,
  QuestionCreated,
} from "@toppick/common";

export const onCategoryCreate = async (
  category: CategoryCreated,
  categories: CategoryFeatured[],
  currentLanguage: Lang,
  token: string,
  setCategories: (categories: CategoryFeatured[]) => void,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
): Promise<void> => {
  setLoading(true);
  try {
    const newCategory = await createCategory(category, currentLanguage, token);
    const newCategories = [...categories];
    newCategories.unshift({
      id: newCategory.id,
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
  setLoading(false);
};

export const onCategoryUpdate = async (
  category: CategoryCreated,
  categories: CategoryFeatured[],
  currentLanguage: Lang,
  token: string,
  setCategories: (categories: CategoryFeatured[]) => void,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
) => {
  setLoading(true);
  try {
    const newCategory = await updateCategory(category, currentLanguage, token);
    const newCategories = [...categories];
    const updatedIndex = newCategories.findIndex(
      (cat) => cat.id === newCategory.id
    );
    newCategories[updatedIndex] = {
      _count: { topic_categories: category.topics.length },
      image: newCategory.image,
      title: newCategory.title,
      id: newCategory.id,
    };

    setCategories(newCategories);
    onSuccess();
  } catch (error) {
    onError();
  }
  setLoading(false);
};

export const onCategoryDelete = async (
  id: number,
  categories: CategoryFeatured[],
  currentLanguage: Lang,
  token: string,
  setCategories: (categories: CategoryFeatured[]) => void,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
) => {
  setLoading(true);
  try {
    await deleteCategory(id, currentLanguage, token);
    const newCategories = categories.filter((categ) => categ.id !== id);
    setCategories([...newCategories]);
    onSuccess();
  } catch (error) {
    onError();
  }
  setLoading(false);
};

export const onTopicCreate = async (
  topic: TopicCreated,
  topics: TopicFeatured[],
  currentLanguage: Lang,
  token: string,
  setTopics: (topics: TopicFeatured[]) => void,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
): Promise<void> => {
  setLoading(true);
  try {
    const { id, active, description, image, level, timestamp, title } =
      await createTopic(topic, currentLanguage, token);

    //update topic array
    topics.unshift({
      active: active!,
      description,
      id,
      image,
      level,
      timestamp,
      title,
    });

    //push new updated arrays
    setTopics([...topics]);

    setLoading(false);
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
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
): Promise<void> => {
  setLoading(true);
  try {
    const { id, active, description, image, level, timestamp, title } =
      await updateTopic(updatedTopic, currentLanguage, token);

    const index = topics.findIndex((topic) => topic.id == updatedTopic.id);

    topics[index] = {
      id,
      active: active!,
      description,
      image,
      level,
      timestamp,
      title,
    };
    setTopics([...topics]);
    onSuccess();
  } catch (error) {
    onError();
  }

  setLoading(false);
};

export const onTopicDelete = async (
  id: number,
  topics: TopicFeatured[],
  currentLanguage: Lang,
  token: string,
  setTopics: (topics: TopicFeatured[]) => void,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
): Promise<void> => {
  setLoading(true);
  try {
    await deleteTopic(id, currentLanguage, token);
    const newTopics = topics.filter((topic) => topic.id !== id);
    setTopics([...newTopics]);
    setLoading(false);
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
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
) => {
  setLoading(true);
  if (topicId < 0 || questions.length < 0) {
    setLoading(false);
    return onError();
  }
  try {
    await addQuestions(questions, topicId, currentLanguage, token);
    onSuccess();
  } catch (error) {
    onError();
  }
  setLoading(false);
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
