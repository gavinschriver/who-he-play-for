import React, { useState, useEffect } from "react";

export const PlayerContext = React.createContext();

export const PlayerProvider = (propsObj) => {
  const [playerObjArray, setPlayerObjArray] = useState([]);
  const [playerData, setPlayerData] = useState({});

  const getPlayerData = () => {
    return fetch(`https://api.mysportsfeeds.com/v2.1/pull/nba/players.json`, {
      headers: {
        Authorization:
          `Basic NjJiNTU0MDAtODZkOS00ZGQ1LTgyMzAtOWQ2N2U1Ok1ZU1BPUlRTRkVFRFMKCg==`
      }
    })
      .then((res) => res.json())
      .then(setPlayerData);
  };
    

  return (
    <PlayerContext.Provider
          value={{
              getPlayerData,
              playerData,
              playerObjArray,
              setPlayerObjArray
      }}
    >
      {propsObj.children}
    </PlayerContext.Provider>
  );
};
