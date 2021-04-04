import React from "react";
import { getReports, getTopics } from "../api/api";
import TableReports from "../components/tables/TableReports";
//import { COLORS } from "../constants/colors";
import {
  PageProps,
  Report,
  ReportHandled,
  Topic,
} from "../interfaces/Interfaces";
export default function ReportsPage({ token, currentLanguage }: PageProps) {
  const [reports, setReports] = React.useState<ReportHandled[]>([]);
  const [topics, setTopics] = React.useState<string[]>([]);

  React.useEffect(() => {
    (async () => {
      const data = await getReports(currentLanguage, token);
      if (data != null) {
        setReports(data.reports);
        setTopics(data.topics);
      }
    })();
  }, [currentLanguage]);

  return (
    <TableReports
      token={token}
      reports={reports}
      topics={topics}
      currentLanguage={currentLanguage}
    />
  );
}
