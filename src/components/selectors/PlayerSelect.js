import React, { useContext, useEffect } from "react";
import FormControl from "react-bootstrap/FormControl";
import { UserContext } from "../users/UserProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { PlayerContext } from "../players/PlayerProvider";

export default (props) => {
  const { getUsers, currentUser } = useContext(UserContext);
  const { getPlayerDataArray } = useContext(PlayerContext);
  const { getUsersPlayers, usersPlayers, currentUsersPlayers } = useContext(
    UserPlayerContext
  );

  const type = props.type;
  const options =
    type === "stan" ? (
      currentUsersPlayers.map((up) => <option>{currentUser.name}</option>)
    ) : (
      <option></option>
    );

  useEffect(() => {
    getUsers().then(getPlayerDataArray).then(getUsersPlayers);
  }, []);
  return <FormControl as="select">{options}</FormControl>;
};
