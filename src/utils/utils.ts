import { CONSTANTS } from "src/constants/constants";

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
