/* utils for inserting, modifing, removing topics  */
import {
  Category,
  Lang,
  Question,
  ReportHandled,
  Topic,
  ToTranslateTopic,
} from "../interfaces/Interfaces";
import {
  addCategory,
  addQuestions,
  addTopic,
  archiveToTranslateTopic,
  deleteCategoryMany,
  deleteCategoryUnique,
  deleteQuestion,
  deleteReport,
  deleteTopicMany,
  deleteTopicUnique,
  deleteToTranslateTopic,
  unarchiveToTranslateTopic,
  updateCategory,
  updateQuestions,
  updateTopic,
} from "../api/api";
import { getHash } from "../utils/utils";

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
  const val = await addCategory(newCategory, currentLanguage, token);
  const newCategories = categories;
  if (!val) {
    setLoading(false);
    onError();
    return;
  }
  newCategories.unshift(newCategory);
  setCategories([...newCategories]);
  setLoading(false);
  onSuccess();
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
  const val = await updateCategory(category, currentLanguage, token);
  if (!val) {
    setLoading(false);
    onError();
    return;
  }
  const newCategories = categories;
  newCategories.forEach(function (item: Category) {
    if (item.id == category.id) item.title = category.title;
  });
  setCategories([...newCategories]);
  setLoading(false);
  onSuccess();
};

export const onCategoryDeleteMany = async (
  ref_id: number,
  categories: Category[],
  currentLanguage: Lang,
  token: string,
  setCategories: (categories: Category[]) => void,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
) => {
  setLoading(true);
  const val = await deleteCategoryMany(ref_id, currentLanguage, token);
  if (!val) {
    setLoading(false);
    onError();
    return;
  }
  const newCategories = categories.filter(
    (categ: Category) => categ.ref_id !== ref_id
  );
  setCategories([...newCategories]);
  setLoading(false);
  onSuccess();
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
  const val = await deleteCategoryUnique(id, currentLanguage, token);
  if (!val) {
    setLoading(false);
    onError();
    return;
  }
  const newCategories = categories.filter((categ: Category) => categ.id !== id);
  setCategories([...newCategories]);
  setLoading(false);
  onSuccess();
};

export const onQuestionAdd = async (
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

  const val = await addQuestions([newQuestion], currentLanguage, token);
  const newQuestions = questions;

  if (!val) {
    setLoading(false);
    onError();
    return;
  }
  newQuestions.unshift(newQuestion);
  setQuestions([...newQuestions]);
  setLoading(false);
  onSuccess();
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
  setLoading(true);
  const val = await updateQuestions([question], currentLanguage, token);
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
  onSuccess();
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
  const val = await deleteQuestion(id, currentLanguage, token);
  if (!val) {
    setLoading(false);
    return onError();
  }
  const newQuestions = questions.filter((categ: Question) => categ.id != id);
  setQuestions([...newQuestions]);
  setLoading(false);
  onSuccess();
};

export const onTopicAdd = async (
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
  const val = await addTopic(newTopic, currentLanguage, token);
  if (!val) {
    setLoading(false);
    return onError();
  }
  //new topic added successfully, add locally
  const newTopics = topics;

  //update topic array
  newTopics.unshift(newTopic);

  //push new updated arrays
  setTopics([...newTopics]);

  setLoading(false);
  onSuccess();
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
  const val = await updateTopic(updatedTopic, currentLanguage, token);
  if (!val) {
    setLoading(false);
    return onError();
  }
  //new topic updated successfully, update locally
  const newTopics = topics;
  const topicIndex = topics.findIndex(
    (topic: Topic) => topic.id == updatedTopic.id
  );
  newTopics[topicIndex].title = updatedTopic.title;
  newTopics[topicIndex].timestamp = new Date();
  newTopics[topicIndex].categories = updatedTopic.categories;
  newTopics[topicIndex].related = updatedTopic.related;
  newTopics[topicIndex].level = updatedTopic.level;
  newTopics[topicIndex].type = updatedTopic.type;
  newTopics[topicIndex].source = updatedTopic.source;

  //push new updated arrays
  setTopics([...newTopics]);

  //newTopics.push({ title: topicTitle, id: categoryHash });
  setLoading(false);
  onSuccess();
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
  const val = await deleteTopicUnique(id, currentLanguage, token);
  if (!val) {
    setLoading(false);
    return onError();
  }
  const newTopics = topics.filter((topic: Topic) => topic.id !== id);
  setTopics([...newTopics]);
  setLoading(false);
  onSuccess();
};

