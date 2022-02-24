import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useChartStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    cardnumbersContainer: {
      display: "flex",
      flexDirection: "row",
    },
    tabsContainer: {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
    },
    chartContainer: {
      width: "60%",
    },
    chartHeader: {
      color: "#fff",
      textAlign: "center",
      fontSize: 30,
    },
    userTabsContainer: {
      marginLeft: "40vw",
      marginTop: -40,
      minHeight: 40,
      float: "right",
      flexDirection: "row",
      display: "flex",
    },
  })
);
