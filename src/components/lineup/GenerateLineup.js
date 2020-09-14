import React, { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../players/PlayerProvider";

export const GenerateLineup = () => {
  const [lineupShowing, setLineUpShowing] = useState(false);

  const { players, getPlayers } = useContext(PlayerContext);

  const [playerData, setPlayerData] = useState({});

    const [playersArray, setPlayersArray] = useState([]);
    
    const [playerIdsArray, setPlayeIdsArray] = useState([]) 
    

  const handleGenerateLineup = () => {
    if (!lineupShowing) {
      setLineUpShowing(true);
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);

  useEffect(() => {
    setPlayerData(players);
  }, [players]);

  useEffect(() => {
    setPlayersArray(playerData.players);
  }, [playerData]);

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
                      playersArray.map(p => {
                          return (
                          <>
                                  <div>Player Name: {p.player.firstName} {p.player.lastName}</div>
                                  <div>Pic:<img src={p.player.officialImageSrc} /></div>
                              </>
                          )}
                      )
                  }
        </section>
      ) : (
        <div></div>
      )}
    </>
  );
};
