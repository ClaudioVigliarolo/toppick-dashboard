import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    alignSelf: "center",
  },
  indicator: {
    backgroundColor: "white",
    minHeight: 100,
    height: 100,
  },
}));

interface MyTab {
  children: React.ReactNode[];
  label: string;
}

interface SimpleTabsProps {
  tabs: MyTab[];
}

export default function SimpleTabs({ tabs }: SimpleTabsProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  //i children in tab panel
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          color="white"
          centered
          classes={{
            indicator: classes.indicator,
          }}
        >
          {tabs.map((t, index) => {
            <Tab label={t.label} {...a11yProps(index)} />;
          })}
        </Tabs>
      </AppBar>

      {tabs.map((tab, index) => (
        <TabPanel value={value} index={index}>
          {tab.children}
        </TabPanel>
      ))}
    </div>
  );
}
