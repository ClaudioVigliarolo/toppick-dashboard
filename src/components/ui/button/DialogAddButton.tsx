import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import { useDialogStyles } from "@/components/ui/dialog/Dialog";

const useStyles = makeStyles(() => ({
  container: {
    alignSelf: "center",
    width: "100%",
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
  },
  button: {
    width: 200,
  },
}));

interface DialogAddButtonProps {
  onClick: () => void;
  title: string;
}

export default function DialogAddButton({
  onClick,
  title,
}: DialogAddButtonProps) {
  const classes = {
    ...useDialogStyles(),
    ...useStyles(),
  };

  return (
    <div className={classes.container}>
      <Button
        color="primary"
        size="small"
        onClick={onClick}
        className={classes.button}
      >
        {title}
      </Button>
    </div>
  );
}
