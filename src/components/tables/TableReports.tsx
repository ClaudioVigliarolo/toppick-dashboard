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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  onQuestionDelete,
  onQuestionUpdate,
  onReportDelete,
} from "src/utils/topics";

interface TableReportsProps {
  reports: ReportHandled[];
  topics: Topic[];
  filterTopic: string;
  onEdit: (report: ReportHandled) => void;
  onDelete: (report: ReportHandled) => void;
  onIgnore: (report: ReportHandled) => void;
  searchText: string;
}

export default function TableCategories({
  searchText,
  onDelete,
  onEdit,
  reports,
  topics,
  filterTopic,
  onIgnore,
}: TableReportsProps) {
  const classes = useStyles();

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
    <CustomTable
      columns={["25%", "50%", "25%"]}
      columnNames={["topic", "question", "reason"]}
      body={renderRows(reports)}
    />
  );
}
