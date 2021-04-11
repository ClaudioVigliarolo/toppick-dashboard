import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { ListItemText } from "@material-ui/core";

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
        style={{ backgroundColor: "white", marginBottom: 25 }}
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
        height={1000}
        width={1000}
        itemSize={70}
        itemCount={questions.length}
      >
        {renderRow}
      </FixedSizeList>
      {children}
    </div>
  );
}
