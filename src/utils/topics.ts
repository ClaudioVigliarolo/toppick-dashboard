/* utils for inserting, modifing, removing topics  */

import {
  Category,
  Question,
  Related,
  Report,
  ReportHandled,
  Topic,
} from "../interfaces/Interfaces";
import {
  addCategory,
  addQuestion,
  addQuestions,
  addTopic,
  deleteCategory,
  deleteQuestion,
  deleteReport,
  deleteTopic,
  updateCategory,
  updateQuestion,
  updateTopic,
} from "../api/api";
import { getCurrentTime, getHash } from "../utils/utils";
import { CONSTANTS } from "../constants/constants";

export const onCategoryAdd = async (
  newCategory: Category,
  categories: Category[],
  currentLanguage: string,
  token: string,
  setCategories: (categories: Category[]) => void,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
): Promise<void> => {
  setLoading(true);
  const val = await addCategory(newCategory, currentLanguage, token);
  const newCategories = categories;
  if (!val) {
    setLoading(false);
    setError(true);
    setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
    return;
  }
  newCategories.unshift(newCategory);
  setSuccess(true);
  setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);

  setCategories([...newCategories]);
  setLoading(false);
};

export const onCategoryUpdate = async (
  category: Category,
  categories: Category[],
  currentLanguage: string,
  token: string,
  setCategories: (categories: Category[]) => void,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
) => {
  setLoading(true);
  const val = await updateCategory(category, currentLanguage, token);
  if (!val) {
    setLoading(false);
    setError(true);
    setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
    return;
  }
  const newCategories = categories;
  newCategories.forEach(function (item: Category) {
    if (item.id == category.id) item.title = category.title;
  });
  setSuccess(true);
  setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  setCategories([...newCategories]);
  setLoading(false);
};

export const onCategoryDelete = async (
  id: number,
  categories: Category[],
  currentLanguage: string,
  token: string,
  setCategories: (categories: Category[]) => void,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
) => {
  setLoading(true);
  const val = await deleteCategory(id, currentLanguage, token);
  if (!val) {
    setLoading(false);
    setError(true);
    setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
    return;
  }
  const newCategories = categories.filter((categ: Category) => categ.id != id);
  setCategories([...newCategories]);
  setSuccess(true);
  setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  setLoading(false);
};

export const onQuestionAdd = async (
  newQuestion: Question,
  questions: Question[],
  currentLanguage: string,
  token: string,
  setQuestions: (categories: Question[]) => void,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
) => {
  setLoading(true);

  const val = await addQuestion(newQuestion, currentLanguage, token);
  const newQuestions = questions;

  if (!val) {
    setLoading(false);
    setError(true);
    setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
    return;
  }
  newQuestions.unshift(newQuestion);
  setQuestions([...newQuestions]);
  setSuccess(true);
  setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  setLoading(false);
};

export const onQuestionUpdate = async (
  question: Question,
  questions: Question[],
  currentLanguage: string,
  token: string,
  setQuestions: (categories: Question[]) => void,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
) => {
  setLoading(true);
  const val = await updateQuestion(question, currentLanguage, token);
  if (!val) {
    setError(true);
    setLoading(false);
    setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
    return;
  }
  const newQuestions = questions;
  newQuestions.forEach(function (item: Question) {
    if (item.id == question.id) {
      item.title = question.title;
      item.topic_id = question.topic_id;
      item.topic_title = question.topic_title;
      item.timestamp = new Date();
    }
  });
  setSuccess(true);
  setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  setQuestions([...newQuestions]);

  setLoading(false);
};

export const onQuestionDelete = async (
  id: number,
  questions: Question[],
  currentLanguage: string,
  token: string,
  setQuestions: (categories: Question[]) => void,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
): Promise<void> => {
  setLoading(true);
  const val = await deleteQuestion(id, currentLanguage, token);
  if (!val) {
    setError(true);
    setLoading(false);
    setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
    return;
  }
  const newQuestions = questions.filter((categ: Question) => categ.id != id);
  setQuestions([...newQuestions]);
  setSuccess(true);
  setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  setLoading(false);
};

export const onTopicAdd = async (
  newTopic: Topic,
  topics: Topic[],
  currentLanguage: string,
  token: string,
  setTopics: (topics: Topic[]) => void,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
): Promise<void> => {
  setLoading(true);

  const val = await addTopic(newTopic, currentLanguage, token);
  if (!val) {
    setError(true);
    setLoading(false);
    setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
    return;
  }
  //new topic added successfully, add locally
  const newTopics = topics;

  //update topic array
  newTopics.unshift(newTopic);

  //push new updated arrays
  setTopics([...newTopics]);

  setSuccess(true);
  setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  setLoading(false);
};

