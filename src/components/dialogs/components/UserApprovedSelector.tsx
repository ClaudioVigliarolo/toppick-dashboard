import React from "react";
import { UserApproved } from "src/interfaces/Interfaces";
interface UserApprovedProps {
  users: UserApproved[];
  onToggle: () => void;
  approved: boolean;
}
import CheckIcon from "@material-ui/icons/Check";
import { Button, TextField } from "@material-ui/core";
import UserAvatar from "react-user-avatar";
import { AuthContext } from "src/context/AuthContext";

export default function UserApprovedSection({
  users,
  approved,
  onToggle,
}: UserApprovedProps) {
  const { username } = React.useContext(AuthContext);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          position: "relative",
          width: 100,
          backgroundColor: "red",
        }}
      >
        {users &&
          users.map((u, i) => (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: i * 25,
              }}
              key={i}
            >
              <UserAvatar
                size="35"
                name={u.username.substring(0, 2).toUpperCase()}
                colors={["orange"]}
                style={{ color: "white" }}
              />
            </div>
          ))}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: users.length * 25,
            display: approved ? "flex" : "none",
          }}
        >
          <UserAvatar
            size="35"
            name={username.substring(0, 2).toUpperCase()}
            colors={["orange"]}
            style={{ color: "white" }}
          />
        </div>
      </div>
      <div style={{ marginTop: 50 }}>
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
