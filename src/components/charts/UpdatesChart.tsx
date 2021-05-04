import React from "react";
import CardNumber from "../custom/CardNumber";
import { getStatsUpdates } from "../../api/api";
import { Lang, StatsUpdates } from "../../interfaces/Interfaces";
import { useChartStyles } from "./ChartStyles";

interface UpdatesChartProps {
  currentLanguage: Lang;
  token: string;
  from: Date;
  until: Date;
}

export default function UpdatesChart({
  currentLanguage,
  token,
  from,
  until,
}: UpdatesChartProps) {
  const [updateStats, setUpdateStats] = React.useState<StatsUpdates>({
    updates: 0,
  });
  const classes = useChartStyles();

  React.useEffect(() => {
    (async () => {
      const retrievedStats = await getStatsUpdates(
        from,
        until,
        currentLanguage,
        token
      );
      if (retrievedStats != null) {
        setUpdateStats(retrievedStats);
      }
    })();
  }, [currentLanguage, from]);

  return (
    <div className={classes.container}>
      <div className={classes.cardnumbersContainer}>
        <CardNumber label="Updates" value={updateStats.updates} />
      </div>
    </div>
  );
}
