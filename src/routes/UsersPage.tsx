import React from "react";
import { COLORS } from "../constants/Colors";
import { getUsers } from "../api/api";
import { useParams } from "react-router-dom";
import {
  Category,
  CreatedUser,
  PageProps,
  Question,
  Report,
  Topic,
  LoggedUser,
} from "../interfaces/Interfaces";
import TableUsers from "../components/tables/TableUsers";
import { AuthContext } from "../context/AuthContext";
export default function UsersPage({ token }: PageProps) {
  const { userLanguages, email } = React.useContext(AuthContext);

  const [users, setUsers] = React.useState<CreatedUser[]>([]);
  React.useEffect(() => {
    (async () => {
      const retrievedUsers = await getUsers(token);
      if (retrievedUsers != null) {
        console.log("sss", retrievedUsers);
        setUsers(retrievedUsers);
      }
    })();
  }, []);

  return (
    <TableUsers
      token={token}
      users={users}
      email={email}
      languages={userLanguages}
    />
  );
}
