import React from "react";
import ChartTab from "@/components/stats/ChartTab";
import Button from "@/components/ui/button/TabButton";
import {
  getTodayEnd,
  getTodayStart,
  getLastWeekStart,
  getLastYearStart,
  getLastThreeMonthsStart,
  getLastMonthStart,
  getYesterdayStart,
} from "@/utils/time";
import { makeStyles } from "@material-ui/core";
import { COLORS } from "@/styles/colors";
import { AuthContext } from "@/context/AuthContext";
import {} from "@toppick/common/build/api";
import { getAuthToken } from "@/utils/auth";

interface ChartButton {
  label: string;
  chartIndex: number;
}

interface DateButton {
  label: string;
  from: Date;
  until: Date;
}

enum ChartIndex {
  UsersChart,
}

const dateButtons: DateButton[] = [
  {
    label: "Today",
    from: getTodayStart(),
    until: getTodayEnd(),
  },
  {
    label: "Yesterday",
    from: getYesterdayStart(),
    until: getTodayStart(),
  },
  {
    label: "Week",
    from: getLastWeekStart(),
    until: getTodayEnd(),
  },
  {
    label: "Month",
    from: getLastMonthStart(),
    until: getTodayEnd(),
  },
  {
    label: "3 Months",
    from: getLastThreeMonthsStart(),
    until: getTodayEnd(),
  },
  {
    label: "1 Year",
    from: getLastYearStart(),
    until: getTodayEnd(),
  },
];

const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  innerContainer: {
    alignSelf: "flex-end",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  closeButton: {
    color: COLORS.darkerOrange,
  },

  confirmButton: {
    color: COLORS.blue,
  },

  tabsContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  statsContainer: {
    width: "60vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  chartContainer: {
    backgroundColor: "red",
  },
  buttonsHeader: {
    margin: 80,
    textAlign: "center",
    color: COLORS.white,
    fontSize: 25,
  },
}));
const date = new Date();
const DEF_UNTIL_DATE = new Date();
const DEF_FROM_DATE = new Date(date.getFullYear() - 1000, date.getMonth(), 1);

export default function StatsPage() {
  const [dateIndex, setDateIndex] = React.useState<number>(-1);
  const [until, setUntilDate] = React.useState<Date>(DEF_UNTIL_DATE);
  const [from, setFromDate] = React.useState<Date>(DEF_FROM_DATE);
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <div className={classes.tabsContainer}>
          {dateButtons.map((u, i) => (
            <Button
              key={i}
              label={u.label}
              selected={dateIndex === i}
              onClick={() => {
                if (dateIndex === i) {
                  setDateIndex(-1);
                  setFromDate(DEF_FROM_DATE);
                  setUntilDate(DEF_UNTIL_DATE);
                } else {
                  setDateIndex(i);
                  setFromDate(u.from);
                  setUntilDate(u.until);
                }
              }}
            />
          ))}
        </div>
        <ChartTab until={until} from={from} />
      </div>
    </>
  );
}
