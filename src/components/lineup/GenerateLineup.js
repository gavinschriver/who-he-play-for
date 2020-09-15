import React, { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../players/PlayerProvider";

export const GenerateLineup = () => {
  const { getPlayerData, playerObjArray } = useContext(PlayerContext);

  const [lineupShowing, setLineUpShowing] = useState(false);

  const filteredPlayers =
    playerObjArray.filter(
      (p) =>
        p.player.currentRosterStatus === "ROSTER" && p.player.officialImageSrc
      ) || [];
    
    const filteredPlayerIds = filteredPlayers.map(p => p.player.id)

    console.log(filteredPlayerIds)

  const handleGenerateLineup = () => {
    if (!lineupShowing) {
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
