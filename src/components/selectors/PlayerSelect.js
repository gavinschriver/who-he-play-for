import React, { useContext, useEffect, useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import { UserContext } from "../users/UserProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { PlayerContext } from "../players/PlayerProvider";

export default (props) => {
  const { users, getUsers, getUserById, currentUserId } = useContext(
    UserContext
  );
  const { playerObjArray, getPlayerData } = useContext(PlayerContext);
  const { usersPlayers, getUsersPlayers } = useContext(UserPlayerContext);
  const [currentUser, setCurrentUser] = useState({
    usersPlayers: [],
    messages: [],
  });

  const currentUsersLineup = currentUser.usersPlayers.map((cUPO) => {
    return playerObjArray.find((p) => {
      return p.player.id === cUPO.playerId;
    });
  });

  const type = props.type;

  const options =
    type === "stan" ? (
      currentUsersLineup.map((cPO) => {
          return <option>{cPO.player.firstName}</option>;
      })
    ) : (
      <option></option>
    );

  useEffect(() => {
    getUsers().then(getPlayerData).then(getUsersPlayers);
  }, []);

  useEffect(() => {
    getUserById(currentUserId).then(setCurrentUser);
  }, []);
  return <FormControl as="select">{options}</FormControl>;
};
