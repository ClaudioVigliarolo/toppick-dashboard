import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { COLORS } from "../../constants/Colors";
import { makeStyles, TextField } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ReportDialogProps {
  open: boolean;
  header: string;
  title: string;
  id: number;
  onConfirm: (title: string) => void;
  onRefuse: () => void;
}

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    minWidth: 600,
  },
  confirmButton: {
    color: COLORS.blue,
  },
  refuseButton: {
    color: COLORS.darkerOrange,
  },
}));

export default function ReportDialog(props: ReportDialogProps) {
  const [title, setTitle] = React.useState<string>("");
  const [error, setError] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    setTitle(props.title);
  }, [props.title]);

  const onSubmit = async () => {
    setError(false);
    if (title == "") {
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

        <DialogContent className={classes.dialogContent}>
          <TextField
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
          <Button onClick={props.onRefuse} className={classes.refuseButton}>
            Revert
          </Button>
          <Button onClick={onSubmit} className={classes.confirmButton}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
