import React from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../api/api";
import { Form, useStyles } from "../../components/input/Form";
import { AuthContext } from "../../context/AuthContext";
import { TextField } from "@material-ui/core";
import { PageProps } from "../../interfaces/Interfaces";
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
    setUserMail,
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
      setUserMail(user.username);
      setUserMail(user.userMail);
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
    <>
      <Form
        onSubmit={onSubmit}
        height="40ch"
        loading={loading}
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
    </>
  );
}
