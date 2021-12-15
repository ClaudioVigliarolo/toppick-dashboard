import React from "react";
import { createStyles, makeStyles, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Question } from "src/interfaces/Interfaces";
import DeleteIcon from "@material-ui/icons/Delete";

interface TranslateQuestionFieldProps {
  index: number;
  onChange: (index: number, question: Question) => void;
  onCreate: (index: number) => void;
  onDelete: (index: number) => void;
  sourceQuestion: Question;
  targetQuestion: Question;
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      backgroundColor: "white",
      padding: 30,
      paddingTop: 20,
      paddingBottom: 50,
      margin: 30,
      borderRadius: 5,
      position: "relative",
      display: "flex",
      flexDirection: "column",
    },
    AddIconContainer: {
      display: "flex",
      bottom: -15,
      right: "50%",
      left: "50%",
      transform: "translate(-50%, 0)",
      position: "absolute",
      width: 100,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
    },

    DeleteIconContainer: {
      right: 5,
      top: 5,
      position: "absolute",
      width: 100,
      height: 30,
      backgroundColor: "transparent",
      paddingLeft: 60,
    },
  })
);

export default function TranslateQuestionField({
  onChange,
  sourceQuestion,
  targetQuestion,
  onDelete,
  onCreate,
  index,
}: TranslateQuestionFieldProps) {
  const [showAdd, setShowAdd] = React.useState<boolean>(false);
  const [showDelete, setShowDelete] = React.useState<boolean>(false);
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <TextField
        id="outlined-multiline-flexible"
        label={"Source n°" + (index + 1)}
        style={{ width: "50vw" }}
        multiline
        disabled={true}
        rowsMax={2}
        value={sourceQuestion.title}
      />
      <TextField
        id="outlined-multiline-flexible"
        label={"Translated n°" + (index + 1)}
        style={{ width: "50vw", marginTop: 20 }}
        multiline
        rowsMax={2}
        value={targetQuestion.title}
        onChange={(e) =>
          onChange(index, { ...targetQuestion, title: e.target.value })
        }
      />
      <div
        className={classes.AddIconContainer}
        style={{ backgroundColor: showAdd ? "orangered" : "transparent" }}
        onMouseEnter={() => setShowAdd(true)}
        onMouseLeave={() => setShowAdd(false)}
      >
        {showAdd && (
          <AddIcon
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => onCreate(index)}
          />
        )}
      </div>

      <div
        className={classes.DeleteIconContainer}
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
