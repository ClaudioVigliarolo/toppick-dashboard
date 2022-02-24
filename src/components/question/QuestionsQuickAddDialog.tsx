import { TextField } from "@material-ui/core";
import React from "react";
import { Question, Topic } from "@/interfaces/dash_topics";
import { generateQuestions } from "@/utils/topics";
import { countTextLines } from "@/utils/utils";
import { CustomDialog, TabData } from "../ui/dialog/DialogStyles";

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

  let linesN = countTextLines(text);

  const onConfirm = async () => {
    props.onConfirm(generateQuestions(text, props.topic));
  };

  const onRefuse = async () => {
    setText("");
    props.onRefuse();
  };

  const tabs: TabData[] = [
    {
      label: "Questions",
      children: (
        <>
          <TextField
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
      ),
    },
  ];

  return (
    <>
      <CustomDialog
        loading={props.loading}
        open={props.open}
        minWidth={600}
        confirmButtonText="Continue"
        refuseButtonText="Close"
        headerText={"Quick Add to " + props.topic.title}
        minHeight={300}
        onConfirm={onConfirm}
        onRefuse={onRefuse}
        confirmButtonDisabled={linesN < props.minQuestions}
        tabData={tabs}
        showTabs={false}
      />
    </>
  );
}
