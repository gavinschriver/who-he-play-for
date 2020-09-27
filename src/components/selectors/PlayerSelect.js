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
    const [currentUsersPlayers, setCurrentUsersPlayers] = useState([])
    


  useEffect(() => {
    getUserById(currentUserId).then(setCurrentUser).then(getPlayerData);
  }, []);
    
    useEffect(() => {
        const matchingPlayers = currentUser.usersPlayers.map(up => {
            return playerObjArray.find(p => {
                return p.player.id === up.playerId
            })
        }
        ) || {}
        setCurrentUsersPlayers(matchingPlayers)
    }, [playerObjArray])

  return (
    <FormControl as="select">
      {currentUsersPlayers.map((p) => (
        <option>{p.player.firstName}</option>
      ))}
    </FormControl>
  );
};
