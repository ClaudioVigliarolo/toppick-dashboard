import { TextField } from "@material-ui/core";
import React from "react";
import { AppDialog, TabData } from "../ui/dialog/DialogStyles";
import { AuthContext } from "@/context/AuthContext";
import {
  QuestionCreated,
  TopicFeatured,
} from "@toppick/common/build/interfaces";

interface QuestionsQuickAddDialogProps {
  open: boolean;
  loading: boolean;
  onConfirm: (questions: QuestionCreated[]) => void;
  onRefuse: () => void;
  minQuestions: number;
  topic: TopicFeatured;
}

const getLinesFromText = (inputText: string): string[] => {
  if (!inputText) return [];
  let lines = inputText.match(/[^\r\n]+/g);
  if (lines) {
    lines = lines.filter((l) => l.replace(/\s/g, "").length > 0);
  }
  return lines ? lines : [];
};

const countTextLines = (inputText: string): number => {
  if (!inputText) return 0;
  let lines = inputText.match(/[^\r\n]+/g);
  if (lines) {
    lines = lines.filter((l) => l.replace(/\s/g, "").length > 0);
  }
  return lines ? lines.length : 0;
};

const generateQuestions = (
  text: string,
  topic: TopicFeatured,
  userId: string
): QuestionCreated[] => {
  const questionsStr = getLinesFromText(text);
  const questions: any[] = questionsStr.map((title, index) => ({
    timestamp: new Date(),
    title: title,
    answers: [],
    user_id: userId,
    resources: [],
  }));

  return questions;
};

export default function QuestionsQuickAddDialog(
  props: QuestionsQuickAddDialogProps
) {
  const [text, setText] = React.useState<string>("");
  const { userId } = React.useContext(AuthContext);

  let linesN = countTextLines(text);

  const onConfirm = async () => {
    props.onConfirm(generateQuestions(text, props.topic, userId));
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
            minRows={10}
            maxRows={10}
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
      <AppDialog
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
