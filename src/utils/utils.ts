export const getHash = (str1: string, str2: string = "") => {
  const str = str1 + "*" + str2;
  var hash = 0,
    i,
    chr;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export const getFormattedDate = (inputDate: any): string => {
  console.log(inputDate);
  const todaysDate = new Date();
  // call setHours to take the time out of the comparison
  if (
    new Date(inputDate).setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)
  ) {
    // Date equals today's date
    return "today";
  }
  return new Date(inputDate).toLocaleString().slice(0, 10);
};

export const getCurrentTime = (): string => {
  return new Date().toISOString();
};

export const countTextLines = (inputText: string): number => {
  if (!inputText) return 0;
  const lines = inputText.match(/[^\r\n]+/g);
  return lines ? lines.length : 0;
};

export const getLinesFromText = (inputText: string): string[] => {
  if (!inputText) return [];
  const lines = inputText.match(/[^\r\n]+/g);
  return lines ? lines : [];
};

export const getTextFromLines = (inputText: string[]): string => {
  return "";
  /*if (!inputText) return [];
  const lines = inputText.match(/[^\r\n]+/g);
  return lines ? lines : [];*/
};

//time utils

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
