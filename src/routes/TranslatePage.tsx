//api call to get all the topics to translate (from user_current_lang to target_lang)
import React from "react";
import { getCategories, getTopics, getToTranslateTopics } from "../api/api";
import {
  Category,
  PageProps,
  Topic,
  ToTranslateTopic,
} from "../interfaces/Interfaces";
import TranslateUtil from "../components/custom/TranslateUtil";
export default function CreatePage({
  token,
  currentLanguage,
  setLoading,
  onError,
  onSuccess,
}: PageProps) {
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [toTranslateTopics, setToTranslateTopics] = React.useState<
    ToTranslateTopic[]
  >([]);

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

      //get to translate
      const toTranslateTopics = await getToTranslateTopics(
        currentLanguage,
        token
      );
      console.log("Myto", toTranslateTopics);
      if (toTranslateTopics != null) {
        setToTranslateTopics(toTranslateTopics);
        console.log("Myto", toTranslateTopics);
      }

      setLoading(false);
    })();
  }, [currentLanguage]);

  return (
    <>
      <TranslateUtil
        setLoading={setLoading}
        topics={topics}
        categories={categories}
        currentLanguage={currentLanguage}
        token={token}
        toTranslateTopics={toTranslateTopics}
        onError={onError}
        onSuccess={onSuccess}
      />
    </>
  );
}
