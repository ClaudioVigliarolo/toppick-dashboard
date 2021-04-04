import React from "react";
import { getCategories, getTopics } from "../api/api";
import {
  Category,
  CategoryTopic,
  Question,
  Related,
  Report,
  Topic,
  PageProps,
} from "../interfaces/Interfaces";
import TableTopics from "../components/tables/TableTopics";

export default function TopicsPage({ token, currentLanguage }: PageProps) {
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    (async () => {
      const retrievedTopics = await getTopics(currentLanguage, token);
      if (retrievedTopics != null) {
        setTopics(retrievedTopics);
      }
    })();

    (async () => {
      const retrievedCategories = await getCategories(currentLanguage, token);
      if (retrievedCategories != null) {
        setCategories(retrievedCategories);
      }
    })();
  }, [currentLanguage]);

  return (
    <TableTopics
      topics={topics}
      categories={categories}
      token={token}
      currentLanguage={currentLanguage}
    />
  );
}
