import React from "react";
import CardNumber from "../custom/CardNumber";
import { getStatsUpdates } from "../../api/api";
import { Lang, StatsUpdates } from "../../interfaces/Interfaces";
import { useChartStyles } from "./ChartStyles";

interface UpdatesChartProps {
  currentLanguage: Lang;
  token: string;
  maxDate: Date;
}

export default function UpdatesChart({
  currentLanguage,
  token,
  maxDate,
}: UpdatesChartProps) {
  const [updateStats, setUpdateStats] = React.useState<StatsUpdates>({
    updates: 0,
  });
  const classes = useChartStyles();

  React.useEffect(() => {
    (async () => {
      const retrievedStats = await getStatsUpdates(
        maxDate,
        currentLanguage,
        token
      );
      if (retrievedStats != null) {
        setUpdateStats(retrievedStats);
      }
    })();
  }, [currentLanguage, maxDate]);

  return (
    <div className={classes.container}>
      <div className={classes.cardnumbersContainer}>
        <CardNumber label="Updates" value={updateStats.updates} />
      </div>
    </div>
  );
}
