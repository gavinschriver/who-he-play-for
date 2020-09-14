import React, { useState, useEffect } from "react";

export const PlayerContext = React.createContext();

export const PlayerProvider = (propsObj) => {
  const [players, setPlayers] = useState([]);

  const [realPlayers, setRealPlayers] = useState({});

  const getPlayersForreal = () => {
    return fetch(`https://api.mysportsfeeds.com/v2.1/pull/nba/players.json`, {
      headers: {
        Authorization:
          `Basic NjJiNTU0MDAtODZkOS00ZGQ1LTgyMzAtOWQ2N2U1Ok1ZU1BPUlRTRkVFRFMKCg==`
      }
    })
      .then((res) => res.json())
      .then(setRealPlayers);
  };

  useEffect(() => {
    getPlayersForreal();
  }, []);

  useEffect(() => {
    console.log(realPlayers)
  }, [realPlayers])

  return (
    <PlayerContext.Provider
      value={{
      }}
    >
      {propsObj.children}
    </PlayerContext.Provider>
  );
};
