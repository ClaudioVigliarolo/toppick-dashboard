import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { COLORS } from "../../constants/Colors";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  closeButton: {
    color: COLORS.darkerOrange,
  },

  confirmButton: {
    color: COLORS.blue,
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertDialogSlideProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onRefuse: () => void;
  children?: React.ReactNode;
}
export default function ConfirmDialog({
  children,
  description,
  onConfirm,
  onRefuse,
  open,
  title,
}: AlertDialogSlideProps) {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {description}
        </DialogContentText>
        <div className={classes.contentContainer}>{children}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onRefuse} className={classes.closeButton}>
          Close
        </Button>
        <Button onClick={onConfirm} className={classes.confirmButton}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