export const onTopicDeleteMany = async (
  ref_id: number,
  topics: Topic[],
  currentLanguage: Lang,
  token: string,
  setTopics: (topics: Topic[]) => void,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
): Promise<void> => {
  setLoading(true);
  const val = await deleteTopicMany(ref_id, currentLanguage, token);
  if (!val) {
    setLoading(false);
    return onError();
  }
  const newTopics = topics.filter((topic: Topic) => topic.ref_id !== ref_id);
  setTopics([...newTopics]);
  setLoading(false);
  onSuccess();
};

export const onReportDelete = async (
  question_id: number,
  reports: ReportHandled[],
  setReports: (reports: ReportHandled[]) => void,
  currentLanguage: Lang,
  token: string,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
) => {
  setLoading(true);
  const val = await deleteReport(question_id, currentLanguage, token);

  if (!val) {
    setLoading(false);
    return onError();
  }
  //update locally
  const newReports = reports.filter(function (item: ReportHandled) {
    return item.question_id !== question_id;
  });

  setReports([...newReports]);
  setLoading(false);
  onSuccess();
};

export const onQuestionsUpdate = async (
  questionsArray: string[],
  selectedTopic: Topic,
  currentLanguage: Lang,
  token: string,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
) => {
  setLoading(true);
  if (!selectedTopic || questionsArray.length < 0) {
    setLoading(false);
    return onError();
  }

  const newQuestions: Question[] = questionsArray.map(
    (questionTitle: string, index: number) => ({
      id: getHash(questionTitle + "*" + selectedTopic.title + "*" + index),
      timestamp: new Date(),
      title: questionTitle,
      topic: {
        id: selectedTopic.id,
        title: selectedTopic.title,
      },
    })
  );
  const val = await updateQuestions(newQuestions, currentLanguage, token);
  if (!val) {
    setLoading(false);
    return onError();
  }
  setLoading(false);
  onSuccess();
};

export const onQuestionsAdd = async (
  questionsArray: string[],
  selectedTopic: Topic,
  currentLanguage: Lang,
  token: string,
  setLoading: (val: boolean) => void,
  onSuccess: () => void,
  onError: () => void
) => {
  setLoading(true);
  if (!selectedTopic || questionsArray.length < 0) {
    setLoading(false);
    return onError();
  }

  const newQuestions: Question[] = questionsArray.map(
    (questionTitle: string, index: number) => ({
      id: getHash(questionTitle + "*" + selectedTopic.title + "*" + index),
      timestamp: new Date(),
      title: questionTitle,
      topic: {
        id: selectedTopic.id,
        title: selectedTopic.title,
      },
    })
  );
  const val = await addQuestions(newQuestions, currentLanguage, token);
  if (!val) {
    setLoading(false);
    return onError();
  }
  setLoading(false);
  onSuccess();
};

export const ondeleteToTranslateTopic = async (
  id: number,
  toTranslateTopics: ToTranslateTopic[],
  setToTranslateTopics: (toTranslateTopics: ToTranslateTopic[]) => void,
  lang: Lang,
  token: string
) => {
  const val = await deleteToTranslateTopic(id, lang, token);

  if (!val) {
    //unnecessary further error handling
    return;
  }
  //update locally
  const newToTranslateTopics = toTranslateTopics.filter(function (
    item: ToTranslateTopic
  ) {
    return item.id !== id;
  });

  setToTranslateTopics([...newToTranslateTopics]);
};

export const onaAchiveToTranslateTopic = async (
  id: number,
  toTranslateTopics: ToTranslateTopic[],
  setToTranslateTopics: (toTranslateTopics: ToTranslateTopic[]) => void,
  lang: Lang,
  token: string
) => {
  const val = await archiveToTranslateTopic(id, lang, token);
  if (!val) {
    //unnecessary further error handling
    return;
  }
  console.log("muvallll", val);
  console.log(toTranslateTopics);
  //update locally
  const newToTranslateTopics = toTranslateTopics.filter(function (
    item: ToTranslateTopic
  ) {
    return item.id !== id;
  });

  setToTranslateTopics([...newToTranslateTopics]);
};

export const onUnarchiveToTranslateTopic = async (
  id: number,
  toTranslateTopics: ToTranslateTopic[],
  setToTranslateTopics: (toTranslateTopics: ToTranslateTopic[]) => void,
  lang: Lang,
  token: string
) => {
  const val = await unarchiveToTranslateTopic(id, lang, token);
  if (!val) {
    //unnecessary further error handling
    return;
  }
  //update locally
  const newToTranslateTopics = toTranslateTopics.filter(function (
    item: ToTranslateTopic
  ) {
    return item.id !== id;
  });

  setToTranslateTopics([...newToTranslateTopics]);
};
