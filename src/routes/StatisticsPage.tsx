import React from "react";
import { PageProps } from "../interfaces/Interfaces";
import DBChartBar from "../components/charts/DBChartBar";
import UpdatesChart from "../components/charts/UpdatesChart";
import UserChart from "../components/charts/UserChart";
import ReportsChart from "../components/charts/ReportsChart";
import Button from "../components/buttons/TabButton";
import { useAppStyles } from "src/styles/common";

interface ChartButton {
  label: string;
  chartIndex: number;
}

interface DateButton {
  label: string;
  date: Date;
}

enum ChartIndex {
  UpdatesChart,
  UsersChart,
  ReportsChart,
}

var date = new Date();

const MAX_DATE = new Date(date.getFullYear() + 1000, date.getMonth(), 1);

const dateButtons: DateButton[] = [
  {
    label: "Today",
    date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
  },
  {
    label: "Yesterday",
    date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7),
  },
  {
    label: "Week",
    date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7),
  },
  {
    label: "Month",
    date: new Date(date.getFullYear(), date.getMonth() + 1, 1),
  },
  {
    label: "3 Months",
    date: new Date(date.getFullYear(), date.getMonth() + 3, 1),
  },
  {
    label: "1 Year",
    date: new Date(date.getFullYear() + 1, date.getMonth(), 1),
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
  const [maxDate, setMaxDate] = React.useState<Date>(MAX_DATE);
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
                  setMaxDate(MAX_DATE);
                } else {
                  setDateIndex(i);
                  setMaxDate(dateButtons[i].date);
                }
              }}
            />
          ))}
        </div>
        <DBChartBar
          currentLanguage={currentLanguage}
          token={token}
          maxDate={maxDate}
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
            maxDate={maxDate}
          />
        )}

        {chartIndex == ChartIndex.UpdatesChart && (
          <UpdatesChart
            currentLanguage={currentLanguage}
            token={token}
            maxDate={maxDate}
          />
        )}
        {chartIndex == ChartIndex.UsersChart && (
          <UserChart
            currentLanguage={currentLanguage}
            token={token}
            maxDate={maxDate}
          />
        )}
      </div>
    </>
  );
}
