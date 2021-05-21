import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { ListItemText } from "@material-ui/core";
import { CONSTANTS } from "src/constants/constants";
const LIST_ITEM_HEIGTH = 100;
const LIST_ITEM_MARGIN = 25;

export default function QuestionsList({
  questions,
  children,
}: {
  questions: string[];
  children: React.ReactNode;
}) {
  function renderRow(props: ListChildComponentProps) {
    const { index } = props;
    return (
      <ListItem
        button
        key={index}
        style={{
          backgroundColor: "white",
          marginBottom: 25,
          height: LIST_ITEM_HEIGTH,
        }}
      >
        <ListItemText secondary={questions[index]} primary={index + 1} />
      </ListItem>
    );
  }

  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <FixedSizeList
        width={
          window.innerWidth > CONSTANTS.SMALL_SCREEN
            ? window.innerWidth * 0.7
            : window.innerWidth * 0.5
        }
        height={questions.length * (LIST_ITEM_MARGIN + LIST_ITEM_HEIGTH)}
        itemSize={70}
        itemCount={questions.length}
      >
        {renderRow}
      </FixedSizeList>
      {children}
    </div>
  );
}
