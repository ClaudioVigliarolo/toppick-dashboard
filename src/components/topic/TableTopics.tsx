import React from "react";
import {
  CustomTable,
  StyledEditCell,
  StyledTableRow,
  useStyles,
  StyledTableCell,
} from "../ui/TableStyles";
import { Topic, TopicRelated } from "@/interfaces/dash_topics";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { getFormattedDate } from "@/utils/utils";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import UserAvatar from "react-user-avatar";
interface TableTopicsProps {
  topics: Topic[];
  searchText: string;
  onUpdate: (categ: Topic) => void;
  onDelete: (categ: Topic) => void;
}

export default function TableTopics({
  searchText,
  topics,
  onDelete,
  onUpdate,
}: TableTopicsProps) {
  const classes = useStyles();

  const renderRows = (topics: Topic[]) => {
    return topics.map((topic: Topic, index: number) => {
      if (topic.title.toLowerCase().includes(searchText.toLowerCase())) {
        return (
          <StyledTableRow key={index}>
            <StyledTableCell>{topic.title}</StyledTableCell>
            <StyledTableCell>
              {getFormattedDate(topic.timestamp)}
            </StyledTableCell>
            <StyledEditCell
              style={{ color: topic.related.length === 0 ? "red" : "black" }}
            >
              {topic.related
                .slice(0, 3)
                .map((r: TopicRelated) => r.title + " ")}
              {topic.related.length > 3 && "..."}
              {topic.related.length === 0 && "Warning, no related topic!"}
              <div className={classes.iconsContainer} style={{ width: 150 }}>
                <div>
                  <SpellcheckIcon
                    style={{
                      color: topic.approved ? "lime" : "orangered",
                    }}
                  />
                </div>
                <div
                  className={classes.circle}
                  style={{
                    backgroundColor: topic.active ? "lime" : "orangered",
                  }}
                />
                <EditIcon
                  className={classes.editIcon}
                  onClick={() => {
                    onUpdate(topic);
                  }}
                />
                <DeleteIcon
                  onClick={() => {
                    onDelete(topic);
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
      columns={["15%", "20%", "45%"]}
      columnNames={["title", "last update", "related"]}
      body={renderRows(topics)}
    />
  );
}