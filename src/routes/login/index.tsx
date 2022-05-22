import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, TextField } from "@material-ui/core";
import Button from "@/components/ui/buttons/Button";
import { auth } from "@/services/firebase";

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(5),
    width: "60ch",
    padding: 50,
    backgroundColor: "white",
    borderRadius: 5,
  },

  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 300,
  },

  textField: {
    margin: 10,
    width: "100%",
  },

  button: {
    marginTop: 50,
  },
}));

import CustomAlert from "@/components/ui/Alert";

export default function LoginPage() {
  //renamed  setEmail to setEmailState for context function ovverriding problem
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const classes = useStyles();
  const history = useHistory();

  const validDateForm = () => {
    if (!email || !password) {
      throw new Error("Fill all fields");
    }
  };

  const signIn = async (): Promise<void> => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw new Error("Invalid Credentials");
    }
  };

  const onSubmit = async (): Promise<void> => {
    setLoading(true);
    try {
      //pre-validation
      validDateForm();
      //sign in
      await signIn();
      history.push("/categories");
    } catch (error) {
      const { message } = error as Error;
      setError(message);
    }
    setLoading(false);
  };

  return (
    <form className={classes.form} noValidate autoComplete="off">
      <div className={classes.container}>
        <TextField
          onChange={(e) => setEmail(e.currentTarget.value)}
          id="standard-basic"
          label="Email"
          type="email"
          className={classes.textField}
          value={email}
        />

        <TextField
          onChange={(e) => setPassword(e.currentTarget.value)}
          id="standard-basic"
          label="Password"
          type="password"
          value={password}
          className={classes.textField}
        />
        <div className={classes.button}>
          <Button
            onClick={onSubmit}
            title="Submit"
            submit={true}
            disabled={loading}
          />
        </div>
      </div>
      <CustomAlert visible={error.length > 0} text={error} severity="error" />
    </form>
  );
}
