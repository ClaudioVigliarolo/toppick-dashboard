import { TextField } from "@material-ui/core";
import React from "react";
import { Dialog, TabData } from "../ui/dialog/Dialog";

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
            minRows={10}
            maxRows={10}
            InputLabelProps={{ shrink: true }}
            label="text"
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
      <Dialog
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
      />
    </>
  );
}
