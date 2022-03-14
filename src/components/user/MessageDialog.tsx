import { TextField } from "@material-ui/core";
import React from "react";
import { AppDialog, TabData } from "../ui/dialog/DialogStyles";

interface MessageDialogProps {
  open: boolean;
  loading: boolean;
  onSend: (message: string) => void;
  onRefuse: () => void;
  headerText: string;
}
export default function MessageDialog(props: MessageDialogProps) {
  const [message, setMessage] = React.useState<string>("");
  const [error, setError] = React.useState(false);

  const onSubmit = async (newCategory: string) => {
    setError(false);
    setMessage("");
    if (newCategory == "") {
      setError(true);
      return;
    }
    props.onSend(newCategory);
  };

  const tabs: TabData[] = [
    {
      label: "Message",
      children: (
        <>
          <TextField
            error={error}
            placeholder="Type email message here..."
            multiline
            rows={10}
            rowsMax={10}
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label="text"
            id="standard-helperText"
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            fullWidth
          />
        </>
      ),
    },
  ];

  return (
    <>
      <AppDialog
        loading={props.loading}
        open={props.open}
        headerText={"Write to:   " + props.headerText}
        minWidth={600}
        confirmButtonText="Send"
        refuseButtonText="Close"
        minHeight={300}
        onConfirm={() => onSubmit(message)}
        onRefuse={props.onRefuse}
        tabData={tabs}
        showTabs={false}
        confirmButtonDisabled={false}
      ></AppDialog>
    </>
  );
}
