import { makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { AppDialog, TabData } from "../ui/dialog/DialogStyles";
import Select from "../ui/select/SimpleSelect";
import { UserDetail, UserRole } from "@toppick/common";

interface UserDialogProps {
  open: boolean;
  onConfirm: (user: UserDetail) => void;
  onRefuse: () => void;
  user: UserDetail;
  headerText: string;
  loading: boolean;
}

const NO_USER: UserDetail = {
  username: "",
  country: "",
  firstname: "",
  image: "",
  language: "",
  lastname: "",
  profession: "",
  uid: "",
  email: "",
  role: UserRole.DEFAULT,
};

const useStyles = makeStyles(() => ({
  textField: {
    marginBottom: 20,
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
  const [user, setUser] = React.useState<UserDetail>(NO_USER);

  React.useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  const onConfirm = () => {
    props.onConfirm(user);
  };

  const isSubmitEnabled = (): boolean => true;

  const handleRoleChange = (e: React.ChangeEvent<any>) => {
    setUser({ ...user, role: e.target.value });
  };
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
            disabled={true}
          />

          <TextField
            onChange={(e) => setUser({ ...user, email: e.currentTarget.value })}
            label="Email"
            className={classes.textField}
            value={user.email}
            disabled={true}
          />

          <Select
            handleChange={handleRoleChange}
            value={user.role}
            values={Object.values(UserRole)}
            color="black"
            width={300}
            defaultValue={user.role}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <AppDialog
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
