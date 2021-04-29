import { StatsClientRequest } from "../interfaces/Interfaces";
const isToday = (someDate: Date): boolean => {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

interface ambiguo {}

export const countToday = (stats: { timestamp: Date }[]): number => {
  return stats.filter((stat) => isToday(stat.timestamp)).length;
};

export const countByDate = (
  stats: { timestamp: Date }[],
  until: Date
): number => {
  let counter = 0;

  stats.forEach((stat) => {
    const untilDate = new Date(until).setHours(0, 0, 0, 0);
    const statDate = new Date(stat.timestamp).setHours(0, 0, 0, 0);
    if (statDate <= untilDate) counter++;
  });
  return counter;
};
