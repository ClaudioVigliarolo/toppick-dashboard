import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

// Create your Styles. Remember, since React-JSS uses the default preset,
// most plugins are available without further configuration needed.
export const useAppStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    headerContainer: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
    },

    headerText: {
      color: "white",
      textAlign: "center",
      marginTop: -50,
      marginBottom: 50,
      maxWidth: "50vw",
    },

    buttonContainer: {
      marginTop: 100,
      display: "flex",
      flexDirection: "row",
      width: 600,
      justifyContent: "space-evenly",
      paddingBottom: 100,
    },
    questionsListContainer: {
      marginTop: 50,
    },
    switchContainer: {
      marginBottom: 100,
    },
  })
);
