import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CustomButton from "../buttons/CustomButton";
export const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(5),
      width: "60ch",
      padding: 50,
      backgroundColor: "white",
      borderRadius: 5,
    },
  },

  container: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    margin: 10,
  },
  button: {
    marginTop: 50,
    alignSelf: "center",
  },
}));

export const Form = ({
  onSubmit,
  height,
  children,
}: {
  onSubmit: () => void;
  height: string;
  children: React.ReactNode;
}) => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.container} style={{ height }}>
        {children}
        <div className={classes.button}>
          <CustomButton onClick={onSubmit} title="Submit" submit={true} />
        </div>
      </div>
    </form>
  );
};
