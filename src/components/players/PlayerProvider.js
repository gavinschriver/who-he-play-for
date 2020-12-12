import React, { useState, createContext } from "react";


export const PlayerContext = React.createContext();

export const PlayerProvider = (propsObj) => {
  const [playerObjArray, setPlayerObjArray] = useState([]);
  const [loaded, setLoaded] = useState(false)

  // set an app-state variable for a player string name selected off dom
  const [trashtalkPlayer, setTrashtalkPlayer] = useState("")
  const [stanPlayer, setStanPlayer] = useState("")

  const getPlayerData = () => {
    return fetch(`http://localhost:8889/db`)
      .then((res) => res.json())
      .then((playerData) => {
        setPlayerObjArray(playerData.players);
      });
  };


  return (
    <PlayerContext.Provider
      isLoaded={loaded}
      value={{
        getPlayerData,
        playerObjArray,
        trashtalkPlayer,
        setTrashtalkPlayer,
        stanPlayer,
        setStanPlayer
      }}>
      {propsObj.children}
    </PlayerContext.Provider>
  );
};
