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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface EditDialogProps {
  open: boolean;
  header: string;
  title: string;
  id: number;
  onConfirm: any;
  onRefuse: any;
}
export default function EditDialog(props: EditDialogProps) {
  const [title, setTitle] = React.useState<string>('');
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setTitle(props.title);
  }, [props.title]);

  const onSubmit = async () => {
    setError(false);
    if (title == '') {
      setError(true);
      //set error
      return;
    }
    props.onConfirm(title);
  };
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{props.header}</DialogTitle>

        <DialogContent style={{ minWidth: 600 }}>
          <TextField
            autoFocus
            error={error}
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label="Title"
            id="standard-helperText"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.onRefuse}
            style={{ color: COLORS.darkerOrange }}
          >
            Revert
          </Button>
          <Button onClick={onSubmit} style={{ color: COLORS.blue }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
