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
export default function ReportsPage({
  token,
  currentLanguage,
  setLoading,
}: PageProps) {
  const [reports, setReports] = React.useState<ReportHandled[]>([]);
  const [topics, setTopics] = React.useState<Topic[]>([]);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getReports(currentLanguage, token);
      if (data != null) {
        setReports(data.reports);
        setTopics(data.topics);
      }
      const retrievedTopics = await getTopics(currentLanguage, token);
      if (retrievedTopics != null) {
        setTopics(retrievedTopics);
      }
    })();
    setLoading(false);
  }, [currentLanguage]);

  return (
    <TableReports
      token={token}
      reports={reports}
      topics={topics}
      currentLanguage={currentLanguage}
      setLoading={setLoading}
    />
  );
}
