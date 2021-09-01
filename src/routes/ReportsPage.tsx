import React from "react";
import SearchBar from "src/components/input/SearchBar";
import Select from "src/components/select/ObjectSelect";
import DeleteDialog from "../components/dialogs/ConfirmDialog";
import EditDialog from "../components/dialogs/EditDialog";

import {
  onQuestionDelete,
  onQuestionUpdate,
  onReportDelete,
} from "src/utils/topics";
import { getReports, getTopics } from "../api/api";
import TableReports from "../components/tables/TableReports";
import { PageProps, ReportHandled, Topic } from "../interfaces/Interfaces";
import { useAppStyles } from "../styles/common";

const NO_REPORT: ReportHandled = {
  question_id: -1,
  reason: "",
  timestamp: new Date(),
  question_title: "",
  topic_title: "",
  username: "",
  topic_id: -1,
};

const NO_TOPIC: Topic = {
  categories: [],
  id: -1,
  type: 0,
  level: 0,
  related: [],
  source: "",
  timestamp: new Date(),
  title: "Filter by topic",
  ref_id: -1,
};

export default function ReportsPage({
  token,
  currentLanguage,
  setLoading,
  loading,
  onError,
  onSuccess,
}: PageProps) {
  const [filterTopic, setFilterTopic] = React.useState<Topic>(NO_TOPIC);
  const [reports, setReports] = React.useState<ReportHandled[]>([]);
  const [currentReport, setCurrentReport] =
    React.useState<ReportHandled>(NO_REPORT);
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [searchText, setSearchText] = React.useState<string>("");
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);

  const classes = useAppStyles();

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const reports = await getReports(currentLanguage, token);
      if (reports != null) {
        setReports(reports);
      }
      const retrievedTopics = await getTopics(currentLanguage);
      if (retrievedTopics != null) {
        setTopics(retrievedTopics);
      }
      setLoading(false);
    })();
  }, [currentLanguage]);

  const handleTopicChange = (index: number) => {
    setFilterTopic(topics[index]);
  };

  const onEdit = (report: ReportHandled) => {
    setCurrentReport(report);
    setEditDialog(true);
  };

  const onDelete = (report: ReportHandled) => {
    setCurrentReport(report);
    setDeleteDialog(true);
  };

  const onIgnore = (report: ReportHandled) => {
    onReportDelete(
      report.question_id,
      reports,
      setReports,
      currentLanguage,
      token,
      setLoading,
      onSuccess,
      onError
    );
  };

  return (
    <>
      <div className={classes.headerSection}>
        <SearchBar
          placeholder="Filter Questions"
          setSearchText={(text) => setSearchText(text)}
          searchText={searchText}
        />
        <div>
          <Select
            handleChange={handleTopicChange}
            value={filterTopic}
            values={topics}
            defaultValue={NO_TOPIC}
          />
        </div>
      </div>
      {reports.length > 0 && (
        <TableReports
          reports={reports}
          topics={topics.sort((a, b) => a.title.localeCompare(b.title))}
          filterTopic={filterTopic === NO_TOPIC ? "" : filterTopic.title}
          onDelete={onDelete}
          onEdit={onEdit}
          searchText={searchText}
          onIgnore={onIgnore}
        />
      )}
      {reports.length == 0 && !loading && (
        <div className={classes.noItemsAlert}>All Reports have been solved</div>
      )}
      <DeleteDialog
        open={deleteDialog}
        onConfirm={async () => {
          // delete report, delete question
          await onReportDelete(
            currentReport.question_id,
            reports,
            setReports,
            currentLanguage,
            token,
            setLoading,
            onSuccess,
            onError
          );
          await onQuestionDelete(
            currentReport.question_id,
            [],
            currentLanguage,
            token,
            () => {},
            setLoading,
            onSuccess,
            onError
          );
          setCurrentReport(NO_REPORT);
          setDeleteDialog(false);
        }}
        title="Proceed to Delete the question?"
        description="The question record will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setCurrentReport(NO_REPORT);
          setDeleteDialog(false);
        }}
      />

      <EditDialog
        open={editDialog}
        onConfirm={async (newQuestion: string) => {
          await onReportDelete(
            currentReport.question_id,
            reports,
            setReports,
            currentLanguage,
            token,
            setLoading,
            onSuccess,
            onError
          );

          await onQuestionUpdate(
            {
              id: currentReport.question_id,
              title: newQuestion,
              timestamp: new Date(),
              topic: {
                id: currentReport.topic_id,
                title: currentReport.topic_title,
              },
            },
            [],
            currentLanguage,
            token,
            () => {},
            setLoading,
            onSuccess,
            onError
          );

          setCurrentReport(NO_REPORT);
          setEditDialog(false);
        }}
        id={currentReport.question_id}
        header="Editing question"
        title={currentReport.question_title}
        onRefuse={() => {
          setCurrentReport(NO_REPORT);
          setEditDialog(false);
        }}
      />
    </>
  );
}
