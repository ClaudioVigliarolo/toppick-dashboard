import React from "react";
import { PageProps } from "../interfaces/Interfaces";
import DBChartBar from "../components/charts/DBChartBar";
import UpdatesChart from "../components/charts/UpdatesChart";
import UserChart from "../components/charts/UserChart";
import ReportsChart from "../components/charts/ReportsChart";
import Button from "../components/buttons/TabButton";
import { CONSTANTS } from "../constants/constants";
import { useAppStyles } from "src/styles/common";
import {
  getTodayEnd,
  getTodayStart,
  getLastWeekStart,
  getLastYearStart,
  getLastThreeMonthsStart,
  getLastMonthStart,
  getYesterdayStart,
} from "src/utils/utils";

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
  UpdatesChart,
  UsersChart,
  ReportsChart,
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

const chartButtons: ChartButton[] = [
  { label: "Reports", chartIndex: ChartIndex.ReportsChart },
  { label: "Users", chartIndex: ChartIndex.UsersChart },
  { label: "Updates", chartIndex: ChartIndex.UpdatesChart },
];

export default function CreatePage({ token, currentLanguage }: PageProps) {
  const [chartIndex, setChartIndex] = React.useState<number>(0);
  const [dateIndex, setDateIndex] = React.useState<number>(-1);
  const [until, setUntilDate] = React.useState<Date>(CONSTANTS.DEF_UNTIL_DATE);
  const [from, setFromDate] = React.useState<Date>(CONSTANTS.DEF_FROM_DATE);

  const classes = useAppStyles();

  return (
    <>
      <div className={classes.statsContainer}>
        <div className={classes.tabsContainer}>
          {dateButtons.map((u, i) => (
            <Button
              label={u.label}
              selected={dateIndex === i}
              onClick={() => {
                if (dateIndex === i) {
                  setDateIndex(-1);
                  setFromDate(CONSTANTS.DEF_FROM_DATE);
                  setUntilDate(CONSTANTS.DEF_UNTIL_DATE);
                } else {
                  setDateIndex(i);
                  setFromDate(u.from);
                  setUntilDate(u.until);
                }
              }}
            />
          ))}
        </div>
        <DBChartBar
          currentLanguage={currentLanguage}
          token={token}
          until={until}
          from={from}
        />

        <div className={classes.buttonsHeader}>
          Visualize {chartButtons[chartIndex].label}
        </div>
        <div className={classes.tabsContainer}>
          {chartButtons.map((t) => (
            <Button
              label={t.label}
              selected={chartIndex === t.chartIndex}
              onClick={() => setChartIndex(t.chartIndex)}
            />
          ))}
        </div>

        {chartIndex == ChartIndex.ReportsChart && (
          <ReportsChart
            currentLanguage={currentLanguage}
            token={token}
            until={until}
            from={from}
          />
        )}

        {chartIndex == ChartIndex.UpdatesChart && (
          <UpdatesChart
            currentLanguage={currentLanguage}
            token={token}
            until={until}
            from={from}
          />
        )}
        {chartIndex == ChartIndex.UsersChart && (
          <UserChart
            currentLanguage={currentLanguage}
            token={token}
            until={until}
            from={from}
          />
        )}
      </div>
    </>
  );
}
