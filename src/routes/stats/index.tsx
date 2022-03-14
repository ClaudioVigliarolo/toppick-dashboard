import React from "react";
import { MaterialUiColor } from "@/interfaces/app";
import DBChartBar from "@/components/stats/DBChartBar";
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
import { makeStyles } from "@material-ui/core";
import { COLORS } from "@/constants/colors";
import { AuthContext } from "@/context/AuthContext";
import { getMaintenanceStatus, updateMaintenance } from "@/services/db";

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

export default function StatsPage() {
  const [dateIndex, setDateIndex] = React.useState<number>(-1);
  const [until, setUntilDate] = React.useState<Date>(CONSTANTS.DEF_UNTIL_DATE);
  const [from, setFromDate] = React.useState<Date>(CONSTANTS.DEF_FROM_DATE);
  const [maintanance, setMaintenance] = React.useState<boolean>(false);
  const { authToken, currentLanguage } = React.useContext(AuthContext);

  const classes = useStyles();

  React.useEffect(() => {
    (async () => {
      try {
        setMaintenance(await getMaintenanceStatus(currentLanguage, authToken));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentLanguage, authToken]);

  const onMaintenanceChange = async (event) => {
    const newVal = !maintanance;
    try {
      await updateMaintenance(newVal, currentLanguage, authToken);
      setMaintenance(newVal);
    } catch (error) {
      console.log(error);
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
          token={authToken}
          until={until}
          from={from}
        />
      </div>
    </>
  );
}
