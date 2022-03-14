/* utils for inserting, modifing, removing topics  */
import { getLinesFromText, getQuestionHash } from "../utils/utils";
import {
  Category,
  CreatedQuestion,
  Question,
  Topic,
} from "../interfaces/dash_topics";
import { Lang } from "@/interfaces/app";
import {
  addTopic,
  updateTopic,
  deleteTopic,
  addQuestions,
  createCategory,
  deleteCategory,
  deleteQuestion,
  updateCategory,
} from "@/services/topics";

export const onCategoryAdd = async (
  newCategory: Category,
  categories: Category[],
  currentLanguage: Lang,
  token: string,
  setCategories: (categories: Category[]) => void,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
): Promise<void> => {
  setLoading(true);
  try {
    await createCategory(newCategory, currentLanguage, token);
    const newCategories = categories;

    newCategories.unshift(newCategory);
    setCategories([...newCategories]);
    onSuccess();
  } catch (error) {
    onError();
  }
  setLoading(false);
};

export const onCategoryUpdate = async (
  category: Category,
  categories: Category[],
  currentLanguage: Lang,
  token: string,
  setCategories: (categories: Category[]) => void,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
) => {
  setLoading(true);
  try {
    await updateCategory(category, currentLanguage, token);
    const newCategories = categories;
    newCategories.forEach(function (item: Category) {
      if (item.id == category.id) {
        item.title = category.title;
        item.description = category.description;
        item.image = category.image;
      }
    });
    setCategories([...newCategories]);
    onSuccess();
  } catch (error) {
    onError();
  }
  setLoading(false);
};

export const onCategoryDeleteUnique = async (
  id: number,
  categories: Category[],
  currentLanguage: Lang,
  token: string,
  setCategories: (categories: Category[]) => void,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
) => {
  setLoading(true);
  try {
    await deleteCategory(id, currentLanguage, token);

    const newCategories = categories.filter(
      (categ: Category) => categ.id !== id
    );
    setCategories([...newCategories]);
    onSuccess();
  } catch (error) {
    onError();
  }
  setLoading(false);
};

export const onQuestionCreate = async (
  topicId: number,
  newQuestion: Question,
  questions: Question[],
  currentLanguage: Lang,
  token: string,
  setQuestions: (categories: Question[]) => void,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
) => {
  setLoading(true);
  try {
    await addQuestions([newQuestion], topicId, currentLanguage, token);
    const newQuestions = questions;

    newQuestions.unshift(newQuestion);
    setQuestions([...newQuestions]);
    setLoading(false);
    onSuccess();
  } catch (error) {
    onError();
  }
  setLoading(false);
};

export const onQuestionUpdate = async (
  question: Question,
  questions: Question[],
  currentLanguage: Lang,
  token: string,
  setQuestions: (categories: Question[]) => void,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
) => {
  /*setLoading(true);
  const val = await addQuestions(questions, currentLanguage, token);
  if (!val) {
    setLoading(false);
    return onError();
  }
  const newQuestions = questions;
  newQuestions.forEach(function (item: Question) {
    if (item.id == question.id) {
      item.title = question.title;
      item.topic.title = question.topic.title;
      item.topic.id = question.topic.id;
      item.timestamp = new Date();
    }
  });
  setQuestions([...newQuestions]);
  setLoading(false);
  onSuccess();*/
};

export const onQuestionDelete = async (
  id: number,
  questions: Question[],
  currentLanguage: Lang,
  token: string,
  setQuestions: (categories: Question[]) => void,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
): Promise<void> => {
  setLoading(true);
  try {
    await deleteQuestion(id, currentLanguage, token);

    const newQuestions = questions.filter((categ: Question) => categ.id != id);
    setQuestions([...newQuestions]);
    onSuccess();
  } catch (error) {
    onError();
  }
  setLoading(false);
};

export const onTopicCreate = async (
  newTopic: Topic,
  topics: Topic[],
  currentLanguage: Lang,
  token: string,
  setTopics: (topics: Topic[]) => void,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
): Promise<void> => {
  setLoading(true);
  try {
    await addTopic(newTopic, currentLanguage, token);

    //new topic added successfully, add locally
    const newTopics = topics;

    //update topic array
    newTopics.unshift(newTopic);

    //push new updated arrays
    setTopics([...newTopics]);

    setLoading(false);
    onSuccess();
  } catch (error) {
    onError();
  }
};

export const getCategoriesFromTitles = (
  categories: Category[],
  selectedCategoriesTitles: string[]
) => {
  const updatedCategories: Category[] = [];
  selectedCategoriesTitles.forEach((title: string) => {
    const category = categories.find((x) => x.title === title);
    if (category) {
      updatedCategories.push({
        id: category.id,
        title: category.title,
        ref_id: category.ref_id,
        categoryTopics: category.categoryTopics,
        description: category.description,
        image: category.image,
      });
    }
  });
  return updatedCategories;
};

export const onTopicUpdate = async (
  updatedTopic: Topic,
  topics: Topic[],
  currentLanguage: Lang,
  token: string,
  setTopics: (topics: Topic[]) => void,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
): Promise<void> => {
  setLoading(true);
  try {
    await updateTopic(updatedTopic, currentLanguage, token);
    //new topic updated successfully, update locally
    const newTopics = topics;

    const topicIndex = topics.findIndex(
      (topic: Topic) => topic.id == updatedTopic.id
    );

    if (topicIndex !== -1) {
      topics[topicIndex] = updatedTopic;
    }
    onSuccess();

    //push new updated arrays
    setTopics([...newTopics]);
  } catch (error) {
    onError();
  }

  setLoading(false);
};

export const onTopicDeleteUnique = async (
  id: number,
  topics: Topic[],
  currentLanguage: Lang,
  token: string,
  setTopics: (topics: Topic[]) => void,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
): Promise<void> => {
  setLoading(true);
  try {
    await deleteTopic(id, currentLanguage, token);
    const newTopics = topics.filter((topic: Topic) => topic.id !== id);
    setTopics([...newTopics]);
    setLoading(false);
    onSuccess();
  } catch (error) {
    onError();
  }
};

export const onQuestionsAdd = async (
  questions: CreatedQuestion[],
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
  topic: Topic,
  userId: string
): Question[] => {
  const questionsStr = getLinesFromText(text);
  const questions: Question[] = questionsStr.map((title, index) => ({
    id: getQuestionHash(title, topic.title, index),
    timestamp: new Date(),
    title: title,
    examples: [],
    ext_resources: [],
    new: true,
    user_id: userId,
  }));

  return questions;
};
