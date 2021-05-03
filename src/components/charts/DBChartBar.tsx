import React from "react";
import CardNumber from "../custom/CardNumber";
import { Lang, StatsContent } from "../../interfaces/Interfaces";
import { getStatsContent } from "../../api/api";
import { useChartStyles } from "./ChartStyles";

interface DBChartBarProps {
  currentLanguage: Lang;
  token: string;
  maxDate: Date;
}

export default function DBChartBar({
  currentLanguage,
  token,
  maxDate,
}: DBChartBarProps) {
  const [contentStats, setContentStats] = React.useState<StatsContent>({
    categories: 0,
    questions: 0,
    topics: 0,
  });

  const classes = useChartStyles();

  React.useEffect(() => {
    (async () => {
      const retrievedStats = await getStatsContent(
        maxDate,
        currentLanguage,
        token
      );
      if (retrievedStats != null) {
        setContentStats(retrievedStats);
      }
    })();
  }, [currentLanguage, maxDate]);

  return (
    <div className={classes.container}>
      <div className={classes.cardnumbersContainer}>
        <CardNumber label="Categories" value={contentStats.categories} />
        <CardNumber label="Topics" value={contentStats.topics} />
        <CardNumber label="Questions" value={contentStats.questions} />
      </div>
    </div>
  );
}
