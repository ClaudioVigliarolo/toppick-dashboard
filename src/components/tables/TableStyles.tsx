import React from "react";

import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { COLORS } from "../../constants/Colors";

interface CommonStylesProps {
  body: any;
  columns: string[];
  columnNames: string[];
}

export const StyledEditCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "orange",
      width: "100%",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 18,
      color: "black",
      position: "relative",
      paddingRight: "10%",
    },
  })
)(TableCell);

export const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "orange",
      width: "100%",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 18,
    },
  })
)(TableCell);

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableContainer: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: COLORS.primaryBackground,
    },
    table: {
      width: "85%",
      alignSelf: "center",
      backgroundColor: "white",
      minWidth: 900,
      "@media (max-width: 1400px)": {
        marginLeft: 100,
        marginRight: 100,
        paddingLeft: 50,
        paddingRight: 50,
      },
      "@media (max-width: 500px)": {
        marginLeft: 600,
        marginRight: 200,
      },
    },
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 300,
      backgroundColor: "white",
    },
    editIcon: {
      cursor: "pointer",
      color: COLORS.primaryOrange,
    },
    ignoreIcon: {
      cursor: "pointer",
      color: COLORS.blue,
      fontWeight: "bold",
      textTransform: "uppercase",
    },

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

    deleteIcon: {
      cursor: "pointer",
      color: COLORS.darkerOrange,
    },

    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },

    iconsContainer: {
      position: "absolute",
      right: 30,
      color: "orange",
      top: "30%",
      width: 80,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },

    userIconsContainer: {
      position: "absolute",
      right: 30,
      color: "orange",
      top: "30%",
      cursor: "pointer",
      width: 110,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },

    circle: {
      display: "flex",
      width: 10,
      height: 10,
      borderRadius: "50%",
      textAlign: "center",
      alignSelf: "center",
    },

    tableCell: {
      color: "#fff",
      fontSize: 16,
      textTransform: "uppercase",
    },

    tableRow: {
      color: "#fff",
      backgroundColor: COLORS.darkerOrange,
    },
  })
);

export const CustomTable = (props: CommonStylesProps) => {
  const classes = useStyles();
  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="customized table">
          <colgroup>
            {props.columns.map((width: string, index: number) => (
              <col key={index} style={{ width }} />
            ))}
          </colgroup>

          <TableHead>
            <TableRow className={classes.tableRow}>
              {props.columnNames.map((colName: string, index: number) => (
                <TableCell key={index} className={classes.tableCell}>
                  {colName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{props.body}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
