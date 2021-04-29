import React from "react";
import CardNumber from "../custom/CardNumber";
import Tabs from "../switches/Tabs";
import Button from "../buttons/TabButton";
import { createStyles, makeStyles } from "@material-ui/core";
import { Lang, StatsContent } from "../../interfaces/Interfaces";
import { getStatsContent } from "../../api/api";
interface TabButton {
  label: string;
}

const tabButtons: TabButton[] = [
  { label: "Categories" },
  { label: "Topics" },
  { label: "Questions" },
];

const useStyles = makeStyles(() =>
  createStyles({
    cardnumbersContainer: {
      display: "flex",
      flexDirection: "row",
    },
  })
);

interface DBChartBarProps {
  currentLanguage: Lang;
  token: string;
}

export default function DBChartBar({
  currentLanguage,
  token,
}: DBChartBarProps) {
  const [index, setIndex] = React.useState<number>(0);
  const [contentStats, setContentStats] = React.useState<StatsContent>({
    categories: 0,
    questions: 0,
    topics: 0,
  });
  const classes = useStyles();

  React.useEffect(() => {
    (async () => {
      const retrievedStats = await getStatsContent(currentLanguage, token);
      if (retrievedStats != null) {
        console.log("Uu", retrievedStats);
        setContentStats(retrievedStats);
      }
    })();
  }, [currentLanguage]);

  return (
    <div className={classes.cardnumbersContainer}>
      <CardNumber label="Categories" value={contentStats.categories} />
      <CardNumber label="Topics" value={contentStats.topics} />
      <CardNumber label="Questions" value={contentStats.questions} />
    </div>
  );
}
