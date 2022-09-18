import React from "react";
import CardNumber from "./StatsCard";
import { Lang } from "@/interfaces/ui";
import { getContentStats } from "@toppick/common/build/api";
import { makeStyles } from "@material-ui/core";

interface ChartTabProps {
  currentLanguage: Lang;
  token: string;
  from: Date;
  until: Date;
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardnumbersContainer: {
    display: "flex",
    flexDirection: "row",
  },
  tabsContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  chartContainer: {
    width: "60%",
  },
  chartHeader: {
    color: "#fff",
    textAlign: "center",
    fontSize: 30,
  },
  userTabsContainer: {
    marginLeft: "40vw",
    marginTop: -40,
    minHeight: 40,
    float: "right",
    flexDirection: "row",
    display: "flex",
  },
});

export default function ChartTab({
  currentLanguage,
  token,
  from,
  until,
}: ChartTabProps) {
  const [contentStats, setContentStats] = React.useState<any>({
    categories: 0,
    questions: 0,
    topics: 0,
  });

  const classes = useStyles();

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
