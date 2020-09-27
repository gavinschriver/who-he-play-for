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
  const [currentUsersPlayers, setCurrentUsersPlayers] = useState([]);
  const [otherUsersPlayers, setOtherUsersPlayers] = useState([]);

  const filteredUsersPlayers = currentUser.usersPlayers.filter(
    (up) => !up.mentioned
  );

  useEffect(() => {
    const matchingPlayers =
      filteredUsersPlayers.map((up) => {
        return playerObjArray.find((p) => {
          return p.player.id === up.playerId;
        });
      }) || {};
    setCurrentUsersPlayers(matchingPlayers);
  }, [playerObjArray]);
    
    useEffect(() => {
        const allOtherUsersPlayers = usersPlayers.map((up) => {
            return playerObjArray.find(p => {
                return p.player.id === up.playerId
            })
        }) || {}
        setOtherUsersPlayers(allOtherUsersPlayers)
    }, [playerObjArray])

  //need this to control for whenever a current user's player is marked as mentioned
  useEffect(() => {
    getUserById(currentUserId).then(setCurrentUser);
  }, [usersPlayers]);

  // init hook
  useEffect(() => {
    getUserById(currentUserId)
      .then(setCurrentUser)
      .then(getPlayerData)
      .then(getUsersPlayers);
  }, []);

  return (
    <FormControl as="select">
          {otherUsersPlayers.map((p) => (
              <option>{p.player.firstName}</option>
          ))}
    </FormControl>
  );
};
