import React, { useContext, useEffect, useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import { UserContext } from "../users/UserProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { PlayerContext } from "../players/PlayerProvider";

export const PlayerSelect = React.forwardRef((props, ref) => {
  const { getUserById, currentUserId } = useContext(UserContext);
  const { playerObjArray, getPlayerData, setStanPlayer, setTrashtalkPlayer } = useContext(PlayerContext);
  const { usersPlayers, getUsersPlayers } = useContext(UserPlayerContext);

  const [currentUser, setCurrentUser] = useState({
    usersPlayers: [],
    messages: [],
  });
  const [currentUsersPlayers, setCurrentUsersPlayers] = useState([]);
  const [otherUsersPlayers, setOtherUsersPlayers] = useState([]);

  const filteredCurrentUsersPlayers = currentUser.usersPlayers.filter(
    (up) => !up.mentioned
  );
  const filteredOtherUsersPlayers = usersPlayers.filter((up) => {
    return up.userId !== currentUserId;
  });

  useEffect(() => {
    const matchingPlayers =
      filteredCurrentUsersPlayers.map((up) => {
        return playerObjArray.find((p) => {
          return p.player.id === up.playerId;
        });
      }) || {};
    setCurrentUsersPlayers(matchingPlayers);
  }, [playerObjArray]);

  useEffect(() => {
    const allOtherUsersPlayers =
      filteredOtherUsersPlayers.map((up) => {
        return playerObjArray.find((p) => {
          return p.player.id === up.playerId;
        });
      }) || {};
    setOtherUsersPlayers(allOtherUsersPlayers);
  }, [playerObjArray]);

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

  if (props.type === "stan") {
    return (
      <>
        <FormControl as="select" ref={ref} onChange={(e) => {
          setStanPlayer(e.target.value)
        }}>
          <option value="0">Choose a player to Stan</option>
          {currentUsersPlayers.map((p) => (
            <option value={`${p.player.firstName} ${p.player.lastName}`}>
              {p.player.firstName} {p.player.lastName}
            </option>
          ))}
        </FormControl>
      </>
    );
  }

  if (props.type === "trash") {
    return (
      <FormControl as="select" ref={ref} onChange={(e) => {
        setTrashtalkPlayer(e.target.value)
      }}>
        <option value="0">Choose a player to TRASH</option>
        {otherUsersPlayers.map((p) => (
          <option value={`${p.player.firstName} ${p.player.lastName}`}>
            {p.player.firstName} {p.player.lastName}
          </option>
        ))}
      </FormControl>
    );
  }
});
