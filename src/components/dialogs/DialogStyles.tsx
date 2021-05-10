import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { COLORS } from "../../constants/Colors";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface TextDialogProps {
  open: boolean;
  onConfirm: () => void;
  confirmButtonText?: string;
  onRefuse: () => void;
  refuseButtonText?: string;
  headerText: string;
  children?: React.ReactNode;
  minWidth?: number;
  minHeigth?: number;
}
export const CustomDialog = ({
  open,
  onConfirm,
  confirmButtonText = "Confirm",
  onRefuse,
  refuseButtonText = "Close",
  headerText,
  children,
  minWidth = 400,
  minHeigth = 0,
}: TextDialogProps) => {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{headerText}</DialogTitle>

        <DialogContent
          style={{
            minWidth: minWidth,
            alignItems: "center",
            minHeight: minHeigth,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {children}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onRefuse} style={{ color: COLORS.darkerOrange }}>
            {refuseButtonText}
          </Button>
          <Button onClick={onConfirm} style={{ color: COLORS.blue }}>
            {confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
