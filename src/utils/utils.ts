export const getHash = (str: string) => {
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
