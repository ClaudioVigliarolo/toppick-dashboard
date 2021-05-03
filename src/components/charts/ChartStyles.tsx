import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

// Create your Styles. Remember, since React-JSS uses the default preset,
// most plugins are available without further configuration needed.
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
      //backgroundColor: "red",
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
      float: "right",
      flexDirection: "row",
      display: "flex",
    },
  })
);