export const getCategoriesFromTitles = (
  categories: Category[],
  selectedCategoriesTitles: string[]
) => {
  const updatedCategories: Category[] = [];
  selectedCategoriesTitles.forEach((title: string) => {
    const id = categories.find((x) => x.title === title)?.id;
    if (id) {
      updatedCategories.push({ id, title });
    }
  });
  return updatedCategories;
};

export const getRelatedFromTitle = (
  topics: Topic[],
  selectedRelatedTitles: string[]
) => {
  const newRelated: Related[] = [];
  selectedRelatedTitles.forEach((title: string) => {
    const id = topics.find((x) => x.title === title)?.id;
    if (id) {
      newRelated.push({ id, title });
    }
  });
  return newRelated;
};

export const getTopicIdFromTitle = (
  topics: Topic[],
  selectedTopicTitle: string
): number => {
  const selectedTopic = topics.find((topic: Topic) => {
    if (topic.title == selectedTopicTitle) {
      return topic.id;
    }
  });

  return selectedTopic ? selectedTopic.id : -1;
};

export const onTopicUpdate = async (
  updatedTopic: Topic,
  topics: Topic[],
  currentLanguage: string,
  token: string,
  setTopics: (topics: Topic[]) => void,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
): Promise<void> => {
  setLoading(true);
  const val = await updateTopic(updatedTopic, currentLanguage, token);
  if (!val) {
    setError(true);
    setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
    setLoading(false);
    return;
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

  //push new updated arrays
  setTopics([...newTopics]);

  //newTopics.push({ title: topicTitle, id: categoryHash });
  setSuccess(true);
  setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  setLoading(false);
};

export const onTopicDelete = async (
  id: number,
  topics: Topic[],
  currentLanguage: string,
  token: string,
  setTopics: (topics: Topic[]) => void,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
): Promise<void> => {
  setLoading(true);
  const val = await deleteTopic(id, currentLanguage, token);
  if (!val) {
    setLoading(false);
    setError(true);
    setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
    return;
  }
  const newTopics = topics.filter((topic: Topic) => topic.id != id);
  setTopics([...newTopics]);
  setSuccess(true);
  setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  setSuccess(true);
  setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  setLoading(false);
};

export const onReportEdit = async (
  currentReport: any,
  id: number,
  reports: ReportHandled[],
  newQuestion: string,
  currentLanguage: string,
  token: string,
  setReports: (topics: ReportHandled[]) => void,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
): Promise<void> => {
  setLoading(true);
  const val1 = await deleteReport(id, currentLanguage, token);

  //2 update the question with new content
  const val2 = await updateQuestion(
    {
      id: currentReport.question_id,
      timestamp: new Date(),
      title: newQuestion,
      topic_id: currentReport.topic_id,
      topic_title: currentReport.topic_title,
    },
    currentLanguage,
    token
  );

  if (!val1 || !val2) {
    setError(true);
    setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
    return;
  }

  //update locally
  const newReports = reports.filter(function (item: ReportHandled) {
    return item.id != id;
  });

  setReports([...newReports]);

  setSuccess(true);
  setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
};

export const onReportDelete = async (
  id: number,
  reports: ReportHandled[],
  setReports: (reports: ReportHandled[]) => void,
  currentLanguage: string,
  token: string,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
) => {
  setLoading(true);
  const val = await deleteReport(id, currentLanguage, token);

  if (!val) {
    setLoading(false);
    setError(true);
    setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
    return;
  }
  //update locally
  const newReports = reports.filter(function (item: ReportHandled) {
    return item.id != id;
  });

  setReports([...newReports]);
  setSuccess(true);
  setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  setLoading(false);
};

export const onQuestionsAdd = async (
  questionsArray: string[],
  selectTopic: string,
  topics: Topic[],
  currentLanguage: string,
  token: string,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
) => {
  setLoading(true);

  const topic = topics.find((t) => t.title == selectTopic);
  if (!topic || questionsArray.length < 0) {
    setLoading(false);
    return;
  }

  const newQuestions: Question[] = questionsArray.map(
    (questionTitle: string) => ({
      id: getHash(questionTitle + "*" + topic?.title),
      timestamp: new Date(),
      topic_title: topic.title,
      title: questionTitle,
      topic_id: topic.id,
    })
  );

  const val = await addQuestions(newQuestions, currentLanguage, token);

  if (!val) {
    setLoading(false);
    setError(true);
    setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
    return;
  }
  setSuccess(true);
  setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  setLoading(false);
};
