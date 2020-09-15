import React, { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider"

export const GenerateLineup = () => {
    const { getPlayerData, playerObjArray } = useContext(PlayerContext);
    const { addUserPlayer } = useContext(UserPlayerContext)

  const [lineupShowing, setLineUpShowing] = useState(false);

  const filteredPlayers = playerObjArray.filter(
    (p) =>
      p.player.currentRosterStatus === "ROSTER" && p.player.officialImageSrc
  );

  const filteredPlayerIds = filteredPlayers.map((p) => p.player.id);

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
    getPlayerData();
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
          {filteredPlayers.map((p) => {
            return <div>{p.player.currentRosterStatus}</div>;
          })}
        </section>
      ) : (
        <div></div>
      )}
    </>
  );
};
