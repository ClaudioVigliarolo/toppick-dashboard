//api call to get all the topics to translate (from user_current_lang to target_lang)
import React from "react";
import { getCategories, getStatsContent, getTopics } from "../api/api";
import { Category, PageProps, Topic } from "../interfaces/Interfaces";
import PieChart from "../components/custom/PieChart";
import ChartBar from "../components/charts/ChartBar";
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

      const retrievedTopics = await getStatsContent(currentLanguage, token);
      if (retrievedTopics != null) {
        setTopics(retrievedTopics);
      }
      setLoading(false);
    })();
  }, [currentLanguage]);

  return (
    <>
      <div>
        <div
          style={{
            width: "60vw",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ChartBar />
          <ChartBar />
        </div>
      </div>
    </>
  );
}
