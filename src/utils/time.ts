/*time*/
export function getTodayStart(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getTodayEnd(): Date {
  const date = new Date();
  return date;
}

export function getYesterdayStart(): Date {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getFormattedDate(input: Date): string {
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
}

export function getCurrentTime(): string {
  return new Date().toISOString();
}

export function getLastWeekStart(): Date {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getLastMonthStart(): Date {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() - 1);
  return date;
}

export function getLastThreeMonthsStart(): Date {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() - 3);
  return date;
}

export function getLastYearStart(): Date {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  return date;
}
