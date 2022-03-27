import { Value } from "@/interfaces/ui";

export const getFormattedDate = (input: Date): string => {
  const inputDate = new Date(input);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (inputDate.toLocaleDateString() == today.toLocaleDateString()) {
    return "Today";
  } else if (inputDate.toLocaleDateString() == yesterday.toLocaleDateString()) {
    return "Yesterday";
  }
  return inputDate.toLocaleDateString("en-EN", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
};

export const getCurrentTime = (): string => {
  return new Date().toISOString();
};

/*text*/

export const countTextLines = (inputText: string): number => {
  if (!inputText) return 0;
  let lines = inputText.match(/[^\r\n]+/g);
  if (lines) {
    lines = lines.filter((l) => l.replace(/\s/g, "").length > 0);
  }
  return lines ? lines.length : 0;
};

export const getLinesFromText = (inputText: string): string[] => {
  if (!inputText) return [];
  let lines = inputText.match(/[^\r\n]+/g);
  if (lines) {
    lines = lines.filter((l) => l.replace(/\s/g, "").length > 0);
  }
  return lines ? lines : [];
};

export const noSpace = (inputText: string): string => {
  return inputText.replace(/\s/g, "");
};

/*time*/
export const getTodayStart = (): Date => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

export const getTodayEnd = (): Date => {
  const date = new Date();
  return date;
};

export const getYesterdayStart = (): Date => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const getLastWeekStart = (): Date => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const getLastMonthStart = (): Date => {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() - 1);
  return date;
};

export const getLastThreeMonthsStart = (): Date => {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() - 3);
  return date;
};

export const getLastYearStart = (): Date => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  return date;
};

export const isSelected = (arr: Value[], val: Value) => {
  return arr.find((value) => value.title === val.title) ? true : false;
};

export const refreshPage = () => {
  window.location.reload();
};

//check if the current imput has an accepted value
export const hasVal = (input: any): boolean => {
  if (input == null) {
    return false;
  }
  return true;
};
