import React from "react";
import { getCategories, getTopics } from "../api/api";
import { Category, PageProps, Topic } from "../interfaces/Interfaces";
import InsertUtil from "../components/custom/InsertUtil";
export default function CreatePage({
  token,
  currentLanguage,
  setLoading,
}: PageProps) {
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const retrievedCategories = await getCategories(currentLanguage, token);
      if (retrievedCategories != null) {
        setCategories(retrievedCategories);
      }

      const retrievedTopics = await getTopics(currentLanguage, token);
      if (retrievedTopics != null) {
        setTopics(retrievedTopics);
      }
      setLoading(false);
    })();
  }, [currentLanguage]);

  return (
    <>
      <InsertUtil
        setLoading={setLoading}
        topics={topics}
        categories={categories}
        currentLanguage={currentLanguage}
        token={token}
      />
    </>
  );
}
