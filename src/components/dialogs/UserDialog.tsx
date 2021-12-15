import { makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { CustomDialog } from "./DialogStyles";
import Chip from "../select/ObjectChip";
import { Lang, UserCreated } from "src/interfaces/Interfaces";
import { TabData } from "./DialogStyles";
import { noSpace } from "src/utils/utils";

interface UserDialogProps {
  open: boolean;
  onConfirm: (user: UserCreated) => void;
  onRefuse: () => void;
  user: UserCreated;
  headerText: string;
  languages: Lang[];
  loading: boolean;
}

const NO_USER: UserCreated = {
  id: -1,
  username: "",
  mail: "",
  languages: [],
  password: "",
  type: "",
};

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: 10,
    width: "90%",
  },

  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function UserDialog(props: UserDialogProps) {
  const classes = useStyles();
  const [user, setUser] = React.useState<UserCreated>(NO_USER);

  React.useEffect(() => {
    setUser(user);
  }, [props.user]);

  const onConfirm = () => {
    props.onConfirm({
      ...user,
      mail: noSpace(user.mail),
      password: noSpace(user.password),
    });
  };

  const handleLanguagesChange = (index: number) => {
    const newUser = { ...user };
    console.log(user.languages, index);
    if (user.languages.includes(props.languages[index])) {
      newUser.languages = user.languages.filter(
        (l) => l !== props.languages[index]
      );
    } else {
      console.log("aggiungi", props.languages[index], props.languages);
      newUser.languages = [...newUser.languages, props.languages[index]];
    }
    setUser(newUser);
  };

  const isSubmitEnabled = (): boolean =>
    user.username != "" && user.mail != "" && user.password != "";

  const tabs: TabData[] = [
    {
      label: "User",
      children: (
        <div className={classes.container}>
          <TextField
            onChange={(e) =>
              setUser({ ...user, username: e.currentTarget.value })
            }
            id="standard-basic"
            label="Username"
            className={classes.textField}
            value={user.username}
          />

          <TextField
            onChange={(e) => setUser({ ...user, mail: e.currentTarget.value })}
            id="standard-basic"
            label="Email"
            className={classes.textField}
            value={user.mail}
          />

          <TextField
            onChange={(e) =>
              setUser({ ...user, password: e.currentTarget.value })
            }
            id="standard-basic"
            label="Digit new password"
            type="password"
            value={user.password}
            className={classes.textField}
          />

          <div>
            <Chip
              width={200}
              selectedValues={user.languages.map((l) => ({ title: l }))}
              values={props.languages.map((l) => ({ title: l }))}
              header="Languages"
              handleChange={handleLanguagesChange}
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      <CustomDialog
        open={props.open}
        loading={props.loading}
        headerText={props.headerText}
        minWidth={400}
        onConfirm={onConfirm}
        onRefuse={props.onRefuse}
        tabData={tabs}
        showTabs={false}
        confirmButtonDisabled={!isSubmitEnabled()}
      />
    </>
  );
}
