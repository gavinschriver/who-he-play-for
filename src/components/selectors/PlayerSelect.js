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
  const { usersPlayers } = useContext(UserPlayerContext);

  const [currentUser, setCurrentUser] = useState({
    usersPlayers: [],
    messages: [],
  });
  const [currentUsersPlayers, setCurrentUsersPlayers] = useState([]);

  const filteredUsersPlayers = currentUser.usersPlayers.filter(
    (up) => !up.mentioned
  );

  useEffect(() => {
    getUserById(currentUserId).then(setCurrentUser).then(getPlayerData);
  }, []);

  useEffect(() => {
    const matchingPlayers =
      filteredUsersPlayers.map((up) => {
        return playerObjArray.find((p) => {
          return p.player.id === up.playerId;
        });
      }) || {};
    setCurrentUsersPlayers(matchingPlayers);
  }, [playerObjArray]);

  //need this to control for whenever a player is marked as mentioned
  useEffect(() => {
    getUserById(currentUserId).then(setCurrentUser);
  }, [usersPlayers]);

  return (
    <FormControl as="select">
      {currentUsersPlayers.map((p) => (
        <option>{p.player.firstName}</option>
      ))}
    </FormControl>
  );
};
