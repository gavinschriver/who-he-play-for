import React, { useState, useEffect } from "react";

export const PlayerContext = React.createContext();

export const PlayerProvider = (propsObj) => {
  const [playerObjArray, setPlayerObjArray] = useState([]);

  // set an app-state variable for a player string name selected off dom
  const [trashtalkPlayer, setTrashtalkPlayer] = useState("")

  const getPlayerData = () => {
    return fetch(`http://localhost:8889/db`)
      .then((res) => res.json())
      .then((playerData) => {
        setPlayerObjArray(playerData.players);
      });
  };

  return (
    <PlayerContext.Provider
      value={{
        getPlayerData,
        playerObjArray,
        trashtalkPlayer,
        setTrashtalkPlayer
      }}
    >
      {propsObj.children}
    </PlayerContext.Provider>
  );
};
