import React from "react";
import { COLORS } from "../constants/Colors";
import {
  Category,
  PageProps,
  Question,
  Report,
  Topic,
} from "../interfaces/Interfaces";
import TableQuestions from "../components/tables/TableQuestions";
import { getQuestions, getTopics } from "../api/api";

export default function TopicsPage({ token, currentLanguage }: PageProps) {
  const [topics, setTopics] = React.useState<Topic[]>([]);

  React.useEffect(() => {
    (async () => {
      const retrievedTopics = await getTopics(currentLanguage, token);
      if (retrievedTopics != null) {
        setTopics(retrievedTopics);
      }
    })();
  }, [currentLanguage]);

  return (
    <TableQuestions
      token={token}
      topics={topics}
      currentLanguage={currentLanguage}
    />
  );
}
