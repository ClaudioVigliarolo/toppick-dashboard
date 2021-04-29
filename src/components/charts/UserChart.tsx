import React from "react";
import CardNumber from "../custom/CardNumber";
import Tabs from "../switches/Tabs";
import Button from "../buttons/TabButton";
import { COLORS } from "src/constants/Colors";
import { createStyles, makeStyles } from "@material-ui/core";
import { Lang } from "src/interfaces/Interfaces";

interface TabButton {
  label: string;
}

const tabButtons: TabButton[] = [
  { label: "Categories" },
  { label: "Topics" },
  { label: "Questions" },
];

const useStyles = makeStyles(() =>
  createStyles({
    tabsContainer: {
      width: 350,
      height: 150,
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
    },
    container: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      backgroundColor: "green",
      height: "100%",
    },
    chartContainer: {
      backgroundColor: "red",
    },
  })
);

interface DBChartBarProps {
  currentLanguage: Lang;
  token: string;
}
export default function DBChartBar({
  currentLanguage,
  token,
}: DBChartBarProps) {
  const [index, setIndex] = React.useState<number>(0);
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.tabsContainer}>
        {tabButtons.map((t, i) => (
          <Button
            label={t.label}
            selected={index === i}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <div className={classes.tabsContainer}>
        {tabButtons.map((t, i) => (
          <Button
            label={t.label}
            selected={index === i}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <div className={classes.chartContainer}></div>
    </div>
  );
}
