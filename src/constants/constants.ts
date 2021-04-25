import { Lang, Language } from "../interfaces/Interfaces";

const languages: Language[] = [
  { label: "italian", value: "it" },
  { label: "english", value: "en" },
];

export const CONSTANTS = {
  ALERT_TIME: 3000,
  SMALL_SCREEN: 800,
  languages,
  NO_USER_TYPE: "creator",
  ROOT_LANG: Lang.EN,
};
