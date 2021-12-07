import { TextField } from "@material-ui/core";
import React from "react";
import { CustomDialog } from "./DialogStyles";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import CloseIcon from "@material-ui/icons/Close";
import { Question } from "src/interfaces/Interfaces";
interface ArticlesDialogProps {
  open: boolean;
  onConfirm: (q: Question) => void;
  onRefuse: () => void;
  question: Question;
  headerText: string;
}

export default function ArticlesDialog(props: ArticlesDialogProps) {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [link, setLink] = React.useState<string>("");
  const [error, setError] = React.useState(false);
  const [preview, setPreview] = React.useState(false);

  React.useEffect(() => {
    setTitle(props.question.title);
    setDescription(
      props.question.description ? props.question.description : ""
    );
    setLink(props.question.link ? props.question.link : "");
    setPreview(false);
  }, [props.question]);

  const onConfirm = async () => {
    setError(false);
    if (!title) {
      setError(true);
      return;
    }
    props.onConfirm({ ...props.question, description, link, title });
  };

  return (
    <>
      <CustomDialog
        open={props.open}
        headerText={preview ? "Preview" : props.headerText}
        minWidth={600}
        minHeigth={450}
        onConfirm={onConfirm}
        onRefuse={props.onRefuse}
        loading={false}
      >
        <>
          {!preview && (
            <>
              <VisibilityOutlinedIcon
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  cursor: "pointer",
                  color: "orange",
                  fontSize: 30,
                }}
                onClick={() => setPreview(true)}
              />
              <TextField
                error={error}
                InputLabelProps={{ shrink: true }}
                margin="dense"
                label="Question"
                id="standard-helperText"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                fullWidth
              />
              <TextField
                error={error}
                placeholder="Type or Paste the Description here..."
                multiline
                rows={10}
                rowsMax={10}
                InputLabelProps={{ shrink: true }}
                margin="dense"
                label="title"
                id="standard-helperText"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
              <TextField
                error={error}
                InputLabelProps={{ shrink: true }}
                margin="dense"
                label="Link"
                placeholder="Paste the Link to the Article here"
                id="standard-helperText"
                value={link}
                onChange={(e) => setLink(e.currentTarget.value)}
                fullWidth
              />
            </>
          )}
          {preview && (
            <>
              <CloseIcon
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  cursor: "pointer",
                  color: "orange",
                  fontSize: 30,
                }}
                onClick={() => setPreview(false)}
              />
              <LinkPreview url={link} width="400px" height="400px" />
            </>
          )}
        </>
      </CustomDialog>
    </>
  );
}
