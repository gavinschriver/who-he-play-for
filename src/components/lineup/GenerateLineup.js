import React, { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";

export const GenerateLineup = () => {
  const { getPlayerData, playerObjArray } = useContext(PlayerContext);
  const {
    usersPlayers,
    getUsersPlayers,
    addUserPlayer,
    removeUserPlayer,
  } = useContext(UserPlayerContext);

//set component state variables for 1) holding and setting userPlayer objects for current user; 2) state of lineup display div
  const [matchingUsersPlayers, setMatchingUsersPlayers] = useState([]);
  const [lineupShowing, setLineUpShowing] = useState(true);

  const filteredPlayers = playerObjArray.filter(
    (p) =>
      p.player.currentRosterStatus === "ROSTER" && p.player.officialImageSrc
  );

  const filteredPlayerIds = filteredPlayers.map((p) => p.player.id);

  const createUsersPlayers = () => {
    alert(parseInt(localStorage.getItem("whpf_user")))
    for (let i = 0; i < 5; i++) {
      const activeUserId = parseInt(localStorage.getItem("whpf_user"));
      const randomPlayerId =
        filteredPlayerIds[Math.floor(Math.random() * filteredPlayerIds.length)];

      const newUserPlayer = {
        userId: activeUserId,
        playerId: randomPlayerId,
      };
      addUserPlayer(newUserPlayer);
    }
  };
  
  const deleteUsersPlayers = () => {
    matchingUsersPlayers.forEach(mUPO => {
      removeUserPlayer(mUPO.id)
    })
    } 

  const handleGenerateLineup = () => {
    {
      deleteUsersPlayers();
      createUsersPlayers();
      setLineUpShowing(true);
    }
  };

  useEffect(() => {
    getPlayerData().then(getUsersPlayers);
  }, []);

  useEffect(() => {
    const arrayOfMatchingUPOS = usersPlayers.filter((upo) => {
      return upo.userId === parseInt(localStorage.getItem("whpf_user"));
    })
    setMatchingUsersPlayers(arrayOfMatchingUPOS)
  }, [usersPlayers])

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleGenerateLineup();
        }}
      >
        Generate A Lineup
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          deleteUsersPlayers();
        }}
      >
        Delete Lineup
      </button>
      {lineupShowing ? (
        <section>
          <h2>Today's Lineup:</h2>
          {matchingUsersPlayers.map((mUPO) => {
            const matchingPlayerObj = filteredPlayers.find(
              (p) => p.player.id === mUPO.playerId
            );
            return <div>Player Name: {matchingPlayerObj.player.firstName}</div>;
          })}
        </section>
      ) : (
        <div></div>
      )}
    </>
  );
};
