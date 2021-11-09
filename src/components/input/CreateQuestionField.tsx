import React from "react";
import { TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Question } from "src/interfaces/Interfaces";
import DeleteIcon from "@material-ui/icons/Delete";

interface QuestionTextFieldProps {
  index: number;
  onChange: (index: number, question: Question) => void;
  onAdd: (index: number) => void;
  onDelete: (index: number) => void;
  question: Question;
}

export default function QuestionTextField({
  onChange,
  question,
  onDelete,
  onAdd,
  index,
}: QuestionTextFieldProps) {
  const [showAdd, setShowAdd] = React.useState<boolean>(false);
  const [showDelete, setShowDelete] = React.useState<boolean>(false);

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: 30,
        paddingTop: 20,
        paddingBottom: 50,
        margin: 30,
        borderRadius: 5,
        position: "relative",
      }}
    >
      <TextField
        id="outlined-multiline-flexible"
        label={"Question " + (index + 1)}
        style={{ width: "50vw" }}
        multiline
        rowsMax={2}
        value={question.title}
        onChange={(e) =>
          onChange(index, { ...question, title: e.target.value })
        }
      />
      <div
        style={{
          display: "flex",
          bottom: -15,
          right: "50%",
          left: "50%",
          transform: "translate(-50%, 0)",
          position: "absolute",
          width: 100,
          height: 30,
          backgroundColor: showAdd ? "orangered" : "transparent",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={() => setShowAdd(true)}
        onMouseLeave={() => setShowAdd(false)}
      >
        {showAdd && (
          <AddIcon
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => onAdd(index)}
          />
        )}
      </div>

      <div
        style={{
          right: 5,
          top: 5,
          position: "absolute",
          width: 100,
          height: 30,
          backgroundColor: "transparent",
          paddingLeft: 60,
        }}
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
      >
        {showDelete && (
          <div>
            <DeleteIcon
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => {
                onDelete(index);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
