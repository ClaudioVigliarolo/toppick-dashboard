import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { COLORS } from "../../constants/Colors";
import { Tab, Tabs } from "@material-ui/core";

export interface TabData {
  children: React.ReactNode;
  label: string;
}
interface TabPanelProps extends TabData {
  index: number;
  value: number;
}

function TabPanel({ children, index, value }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: 20,
      }}
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

interface TextDialogProps {
  open: boolean;
  onConfirm: () => void;
  loading: boolean;
  confirmButtonText?: string;
  onRefuse: () => void;
  refuseButtonText?: string;
  headerText: string;
  tabData: TabData[];
  minWidth?: number;
  minHeigth?: number;
  confirmButtonDisabled?: boolean;
}
export const CustomDialog = ({
  open,
  onConfirm,
  confirmButtonText = "Confirm",
  onRefuse,
  refuseButtonText = "Close",
  headerText,
  tabData,
  minWidth = 400,
  minHeigth = 400,
  loading,
  confirmButtonDisabled = false,
}: TextDialogProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ position: "relative" }}>
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
            flexDirection: "column",
            display: "flex",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            {tabData.map((t) => (
              <Tab label={t.label} />
            ))}
          </Tabs>

          {tabData.map((t, i) => (
            <TabPanel
              label={t.label}
              index={i}
              value={value}
              children={t.children}
            />
          ))}
        </DialogContent>
        <DialogActions>
          {loading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <CircularProgress
                style={{ color: COLORS.primaryOrange, alignSelf: "center" }}
              />
            </div>
          ) : (
            <>
              <Button onClick={onRefuse} style={{ color: COLORS.darkerOrange }}>
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
