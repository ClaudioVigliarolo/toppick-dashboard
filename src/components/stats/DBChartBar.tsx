import React from "react";
import CardNumber from "../ui/CardNumber";
import { useChartStyles } from "../ui/ChartStyles";
import { StatsContent } from "@/interfaces/stats";
import { Lang } from "@/interfaces/ui";
import { getContentStats } from "@/services/stats";

interface DBChartBarProps {
  currentLanguage: Lang;
  token: string;
  from: Date;
  until: Date;
}

export default function DBChartBar({
  currentLanguage,
  token,
  from,
  until,
}: DBChartBarProps) {
  const [contentStats, setContentStats] = React.useState<StatsContent>({
    categories: 0,
    questions: 0,
    topics: 0,
  });

  const classes = useChartStyles();

  React.useEffect(() => {
    (async () => {
      try {
        const retrievedStats = await getContentStats(
          from,
          until,
          currentLanguage,
          token
        );
        if (retrievedStats) {
          setContentStats(retrievedStats);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentLanguage, from, token, until]);

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
