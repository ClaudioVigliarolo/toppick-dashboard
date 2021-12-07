import React from "react";
import { CustomDialog } from "./DialogStyles";
import Select from "../select/ObjectSelect";
import { TextField } from "@material-ui/core";
import { QuestionTopic } from "src/interfaces/Interfaces";
interface QuestionDialogProps {
  topic: QuestionTopic;
  open: boolean;
  onConfirm: (question: string, topic: QuestionTopic) => void;
  onRefuse: () => void;
  topics: QuestionTopic[];
  question: string;
  headerText: string;
  loading: boolean;
}

const NO_TOPIC: QuestionTopic = {
  id: -1,
  title: "Select A Topic",
  active: false,
};

export default function QuestionDialog(props: QuestionDialogProps) {
  const [question, setQuestion] = React.useState<string>("");
  const [topic, setTopic] = React.useState<QuestionTopic>(NO_TOPIC);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (props.open) {
      setQuestion(props.question);
      setTopic(props.topic);
    }
  }, [props.topics, props.topic, props.question]);

  const onSubmit = async (newTopic: QuestionTopic, newQuestion: string) => {
    setError(false);
    if (newTopic.title === NO_TOPIC.title || newQuestion === "") {
      setError(true);
      return;
    }
    props.onConfirm(newQuestion, newTopic);
  };

  const handleChange = (index: number) => {
    setTopic(props.topics[index]);
  };

  return (
    <>
      <CustomDialog
        loading={props.loading}
        open={props.open}
        headerText={props.headerText}
        minWidth={500}
        children={
          <>
            <TextField
              error={error}
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
                values={props.topics.sort((a, b) =>
                  a.title.localeCompare(b.title)
                )}
                color="black"
                header="topic"
                defaultValue={topic}
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
