import React from "react";
import {
  CustomTable,
  StyledEditCell,
  StyledTableRow,
  useStyles,
  StyledTableCell,
} from "../ui/TableStyles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { getFormattedDate } from "@/utils/utils";
import { TopicFeatured } from "@toppick/common";
interface TableTopicsProps {
  topics: TopicFeatured[];
  searchText: string;
  onUpdate: (topic: TopicFeatured) => void;
  onDelete: (topic: TopicFeatured) => void;
}

export default function TableTopics({
  searchText,
  topics,
  onDelete,
  onUpdate,
}: TableTopicsProps) {
  const classes = useStyles();

  const renderRows = (topics: TopicFeatured[]) => {
    return topics.map((topic: TopicFeatured, index: number) => {
      if (topic.title.toLowerCase().includes(searchText.toLowerCase())) {
        return (
          <StyledTableRow key={index}>
            <StyledTableCell>{topic.title}</StyledTableCell>
            <StyledTableCell>
              {getFormattedDate(topic.timestamp)}
            </StyledTableCell>
            <StyledEditCell>
              <div className={classes.iconsContainer} style={{ width: 100 }}>
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
      columns={["30%", "40%", "30%"]}
      columnNames={["title", "last update", ""]}
      body={renderRows(topics)}
    />
  );
}
