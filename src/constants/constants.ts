import { Lang, Language } from "../interfaces/Interfaces";

const languages: Language[] = [
  { label: "italian", value: "it" },
  { label: "english", value: "en" },
];

const date = new Date();

//until today, from
const DEF_UNTIL_DATE = new Date();
const DEF_FROM_DATE = new Date(date.getFullYear() - 1000, date.getMonth(), 1);

export const CONSTANTS = {
  ALERT_TIME: 3000,
  SMALL_SCREEN: 800,
  languages,
  NO_USER_TYPE: "creator",
  ROOT_LANG: Lang.EN,
  DEF_FROM_DATE,
  DEF_UNTIL_DATE,
};
