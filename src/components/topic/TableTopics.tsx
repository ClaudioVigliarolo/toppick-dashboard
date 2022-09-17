import React from "react";
import {
  AppTable,
  StyledEditCell,
  StyledTableRow,
  StyledTableCell,
  useAppTableStyles,
} from "../ui/Table";
import SearchIcon from "@material-ui/icons/Search";
import { getFormattedDate } from "@/utils/time";
import { TopicFeatured } from "@toppick/common/build/interfaces";
import { makeStyles } from "@material-ui/core";
import { COLORS } from "@/styles/colors";
import { useAppStyles } from "@/styles/common";
import DeleteIcon from "../ui/icon/DeleteIcon";
import EditIcon from "../ui/icon/EditIcon";
interface TableTopicsProps {
  topics: TopicFeatured[];
  searchText: string;
  onUpdateTopic: (topic: TopicFeatured) => void;
  onUpdateSearch: (topic: TopicFeatured) => void;
  onDeleteTopic: (topic: TopicFeatured) => void;
}

const useStyles = makeStyles(() => ({
  iconsContainer: {
    position: "absolute",
    right: 30,
    color: "orange",
    top: "30%",
    cursor: "pointer",
    width: 150,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchIcon: {
    cursor: "pointer",
    color: COLORS.blue,
  },
  circle: {
    display: "flex",
    width: 10,
    height: 10,
    borderRadius: "50%",
    textAlign: "center",
    alignSelf: "center",
  },
}));

export default function TableTopics({
  searchText,
  topics,
  onDeleteTopic,
  onUpdateTopic,
  onUpdateSearch,
}: TableTopicsProps) {
  const classes = { ...useAppTableStyles(), ...useStyles() };

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
              <div className={classes.iconsContainer}>
                <div
                  className={classes.circle}
                  style={{
                    backgroundColor: topic.active ? "lime" : "orangered",
                  }}
                />
                <SearchIcon
                  className={classes.searchIcon}
                  onClick={() => {
                    onUpdateSearch(topic);
                  }}
                />
                <EditIcon
                  onClick={() => {
                    onUpdateTopic(topic);
                  }}
                />
                <DeleteIcon
                  onClick={() => {
                    onDeleteTopic(topic);
                  }}
                />
              </div>
            </StyledEditCell>
          </StyledTableRow>
        );
      }
    });
  };

  return (
    <AppTable
      columns={["40%", "40%", "20%"]}
      columnNames={["title", "last update", ""]}
      body={renderRows(topics)}
    />
  );
}
