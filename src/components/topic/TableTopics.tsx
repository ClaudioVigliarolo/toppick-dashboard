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
import SearchIcon from "@material-ui/icons/Search";
import { getFormattedDate } from "@/utils/time";
import { TopicFeatured } from "@toppick/common/build/interfaces";
import { makeStyles } from "@material-ui/core";
import { COLORS } from "@/constants/colors";
interface TableTopicsProps {
  topics: TopicFeatured[];
  searchText: string;
  onUpdateTopic: (topic: TopicFeatured) => void;
  onUpdateSearch: (topic: TopicFeatured) => void;
  onDeleteTopic: (topic: TopicFeatured) => void;
}

const useLocalStyles = makeStyles((theme) => ({
  searchIcon: {
    cursor: "pointer",
    color: COLORS.blue,
  },
}));

export default function TableTopics({
  searchText,
  topics,
  onDeleteTopic,
  onUpdateTopic,
  onUpdateSearch,
}: TableTopicsProps) {
  const classes = useStyles();
  const localClasses = useLocalStyles();

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
              <div className={classes.iconsContainer} style={{}}>
                <div
                  className={classes.circle}
                  style={{
                    backgroundColor: topic.active ? "lime" : "orangered",
                  }}
                />
                <SearchIcon
                  className={localClasses.searchIcon}
                  onClick={() => {
                    onUpdateSearch(topic);
                  }}
                />
                <EditIcon
                  className={classes.editIcon}
                  onClick={() => {
                    onUpdateTopic(topic);
                  }}
                />
                <DeleteIcon
                  onClick={() => {
                    onDeleteTopic(topic);
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
      columns={["40%", "40%", "10%"]}
      columnNames={["title", "last update", ""]}
      body={renderRows(topics)}
    />
  );
}
