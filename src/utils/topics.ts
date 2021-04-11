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
  newTitle: string,
  categories: Category[],
  currentLanguage: string,
  token: string,
  setCategories: (categories: Category[]) => void,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
): Promise<void> => {
  setLoading(true);
  const categoryHash = getHash(newTitle);
  const val = await addCategory(newTitle, categoryHash, currentLanguage, token);
  const newCategories = categories;
  if (!val) {
    setLoading(false);

    setError(true);
    setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
    return;
  }
  newCategories.unshift({ title: newTitle, id: categoryHash });
  setSuccess(true);
  setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);

  setCategories([...newCategories]);
  setLoading(false);
};

export const onCategoryUpdate = async (
  id: number,
  newTitle: string,
  categories: Category[],
  currentLanguage: string,
  token: string,
  setCategories: (categories: Category[]) => void,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
) => {
  setLoading(true);
  const val = await updateCategory(newTitle, id, currentLanguage, token);
  if (!val) {
    setLoading(false);

    setError(true);
    setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
    return;
  }
  const newCategories = categories;
  newCategories.forEach(function (item: Category) {
    if (item.id == id) item.title = newTitle;
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
  newTitle: string,
  selectedTopicTitle: string,
  questions: Question[],
  topics: Topic[],
  currentLanguage: string,
  token: string,
  setQuestions: (categories: Question[]) => void,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
) => {
  setLoading(true);

  const selectedTopic = topics.find((topic: Topic) => {
    if (topic.title == selectedTopicTitle) {
      return topic.id;
    }
  });
  if (!selectedTopic) return;

  const newQuestion: Question = {
    id: getHash(newTitle + "*" + newTitle),
    title: newTitle,
    topic_id: selectedTopic.id,
    timestamp: new Date(),
    topic_title: selectedTopic.title,
  };
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
  id: number,
  newTitle: string,
  selectedTopicTitle: string,
  questions: Question[],
  topics: Topic[],
  currentLanguage: string,
  token: string,
  setQuestions: (categories: Question[]) => void,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
) => {
  setLoading(true);

  //find id of selectedTopicTitle
  const selectedTopic = topics.find((topic: Topic) => {
    if (topic.title == selectedTopicTitle) {
      return topic.id;
    }
  });
  if (!selectedTopic) return;

  const val = await updateQuestion(
    {
      id,
      timestamp: new Date(),
      title: newTitle,
      topic_id: selectedTopic.id,
      topic_title: selectedTopic.title,
    },
    currentLanguage,
    token
  );
  if (!val) {
    setError(true);
    setLoading(false);

    setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
    return;
  }
  const newQuestions = questions;
  newQuestions.forEach(function (item: Question) {
    if (item.id == id) {
      item.title = newTitle;
      item.topic_id = selectedTopic.id;
      item.topic_title = selectedTopic.title;
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
  topicTitle: string,
  selectedCategoriesTitles: string[],
  selectedRelatedTitles: string[],
  topics: Topic[],
  categories: Category[],
  currentLanguage: string,
  token: string,
  setTopics: (topics: Topic[]) => void,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
): Promise<void> => {
  setLoading(true);
  //new topic id
  const topicID = getHash(topicTitle);
  //new categories for added topic
  const newCategories: Category[] = [];
  selectedCategoriesTitles.forEach((title: string) => {
    const id = categories.find((x) => x.title === title)?.id;
    if (id) {
      newCategories.push({ id, title });
    }
  });

  //new related for added topic
  const newRelated: Related[] = [];
  selectedRelatedTitles.forEach((title: string) => {
    const id = topics.find((x) => x.title === title)?.id;
    if (id) {
      newRelated.push({ id, title });
    }
  });

  const newTopic: Topic = {
    id: topicID,
    source: "Top Picks Creator",
    timestamp: new Date(),
    title: topicTitle,
    related: newRelated,
    categories: newCategories,
  };

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

export const onTopicUpdate = async (
  topicID: number,
  newTitle: string,
  selectedCategoriesTitles: string[],
  selectedRelatedTitles: string[],
  topics: Topic[],
  categories: Category[],
  currentLanguage: string,
  token: string,
  setTopics: (topics: Topic[]) => void,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
): Promise<void> => {
  setLoading(true);

  const updatedCategories: Category[] = [];
  selectedCategoriesTitles.forEach((title: string) => {
    const id = categories.find((x) => x.title === title)?.id;
    if (id) {
      updatedCategories.push({ id, title });
    }
  });

  //new related for  topic
  const newRelated: Related[] = [];
  selectedRelatedTitles.forEach((title: string) => {
    const id = topics.find((x) => x.title === title)?.id;
    if (id) {
      newRelated.push({ id, title });
    }
  });
  const updatedTopic: Topic = {
    id: topicID,
    source: "Top Picks Creator",
    timestamp: new Date(),
    title: newTitle,
    related: newRelated,
    categories: updatedCategories,
  };
  const val = await updateTopic(updatedTopic, currentLanguage, token);
  if (!val) {
    setError(true);
    setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
    setLoading(false);
    return;
  }
  //new topic updated successfully, update locally
  const newTopics = topics;
  const topicIndex = topics.findIndex((topic: Topic) => topic.id == topicID);
  newTopics[topicIndex].title = newTitle;
  newTopics[topicIndex].timestamp = new Date();
  newTopics[topicIndex].categories = updatedCategories;
  newTopics[topicIndex].related = newRelated;

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
  //newTopics.push({ title: topicTitle, id: categoryHash });
  setSuccess(true);
  setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  setLoading(false);
};
/*
export const onQuestionDelete = async (
  id: number,
  questionID: number,
  reports: ReportHandled[],
  currentLanguage: string,
  token: string,
  setReports: (topics: ReportHandled[]) => void,
  setLoading: (val: boolean) => void,
  setSuccess: (val: boolean) => void,
  setError: (val: boolean) => void
): Promise<void> => {
  setLoading(true);
  const val1 = await deleteReport(id, currentLanguage, token);

  //2 delete the question
  const val2 = await deleteQuestion(questionID, currentLanguage, token);

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
  setLoading(false);
};
*/

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
  if (!topic || questionsArray.length < 0) return;

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
