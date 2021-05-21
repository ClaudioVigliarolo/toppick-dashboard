import React from "react";
import {
  CustomTable,
  StyledEditCell,
  StyledTableCell,
  StyledTableRow,
  useStyles,
} from "./TableStyles";
import { Question } from "../../interfaces/Interfaces";
import { getFormattedDate } from "../../utils/utils";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

interface TableQuestionsProps {
  onEdit: (q: Question) => void;
  onDelete: (q: Question) => void;
  questions: Question[];
  searchText: string;
}

export default function TableQuestions({
  onDelete,
  onEdit,
  searchText,
  questions,
}: TableQuestionsProps) {
  const classes = useStyles();

  const renderRows = (questions: Question[]) => {
    return questions.map((question: Question, index: number) => {
      if (
        question.topic.title.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return (
          <StyledTableRow key={index}>
            <StyledTableCell>{question.topic.title}</StyledTableCell>

            <StyledTableCell>
              {getFormattedDate(question.timestamp)}
            </StyledTableCell>

            <StyledEditCell>
              {question.title}
              <div className={classes.iconsContainer}>
                <EditIcon
                  className={classes.editIcon}
                  onClick={() => {
                    onEdit(question);
                  }}
                />
                <DeleteIcon
                  onClick={() => {
                    onDelete(question);
                  }}
                  className={classes.deleteIcon}
                />
              </div>
            </StyledEditCell>
          </StyledTableRow>
        );
      }
    });
  };

  return (
    <CustomTable
      columns={["15%", "15%", "70%"]}
      columnNames={["topic", "last update", "question"]}
      body={renderRows(questions)}
    />
  );
}
