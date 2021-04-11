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

export default function TopicsPage({
  token,
  currentLanguage,
  setLoading,
}: PageProps) {
  const [topics, setTopics] = React.useState<Topic[]>([]);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const retrievedTopics = await getTopics(currentLanguage, token);
      if (retrievedTopics != null) {
        setTopics(retrievedTopics);
      }
    })();
    setLoading(false);
  }, [currentLanguage]);

  return (
    <TableQuestions
      token={token}
      setLoading={setLoading}
      topics={topics}
      currentLanguage={currentLanguage}
    />
  );
}
