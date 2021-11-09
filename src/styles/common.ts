import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { COLORS } from "src/constants/Colors";
import { CONSTANTS } from "src/constants/constants";

export const useAppStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${CONSTANTS.DRAWER_WIDTH}px)`,
      marginLeft: CONSTANTS.DRAWER_WIDTH,
    },
    drawer: {
      width: CONSTANTS.DRAWER_WIDTH,
      flexShrink: 0,
    },
    drawerItem: {
      color: COLORS.menuText,
      textTransform: "uppercase",
      fontWeight: "bolder",
      float: "left",
    },
    childrenContainer: {
      paddingTop: 100,
      backgroundColor: COLORS.primaryBackground,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      minHeight: "100vh",
      width: "100%",

      "@media (max-width: 500px)": {
        padding: 100,
        width: "200%",
      },
    },
    drawerPaper: {
      width: CONSTANTS.DRAWER_WIDTH,
      background: COLORS.menuContainer,
      color: "#fff",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    headerSection: {
      display: "flex",
      flexDirection: "row",
      alignSelf: "center",
      justifyContent: "space-between",
      marginBottom: 100,
      width: 700,
      padding: 20,
      borderRadius: 10,
      borderWidth: 5,
      borderColor: "transparent",
      borderStyle: "solid",
    },
    noItemsAlert: {
      fontSize: 50,
      color: "#fff",
      textAlign: "center",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      maxWidth: 400,
      alignItems: "center",
      alignSelf: "center",
    },
    root: {
      width: "100%",
      height: 450,
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
    textAreaContainer: {
      padding: 50,
      paddingBottom: 200,
    },

    chips: {
      display: "flex",
      flexWrap: "wrap",
      alignSelf: "center",
      alignItems: "center",
    },
    chip: {
      margin: 2,
      backgroundColor: "orange",
      color: "white",
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    mainTextInput: {
      width: 500,
      padding: 20,
    },

    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      minHeight: "100vh",
    },
    translateHeaderContainer: {
      display: "flex",
      justifyContent: "space-evenly",
      flexDirection: "row",
      minWidth: 600,
    },

    headerText: {
      color: "white",
      textAlign: "center",
      marginTop: -50,
      marginBottom: 50,
      maxWidth: "50vw",
      minWidth: 400,
    },

    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      width: 600,
      justifyContent: "space-evenly",
      paddingBottom: 100,
    },
    QuestionsReviewContainer: {
      marginTop: 50,
    },
    QuestionTextFieldContainer: {
      marginBottom: 80,
    },
    switchContainer: {
      marginBottom: 100,
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
  })
);
