import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { COLORS } from "@/constants/colors";
import { createStyles, makeStyles, Tab, Tabs } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: "relative",
    },
    dialogContentContainer: {
      display: "flex",
      flexDirection: "column",
    },

    dialogActionContainer: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      marginBottom: 20,
    },

    circularProgress: {
      color: COLORS.primaryOrange,
      alignSelf: "center",
    },

    tabPanelContainer: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      marginTop: 20,
    },
    closeButton: {
      color: COLORS.darkerOrange,
    },

    confirmButton: {
      color: COLORS.blue,
    },
  })
);

export interface TabData {
  children: React.ReactNode;
  label: string;
}
interface TabPanelProps extends TabData {
  index: number;
  value: number;
}

interface CustomDialogProps {
  open: boolean;
  onConfirm: () => void;
  loading: boolean;
  confirmButtonText?: string;
  onRefuse: () => void;
  refuseButtonText?: string;
  headerText: string;
  tabData: TabData[];
  minWidth?: number;
  minHeight?: number;
  confirmButtonDisabled?: boolean;
  showTabs?: boolean;
}

function TabPanel({ children, index, value }: TabPanelProps) {
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      className={classes.tabPanelContainer}
    >
      {value === index && <>{children} </>}
    </div>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CustomDialog = ({
  open,
  onConfirm,
  confirmButtonText = "Confirm",
  onRefuse,
  refuseButtonText = "Close",
  headerText,
  tabData = [],
  minWidth = 400,
  minHeight = 400,
  loading,
  showTabs = true,
  confirmButtonDisabled = false,
}: CustomDialogProps) => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.container}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{headerText}</DialogTitle>

        <DialogContent
          className={classes.dialogContentContainer}
          style={{
            minWidth,
            minHeight,
          }}
        >
          {showTabs && (
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              color="primary"
              centered
            >
              {tabData.map((t, i) => (
                <Tab key={i} label={t.label} />
              ))}
            </Tabs>
          )}

          {tabData.map((t, i) => (
            <TabPanel key={i} label={t.label} index={i} value={value}>
              {t.children}
            </TabPanel>
          ))}
        </DialogContent>
        <DialogActions>
          {loading ? (
            <div className={classes.dialogActionContainer}>
              <CircularProgress className={classes.circularProgress} />
            </div>
          ) : (
            <>
              <Button onClick={onRefuse} className={classes.closeButton}>
                {refuseButtonText}
              </Button>
              <Button
                onClick={onConfirm}
                style={{
                  color: confirmButtonDisabled ? COLORS.lightGrey : COLORS.blue,
                }}
                disabled={confirmButtonDisabled}
              >
                {confirmButtonText}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};
