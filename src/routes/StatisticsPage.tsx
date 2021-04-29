//api call to get all the topics to translate (from user_current_lang to target_lang)
import React from "react";
import { getCategories, getStatsContent, getTopics } from "../api/api";
import { Category, PageProps, Topic } from "../interfaces/Interfaces";
import PieChart from "../components/custom/PieChart";
import DBChartBar from "../components/charts/DBChartBar";
import ActivityChart from "../components/charts/ActivityChart";
import UserChart from "../components/charts/UserChart";
import ReportsChart from "../components/charts/ReportsChart";

import CardNumber from "../components/custom/CardNumber";
import Tabs from "../components/switches/Tabs";

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
        //  setTopics(retrievedTopics);
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
            height: "60vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ReportsChart currentLanguage={currentLanguage} token={token} />
          <DBChartBar currentLanguage={currentLanguage} token={token} />
          <ActivityChart currentLanguage={currentLanguage} token={token} />
          <UserChart currentLanguage={currentLanguage} token={token} />
        </div>
      </div>
    </>
  );
}
