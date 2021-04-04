import React from "react";
import { getCategories, getTopics } from "../api/api";
import {
  Category,
  PageProps,
  Question,
  Report,
  Topic,
} from "../interfaces/Interfaces";
import { AuthContext } from "../context/AuthContext";
import InsertUtil from "./InsertUtil";
export default function CreatePage({ token, currentLanguage }: PageProps) {
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);

  const {
    isAuthenticated,
    userType,
    username,
    userLanguages,
  } = React.useContext(AuthContext);

  React.useEffect(() => {
    (async () => {
      const retrievedCategories = await getCategories(currentLanguage, token);
      if (retrievedCategories != null) {
        setCategories(retrievedCategories);
      }
    })();

    (async () => {
      const retrievedTopics = await getTopics(currentLanguage, token);
      if (retrievedTopics != null) {
        setTopics(retrievedTopics);
      }
    })();
  }, [currentLanguage]);

  return (
    <>
      <div></div>
      <InsertUtil topics={topics} categories={categories} />
    </>
  );
}
