import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { COLORS } from '../../constants/Colors';
import { TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface TextDialogProps {
  open: boolean;
  onConfirm: any;
  confirmButtonText?: string;
  onRefuse: any;
  refuseButtonText?: string;
  headerText: string;
  children?: React.ReactNode;
  minWidth: number;
}
export const CustomDialog = (props: TextDialogProps) => {
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {props.headerText}
        </DialogTitle>

        <DialogContent
          style={{ minWidth: props.minWidth, alignItems: 'center' }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            {props.children}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.onRefuse}
            style={{ color: COLORS.darkerOrange }}
          >
            {props.refuseButtonText ? props.refuseButtonText : 'Close'}
          </Button>
          <Button onClick={props.onConfirm} style={{ color: COLORS.blue }}>
            {props.confirmButtonText ? props.confirmButtonText : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
