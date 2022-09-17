import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { COLORS } from "@/styles/colors";
import { createStyles, makeStyles, Tab, Tabs } from "@material-ui/core";

export const useAppDialogStyles = makeStyles(() =>
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
    },
    closeButton: {
      color: COLORS.darkerOrange,
    },

    confirmButton: {
      color: COLORS.blue,
    },
    errorContainer: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
    },
    errorText: {
      color: COLORS.red,
      textAlign: "center",
    },
    tabContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 20,
    },
    fieldContainer: {
      width: "90%",
      display: "flex",
      justifyContent: "center",
      margin: 5,
      backgroundColor: "red",
    },
    imageContainer: {
      marginTop: 20,
      marginBottom: 10,
      height: 200,
    },
    selectContainer: {
      marginTop: 20,
    },
    selectField: {
      marginTop: 20,
      width: 200,
    },
    topRightIcon: {
      position: "absolute",
      top: 20,
      right: 20,
      cursor: "pointer",
      color: "orange",
    },
  })
);

export interface TabData {
  children: React.ReactNode;
  label: string;
  isHidden?: boolean;
}
interface TabPanelProps extends TabData {
  index: number;
  value: number;
}

interface AppDialogProps {
  open: boolean;
  onConfirm?: () => void;
  loading?: boolean;
  confirmButtonText?: string;
  onRefuse: () => void;
  refuseButtonText?: string;
  headerText: string;
  tabData: TabData[];
  minWidth?: number;
  minHeight?: number;
  confirmButtonDisabled?: boolean;
  showTabs?: boolean;
  error?: string;
}

function TabPanel({ children, index, value }: TabPanelProps) {
  const classes = useAppDialogStyles();
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

export const AppDialog = ({
  open,
  onConfirm,
  confirmButtonText = "Confirm",
  onRefuse,
  refuseButtonText = "Close",
  headerText,
  tabData = [],
  minWidth = 400,
  minHeight = 400,
  loading = false,
  showTabs = true,
  error,
  confirmButtonDisabled = false,
}: AppDialogProps) => {
  const [value, setValue] = React.useState(0);
  const classes = useAppDialogStyles();

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
        <DialogTitle>{headerText}</DialogTitle>

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
              {tabData
                .filter((tab) => !tab.isHidden)
                .map((t, i) => (
                  <Tab key={i} label={t.label} />
                ))}
            </Tabs>
          )}

          {tabData.map((t, i) => (
            <TabPanel key={i} label={t.label} index={i} value={value}>
              {t.children}
            </TabPanel>
          ))}
          <div className={classes.errorContainer}>
            <h4 className={classes.errorText}>{error}</h4>
          </div>
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
              {onConfirm && (
                <Button
                  onClick={onConfirm}
                  style={{
                    color: confirmButtonDisabled
                      ? COLORS.lightGrey
                      : COLORS.blue,
                  }}
                  disabled={confirmButtonDisabled}
                >
                  {confirmButtonText}
                </Button>
              )}
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};
