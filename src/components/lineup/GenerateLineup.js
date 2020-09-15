import React, { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";

export const GenerateLineup = () => {
  const { getPlayerData, playerObjArray } = useContext(PlayerContext);
  const { usersPlayers, getUsersPlayers, addUserPlayer } = useContext(
    UserPlayerContext
  );

  const [matchingUsersPlayers, setMatchingUsersPlayers] = useState([]);
  const [lineupShowing, setLineUpShowing] = useState(false);

  const filteredPlayers = playerObjArray.filter(
    (p) =>
      p.player.currentRosterStatus === "ROSTER" && p.player.officialImageSrc
  );

    const filteredPlayerIds = filteredPlayers.map((p) => p.player.id);
    
    const matchingUPOS = usersPlayers.filter(upo => {
        return upo.userId === parseInt(localStorage.getItem("whpf_user"))
    })

    console.log(matchingUPOS)

  const createUsersPlayers = () => {
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

  const handleGenerateLineup = () => {
    if (!lineupShowing) {
      createUsersPlayers();
      setLineUpShowing(true);
    }
  };

  useEffect(() => {
    getPlayerData().then(getUsersPlayers);
  }, []);

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
      {lineupShowing ? (
        <section>
                  <h2>Today's Lineup:</h2>
                  {
                      matchingUPOS.map(mUPO => {
                          const matchingPlayerObj =
                              filteredPlayers.find(p => p.player.id === mUPO.playerId)
                          return (
                              <div>Player Name: {matchingPlayerObj.player.firstName}</div>
                          )
                      })
                  }
        </section>
      ) : (
        <div></div>
      )}
    </>
  );
};
