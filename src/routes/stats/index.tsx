import React from "react";
import { MaterialUiColor, PageProps } from "@/interfaces/app";
import DBChartBar from "@/components/stats/DBChartBar";
import UserChart from "@/components/stats/UserChart";
import Button from "@/components/ui/buttons/TabButton";
import { CONSTANTS } from "@/constants/app";
import Switch from "@/components/ui/select/Switch";
import {
  getTodayEnd,
  getTodayStart,
  getLastWeekStart,
  getLastYearStart,
  getLastThreeMonthsStart,
  getLastMonthStart,
  getYesterdayStart,
} from "@/utils/utils";
import { getMaintenanceStatus, updateMaintenance } from "@/services/api";
import { makeStyles } from "@material-ui/core";
import { COLORS } from "@/constants/colors";

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

const chartButtons: ChartButton[] = [
  { label: "Users", chartIndex: ChartIndex.UsersChart },
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

export default function StatsPage({ token, currentLanguage }: PageProps) {
  const [chartIndex, setChartIndex] = React.useState<number>(0);
  const [dateIndex, setDateIndex] = React.useState<number>(-1);
  const [until, setUntilDate] = React.useState<Date>(CONSTANTS.DEF_UNTIL_DATE);
  const [from, setFromDate] = React.useState<Date>(CONSTANTS.DEF_FROM_DATE);
  const [maintanance, setMaintenance] = React.useState<boolean>(false);

  const classes = useStyles();

  React.useEffect(() => {
    (async () => {
      setMaintenance(await getMaintenanceStatus(currentLanguage, token));
    })();
  }, [currentLanguage, token]);

  const onMaintenanceChange = async (event) => {
    const newVal = !maintanance;
    if (await updateMaintenance(newVal, currentLanguage, token)) {
      setMaintenance(newVal);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div>
          <Switch
            text="Maintenance"
            switchColor={MaterialUiColor.Secondary}
            handleChange={onMaintenanceChange}
            value={maintanance}
          />
        </div>
        <div className={classes.tabsContainer}>
          {dateButtons.map((u, i) => (
            <Button
              key={i}
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
              key={t.chartIndex}
              label={t.label}
              selected={chartIndex === t.chartIndex}
              onClick={() => setChartIndex(t.chartIndex)}
            />
          ))}
        </div>
        {chartIndex === ChartIndex.UsersChart && (
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