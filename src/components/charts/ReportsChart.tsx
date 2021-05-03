import React from "react";
import CardNumber from "../custom/CardNumber";
import { getStatsReports } from "../../api/api";
import { Lang, StatsReport } from "../../interfaces/Interfaces";
import { useChartStyles } from "./ChartStyles";

interface ReportsChartProps {
  currentLanguage: Lang;
  token: string;
  maxDate: Date;
}

export default function ReportsChart({
  currentLanguage,
  token,
  maxDate,
}: ReportsChartProps) {
  const [reportStats, setReportStats] = React.useState<StatsReport>({
    reports: 0,
  });
  const classes = useChartStyles();

  React.useEffect(() => {
    (async () => {
      const retrievedStats = await getStatsReports(
        maxDate,
        currentLanguage,
        token
      );
      console.log("casetta", retrievedStats);

      if (retrievedStats != null) {
        setReportStats(retrievedStats);
      }
    })();
  }, [currentLanguage, maxDate]);

  return (
    <div className={classes.container}>
      <div className={classes.cardnumbersContainer}>
        <CardNumber label="Reports" value={reportStats.reports} />
      </div>
    </div>
  );
}
