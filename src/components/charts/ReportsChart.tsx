import React from "react";
import CardNumber from "../cards/CardNumber";
import { getStatsReports } from "../../api/api";
import { Lang, StatsReport } from "../../interfaces/Interfaces";
import { useChartStyles } from "./ChartStyles";

interface ReportsChartProps {
  currentLanguage: Lang;
  token: string;
  until: Date;
  from: Date;
}

export default function ReportsChart({
  currentLanguage,
  token,
  until,
  from,
}: ReportsChartProps) {
  const [reportStats, setReportStats] = React.useState<StatsReport>({
    reports: 0,
  });
  const classes = useChartStyles();

  React.useEffect(() => {
    (async () => {
      const retrievedStats = await getStatsReports(
        from,
        until,
        currentLanguage,
        token
      );
      if (retrievedStats != null) {
        setReportStats(retrievedStats);
      }
    })();
  }, [currentLanguage, until, from, token]);

  return (
    <div className={classes.container}>
      <div className={classes.cardnumbersContainer}>
        <CardNumber label="Reports" value={reportStats.reports} />
      </div>
    </div>
  );
}
