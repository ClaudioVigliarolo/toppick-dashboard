import { TextField } from "@material-ui/core";
import React from "react";
import { CustomDialog } from "./DialogStyles";
import { CONSTANTS as USER_CONSTANTS } from "../../constants/constants";
import { addUser } from "../../api/api";
import Chip from "../select/Chip";
import { Form, useStyles } from "../input/Form";
import { CONSTANTS } from "../../constants/constants";
import { getHash } from "../../utils/utils";

interface UserDialogProps {
  open: boolean;
  onConfirm: (
    username: string,
    email: string,
    password: string,
    languages: string[],
    usertype?: string
  ) => void;
  onRefuse: any;
  email: string;
  username: string;
  password: string;
  type: string;
  headerText: string;
  languages: string[];
  selectedLanguages: string[];
}

export default function UserDialog({
  email,
  username,
  password,
  languages,
  type,
  headerText,
  onRefuse,
  onConfirm,
  selectedLanguages,
  open,
}: UserDialogProps) {
  const classes = useStyles();
  const [usernameState, setUsernameState] = React.useState<string>("");
  const [emailState, setEmailState] = React.useState<string>("");
  const [passwordState, setPasswordState] = React.useState<string>("");

  const [selectedLanguagesState, setSelectedLanguagesState] = React.useState<
    string[]
  >([]);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  React.useEffect(() => {
    //setLanguages(CONSTANTS.languages.map((language) => language.label));
    console.log("ccaled EFFF");
    setUsernameState(username);
    setSelectedLanguagesState(selectedLanguages);
    setEmailState(email);
    setPasswordState(password);
    console.log("amore", languages, selectedLanguages);
  }, [username, email, password, selectedLanguages]);

  const onSubmit = async (): Promise<void> => {
    setError(false);
    if (
      !usernameState ||
      !passwordState ||
      !emailState ||
      selectedLanguagesState.length == 0
    ) {
      setError(true);
      return;
    }
    onConfirm(usernameState, emailState, passwordState, selectedLanguagesState);
  };

  const handleChange = (event: React.ChangeEvent<{ value: string[] }>) => {
    setSelectedLanguagesState(event.target.value);
  };

  return (
    <>
      <CustomDialog
        open={open}
        headerText={headerText}
        minWidth={400}
        onConfirm={onSubmit}
        onRefuse={onRefuse}
        children={
          <>
            <TextField
              onChange={(e) => setUsernameState(e.currentTarget.value)}
              id="standard-basic"
              label="Username"
              className={classes.textField}
              value={usernameState}
              error={error}
            />

            <TextField
              onChange={(e) => setEmailState(e.currentTarget.value)}
              id="standard-basic"
              label="Email"
              className={classes.textField}
              value={emailState}
              error={error}
            />

            <TextField
              onChange={(e) => setPasswordState(e.currentTarget.value)}
              id="standard-basic"
              label="Digit new password"
              type="password"
              value={passwordState}
              className={classes.textField}
              error={error}
            />

            <div style={{ alignSelf: "center" }}>
              <Chip
                width={200}
                selectedValues={selectedLanguagesState}
                values={languages}
                header="Languages"
                error={error}
                handleChange={handleChange}
              />
            </div>
          </>
        }
      />
    </>
  );
}
