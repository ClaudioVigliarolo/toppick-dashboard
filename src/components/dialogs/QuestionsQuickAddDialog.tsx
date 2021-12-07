import { TextField } from "@material-ui/core";
import React from "react";
import { Question, Topic } from "src/interfaces/Interfaces";
import { generateQuestions } from "src/utils/topics";
import { countTextLines } from "../../utils/utils";
import { CustomDialog } from "./DialogStyles";

interface QuestionsQuickAddDialogProps {
  open: boolean;
  loading: boolean;
  onConfirm: (questions: Question[]) => void;
  onRefuse: () => void;
  minQuestions: number;
  topic: Topic;
}

export default function QuestionsQuickAddDialog(
  props: QuestionsQuickAddDialogProps
) {
  const [text, setText] = React.useState<string>("");
  const [error, setError] = React.useState(false);

  let linesN = countTextLines(text);

  const onSubmit = async (text: string) => {
    if (linesN < props.minQuestions) {
      setError(true);
    } else {
      props.onConfirm(generateQuestions(text, props.topic));
      setError(false);
    }
  };

  return (
    <>
      <CustomDialog
        loading={props.loading}
        open={props.open}
        headerText={"Quick Add to " + props.topic.title}
        minWidth={600}
        confirmButtonText="Continue"
        refuseButtonText="Close"
        minHeigth={300}
        onConfirm={() => onSubmit(text)}
        onRefuse={props.onRefuse}
      >
        <>
          <TextField
            error={error}
            placeholder="Paste your questions here..."
            multiline
            rows={10}
            rowsMax={10}
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label="text"
            id="standard-helperText"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            fullWidth
          />
          <h2
            style={{
              color: linesN < props.minQuestions ? "orangered" : "blue",
            }}
          >
            Questions: {linesN}
          </h2>
        </>
      </CustomDialog>
    </>
  );
}
