import { Lang, RadioButton, TopicType } from "../interfaces/Interfaces";

const date = new Date();

//until today, from
const DEF_UNTIL_DATE = new Date();
const DEF_FROM_DATE = new Date(date.getFullYear() - 1000, date.getMonth(), 1);

const TOPIC_SOURCES = [
  "TopPick Creators",
  "The Internet TESL Journal",
  "ESL Conversation Questions",
];

const TOPIC_LEVELS = ["Easy", "Medium", "Hard"];

const TOPIC_RADIO_TYPES: RadioButton[] = [
  { title: "Topic", value: TopicType.TOPIC },
  { title: "Dialog", value: TopicType.DIALOG },
];

export const CONSTANTS = {
  ALERT_TIME: 3000,
  DRAWER_WIDTH: 220,
  SMALL_SCREEN: 800,
  NO_USER_TYPE: "creator",
  ROOT_LANG: Lang.EN,
  DEF_FROM_DATE,
  DEF_UNTIL_DATE,
  TOPIC_SOURCES,
  TOPIC_LEVELS,
  TOPIC_RADIO_TYPES,
};
