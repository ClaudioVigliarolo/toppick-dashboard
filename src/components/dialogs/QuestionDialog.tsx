import React from "react";
import { CustomDialog } from "./DialogStyles";
import Select from "../select/Select";
import { TextField } from "@material-ui/core";
interface QuestionDialogProps {
  topic: string;
  open: boolean;
  onConfirm: (question: string, topic: string) => void;
  onRefuse: () => void;
  topics: string[];
  question: string;
  headerText: string;
}
const NO_TOPIC = "Select a topic";

export default function QuestionDialog(props: QuestionDialogProps) {
  const [question, setQuestion] = React.useState<string>("");
  const [topic, setTopic] = React.useState<string>("");
  const [topics, setTopics] = React.useState<string[]>([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (props.open) {
      setQuestion(props.question);
      setTopic(props.topic);
      setTopics(props.topics);
    }
  }, [props.topics, props.topic, props.question]);

  const onSubmit = async (newTopic: string, newQuestion: string) => {
    setError(false);
    if (newTopic == "" || newQuestion == "") {
      setError(true);
      return;
    }
    props.onConfirm(newQuestion, newTopic);
  };

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setTopic(event.target.value);
  };

  return (
    <>
      <CustomDialog
        open={props.open}
        headerText={props.headerText}
        minWidth={500}
        children={
          <>
            <TextField
              error={error}
              autoFocus
              InputLabelProps={{ shrink: true }}
              margin="dense"
              label="question"
              id="standard-helperText"
              value={question}
              onChange={(e) => setQuestion(e.currentTarget.value)}
              fullWidth
            />
            <div style={{ alignSelf: "center", marginTop: 10 }}>
              <Select
                handleChange={handleChange}
                value={topic}
                values={topics}
                color="black"
                header="topic"
                defaultValue={NO_TOPIC}
              />
            </div>
          </>
        }
        onConfirm={() => {
          onSubmit(topic, question);
        }}
        onRefuse={props.onRefuse}
      />
    </>
  );
}
