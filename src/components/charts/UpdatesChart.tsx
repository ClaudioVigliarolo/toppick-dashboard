import React from "react";
import CardNumber from "../cards/CardNumber";
import { getStatsClientUpdates } from "../../api/api";
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
  const [clientUpdates, setClientUpdates] = React.useState<StatsUpdates>({
    updates: 0,
  });
  const classes = useChartStyles();

  React.useEffect(() => {
    (async () => {
      const retrievedStats = await getStatsClientUpdates(
        from,
        until,
        currentLanguage,
        token
      );
      if (retrievedStats !== null) {
        console.log("mydog", retrievedStats);
        setClientUpdates(retrievedStats);
      }
    })();
  }, [currentLanguage, from, token, until]);

  return (
    <div className={classes.container}>
      <div className={classes.cardnumbersContainer}>
        <CardNumber label="Updates" value={clientUpdates.updates} />
      </div>
    </div>
  );
}
