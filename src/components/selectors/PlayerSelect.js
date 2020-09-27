import React, { useContext, useEffect, useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import { UserContext } from "../users/UserProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { PlayerContext } from "../players/PlayerProvider";

export default (props) => {
  const { getUsers, currentUser } = useContext(UserContext);
  const { getPlayerData, playerObjArray } = useContext(PlayerContext);
  const { getUsersPlayers, usersPlayers, currentUsersPlayers } = useContext(
    UserPlayerContext
  );
  const currentUsersLineup = currentUsersPlayers.map((cUP) => {
    return playerObjArray.find((p) => p.player.id === cUP.playerId);
  });
  const type = props.type;
  const options =
    type === "stan" ? (
      currentUsersLineup.map((player) => <option>{player.player.firstName}</option>)
    ) : (
      <option></option>
    );

  useEffect(() => {
    getUsers().then(getPlayerData).then(getUsersPlayers);
  }, []);

  return <FormControl as="select">{options}</FormControl>;
};
