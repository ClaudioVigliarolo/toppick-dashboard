import React from "react";
import { login } from "../api/api";
import TransactionAlert from "../components/alerts/TransactionAlert";
import { Form, useStyles } from "../components/input/Form";
import { AuthContext } from "../context/AuthContext";
import { TextField } from "@material-ui/core";
import { PageProps } from "../interfaces/Interfaces";
export default function LoginPage(props: PageProps) {
  const {
    setIsAuthenticated,
    setUserType,
    setUserLanguages,
    setUserToken,
    setCurrentLanguage,
    userToken,
    setEmail,
  } = React.useContext(AuthContext);

  //renamed  setEmail to setEmailState for context function ovverriding problem
  const [emailState, setEmailState] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [success, setSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const classes = useStyles();

  const onSubmit = async (): Promise<void> => {
    if (!emailState || !password) {
      setError(true);
      return;
    }
    const user = await login(emailState, password);
    if (user) {
      localStorage.setItem("token", user.token);
      setUserType(user.type);
      setEmail(user.username);
      setEmail(user.email);
      setUserToken(user.token);
      setUserLanguages(user.languages);
      setCurrentLanguage(user.languages[0]);
      setIsAuthenticated(true);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        height="40ch"
        children={
          <>
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
          </>
        }
      />

      <TransactionAlert
        success={success}
        error={error}
        messageError="Authentication Failed"
      />
    </>
  );
}
