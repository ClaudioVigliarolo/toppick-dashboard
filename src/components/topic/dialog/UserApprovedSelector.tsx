import React from "react";
import UserAvatar from "react-user-avatar";
import CheckIcon from "@material-ui/icons/Check";
import { Button, makeStyles } from "@material-ui/core";
import { AuthContext } from "@/context/AuthContext";
import { useAppStyles } from "@/styles/common";
import { UserApproved } from "@toppick/common/build/interfaces";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    width: 100,
    height: 50,
  },
  userAvatarContainer: {
    position: "absolute",
    top: 0,
  },
  userAvatar: {
    color: "white",
  },
}));

interface UserApprovedProps {
  users: UserApproved[];
  onToggle: () => void;
  approved: boolean;
}

export default function UserApprovedSection({
  users,
  approved,
  onToggle,
}: UserApprovedProps) {
  const { username } = React.useContext(AuthContext);
  const classes = useStyles();
  const appClasses = useAppStyles();
  return (
    <div className={classes.container}>
      <div className={classes.contentContainer}>
        {users &&
          users.map((u, i) => (
            <div
              className={classes.userAvatar}
              style={{
                left: i * 25,
              }}
              key={i}
            >
              <UserAvatar
                size="35"
                name={u.username.substring(0, 2).toUpperCase()}
                colors={["orange"]}
                className={classes.userAvatar}
              />
            </div>
          ))}
        <div
          className={classes.userAvatar}
          style={{
            left: users.length * 25,
            display: approved ? "flex" : "none",
          }}
        >
          <UserAvatar
            size="35"
            name={username.substring(0, 2).toUpperCase()}
            colors={["orange"]}
            className={classes.userAvatar}
          />
        </div>
      </div>
      <div className={appClasses.buttonContainer}>
        <Button
          color={approved ? "primary" : "secondary"}
          size="small"
          onClick={onToggle}
        >
          {approved && <CheckIcon color="primary" />}
          {approved ? "Approved" : "Click to approve"}
        </Button>
      </div>
    </div>
  );
}
