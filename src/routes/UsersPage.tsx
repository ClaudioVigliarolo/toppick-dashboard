import React from "react";
import { getUsers } from "../api/api";
import { CreatedUser, PageProps } from "../interfaces/Interfaces";
import TableUsers from "../components/tables/TableUsers";
import { AuthContext } from "../context/AuthContext";
export default function UsersPage({ token, setLoading }: PageProps) {
  const { userLanguages, email } = React.useContext(AuthContext);
  const [users, setUsers] = React.useState<CreatedUser[]>([]);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const retrievedUsers = await getUsers(token);
      if (retrievedUsers != null) {
        setUsers(retrievedUsers);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <TableUsers
      token={token}
      users={users}
      email={email}
      setLoading={setLoading}
      languages={userLanguages}
    />
  );
}
