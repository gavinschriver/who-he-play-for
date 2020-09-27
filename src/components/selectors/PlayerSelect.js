import React, { useContext } from "react";
import FormControl from "react-bootstrap/FormControl";
import { UserContext } from "../users/UserProvider";

export default (props) => {
  const { users, getUsers, currentUser } = useContext(UserContext);
  const matchingPlayers = ["test", "vals", "here"];
  const activeUser = currentUser || {};

  const type = props.type;
  const options =
    type === "stan" ? (
      users.map((u) => <option>{u.name}</option>)
    ) : (
      <option></option>
    );

  return <FormControl as="select">{options}</FormControl>;
};
