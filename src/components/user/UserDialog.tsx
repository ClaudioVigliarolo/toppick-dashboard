import { makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { Dialog, TabData } from "../ui/dialog/Dialog";
import Select from "../ui/select/Select";
import { User, UserRole } from "@toppick/common/build/interfaces";
import { AuthContext } from "@/context/AuthContext";
import { getUserDetails } from "@toppick/common/build/api";
import { getAuthToken } from "@/utils/auth";

interface UserDialogProps {
  open: boolean;
  onConfirm: (user: User) => void;
  onRefuse: () => void;
  userId: string | null;
  headerText: string;
  loading: boolean;
  error: string;
}

const DEFAULT_USER: User = {
  username: "",
  country: "",
  firstname: "",
  image: "",
  language: "",
  user_interests: [],
  user_languages: [],
  lastname: "",
  profession: "",
  uid: "",
  email: "",
  role: UserRole.Default,
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

export default function UserDialog({
  headerText,
  loading,
  onConfirm,
  onRefuse,
  open,
  userId,
  error,
}: UserDialogProps) {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = React.useState<User>(DEFAULT_USER);

  React.useEffect(() => {
    (async () => {
      if (userId) {
        const token = await getAuthToken();
        const res = await getUserDetails(await getAuthToken(), {
          user_id: userId,
        });
        try {
          setCurrentUser(res);
        } catch (error) {
          console.log(error);
        }
      } else {
        setCurrentUser(DEFAULT_USER);
      }
    })();
  }, [userId, open]);

  const isShowSubmit = (): boolean => true;

  const handleRoleChange = (e: React.ChangeEvent<any>) => {
    setCurrentUser({ ...currentUser, role: e.target.value });
  };

  const setUsername = (e: React.ChangeEvent<any>) => {
    setCurrentUser({ ...currentUser, username: e.currentTarget.value });
  };
  const setEmail = (e: React.ChangeEvent<any>) => {
    setCurrentUser({ ...currentUser, email: e.currentTarget.value });
  };

  const onSubmit = () => {
    onConfirm(currentUser);
  };

  const tabs: TabData[] = [
    {
      label: "User",
      children: (
        <div className={classes.container}>
          <TextField
            onChange={setUsername}
            label="Username"
            className={classes.textField}
            value={currentUser.username}
            disabled={true}
          />

          <TextField
            onChange={setEmail}
            label="Email"
            className={classes.textField}
            value={currentUser.email}
            disabled={true}
          />

          <Select
            handleChange={handleRoleChange}
            value={currentUser.role!}
            values={Object.values(UserRole)}
            color="black"
            containerClassName={classes.textField}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <Dialog
        open={open}
        loading={loading}
        headerText={headerText}
        minWidth={400}
        onConfirm={onSubmit}
        error={error}
        onRefuse={onRefuse}
        tabData={tabs}
        showTabs={false}
        confirmButtonDisabled={!isShowSubmit()}
      />
    </>
  );
}
