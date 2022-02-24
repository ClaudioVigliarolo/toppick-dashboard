import React from "react";
import { useHistory } from "react-router-dom";
import { login } from "@/services/api";
import { AuthContext } from "@/context/AuthContext";
import { makeStyles, TextField } from "@material-ui/core";
import { PageProps } from "@/interfaces/app";
import Button from "@/components/ui/buttons/Button";

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

export default function LoginPage({
  setLoading,
  onError,
  onSuccess,
  error,
  loading,
  success,
}: PageProps) {
  const {
    setIsAuthenticated,
    setUserType,
    setUserLanguages,
    setUserToken,
    setCurrentLanguage,
    userToken,
    setmail,
  } = React.useContext(AuthContext);

  //renamed  setEmail to setEmailState for context function ovverriding problem
  const [emailState, setEmailState] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const classes = useStyles();
  const history = useHistory();
  const onSubmit = async (): Promise<void> => {
    if (!emailState || !password) {
      onError();
      return;
    }
    setLoading(true);
    const user = await login(emailState, password);
    if (user) {
      localStorage.setItem("token", user.token);
      setUserType(user.type);
      setmail(user.username);
      setmail(user.mail);
      setUserToken(user.token);
      setUserLanguages(user.languages);
      setCurrentLanguage(user.languages[0]);
      setIsAuthenticated(true);
      history.push("/categories");
      setLoading(false);
    } else {
      onError();
      setLoading(false);
    }
  };

  return (
    <form className={classes.form} noValidate autoComplete="off">
      <div className={classes.container}>
        <TextField
          onChange={(e) => setEmailState(e.currentTarget.value)}
          id="standard-basic"
          label="Email"
          type="email"
          className={classes.textField}
          value={emailState}
          error={error}
        />

        <TextField
          onChange={(e) => setPassword(e.currentTarget.value)}
          id="standard-basic"
          label="Password"
          type="password"
          value={password}
          className={classes.textField}
          error={error}
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
    </form>
  );
}
