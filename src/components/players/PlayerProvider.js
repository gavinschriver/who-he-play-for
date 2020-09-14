import React, { useState, useEffect } from "react";

export const PlayerContext = React.createContext();

export const PlayerProvider = (propsObj) => {
//   const [players, setPlayers] = useState([]);

  const [players, setPlayers] = useState({});

  const getPlayers = () => {
    return fetch(`https://api.mysportsfeeds.com/v2.1/pull/nba/players.json`, {
      headers: {
        Authorization:
          `Basic NjJiNTU0MDAtODZkOS00ZGQ1LTgyMzAtOWQ2N2U1Ok1ZU1BPUlRTRkVFRFMKCg==`
      }
    })
      .then((res) => res.json())
      .then(setPlayers);
  };

//   useEffect(() => {
//     getPlayers();
//   }, []);

//   useEffect(() => {
//     console.log(players)
//   }, [players])

  return (
    <PlayerContext.Provider
          value={{
              players,
              getPlayers
      }}
    >
      {propsObj.children}
    </PlayerContext.Provider>
  );
};
