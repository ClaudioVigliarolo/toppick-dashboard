import React from "react";
import {
  CustomTable,
  StyledEditCell,
  StyledTableRow,
  useStyles,
  StyledTableCell,
} from "./TableStyles";
import { Report, ReportHandled, Topic } from "../../interfaces/Interfaces";
import DeleteDialog from "../dialogs/ConfirmDialog";
import EditDialog from "../dialogs/EditDialog";
import Select from "../select/Select";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TransactionAlert from "../alerts/TransactionAlert";
import SearchBar from "../input/searchBar";
import {
  onQuestionDelete,
  onQuestionUpdate,
  onReportDelete,
} from "src/utils/topics";

interface TableReportsProps {
  reports: ReportHandled[];
  token: string;
  topics: Topic[];
  currentLanguage: string;
  setLoading: (val: boolean) => void;
}

const NO_TOPIC = "Filter by topic";

const DEFAULT_REPORT: ReportHandled = {
  question_id: -1,
  reason: "",
  timestamp: new Date(),
  question_title: "",
  topic_title: "",
  user_id: "",
  id: -1,
  topic_id: -1,
};

export default function TableCategories(props: TableReportsProps) {
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [filterTopic, setFilterTopic] = React.useState<string>(NO_TOPIC);
  const [reports, setReports] = React.useState<ReportHandled[]>([]);
  const [currentReport, setCurrentReport] = React.useState<ReportHandled>(
    DEFAULT_REPORT
  );
  const [topicTitles, setsetTopicTitles] = React.useState<string[]>([]);
  const [searchText, setSearchText] = React.useState<string>("");
  const [editDialog, setEditDialog] = React.useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);

  React.useEffect(() => {
    setReports(props.reports);
    setsetTopicTitles(props.topics.map((t) => t.title));
  }, [props.reports, props.topics]);

  const classes = useStyles();

  const handleTopicChange = (event: React.ChangeEvent<{ value: string }>) => {
    setFilterTopic(event.target.value);
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
      report.id,
      reports,
      setReports,
      props.currentLanguage,
      props.token,
      props.setLoading,
      setSuccess,
      setError
    );
  };

  const renderRows = (reports: ReportHandled[]) => {
    return reports.map((report: ReportHandled, index: number) => {
      if (
        report.question_title
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        report.topic_title == filterTopic
      ) {
        return (
          <StyledTableRow key={index}>
            <StyledTableCell>{report.topic_title}</StyledTableCell>
            <StyledTableCell>{report.question_title}</StyledTableCell>
            <StyledEditCell>
              {report.reason}
              <div style={{ width: 150 }} className={classes.iconsContainer}>
                <EditIcon
                  className={classes.editIcon}
                  onClick={() => {
                    onEdit(report);
                  }}
                />
                <DeleteIcon
                  onClick={() => {
                    onDelete(report);
                  }}
                  className={classes.deleteIcon}
                />
                <div
                  onClick={() => {
                    onIgnore(report);
                  }}
                  className={classes.ignoreIcon}
                >
                  ignore
                </div>
              </div>
            </StyledEditCell>
          </StyledTableRow>
        );
      }
    });
  };
  return (
    <>
      <div className={classes.headerSection}>
        <SearchBar
          placeholder="Filter Topics"
          setSearchText={(text) => setSearchText(text)}
          searchText={searchText}
        />
        <div>
          <Select
            handleChange={handleTopicChange}
            value={filterTopic}
            values={topicTitles}
            defaultValue={NO_TOPIC}
          />
        </div>
      </div>

      {reports.length > 0 && (
        <CustomTable
          columns={["25%", "50%", "25%"]}
          columnNames={["topic", "question", "reason"]}
          body={renderRows(reports)}
        />
      )}
      {reports.length == 0 && (
        <div className={classes.noItemsAlert}>All Reports have been solved</div>
      )}
      <DeleteDialog
        open={deleteDialog}
        onConfirm={async () => {
          // delete report, delete question
          await onReportDelete(
            currentReport.id,
            reports,
            setReports,
            props.currentLanguage,
            props.token,
            props.setLoading,
            setSuccess,
            setError
          );
          await onQuestionDelete(
            currentReport.id,
            [],
            props.currentLanguage,
            props.token,
            () => {},
            props.setLoading,
            setSuccess,
            setError
          );
          setCurrentReport(DEFAULT_REPORT);
          setDeleteDialog(false);
        }}
        title="Proceed to Delete the question?"
        description="The question record will be removed from the main database. You cannot undo this operation"
        onRefuse={() => {
          setCurrentReport(DEFAULT_REPORT);
          setDeleteDialog(false);
        }}
      />

      <EditDialog
        open={editDialog}
        onConfirm={async (newQuestion: string) => {
          await onReportDelete(
            currentReport.id,
            reports,
            setReports,
            props.currentLanguage,
            props.token,
            props.setLoading,
            setSuccess,
            setError
          );
          await onQuestionUpdate(
            currentReport.id,
            newQuestion,
            currentReport.topic_title,
            [],
            props.topics,
            props.currentLanguage,
            props.token,
            () => {},
            props.setLoading,
            setSuccess,
            setError
          );

          setCurrentReport(DEFAULT_REPORT);
          setEditDialog(false);
        }}
        id={currentReport.id}
        header="Editing question"
        title={currentReport.question_title}
        onRefuse={() => {
          setCurrentReport(DEFAULT_REPORT);
          setEditDialog(false);
        }}
      />
      <TransactionAlert success={success} error={error} />
    </>
  );
}
