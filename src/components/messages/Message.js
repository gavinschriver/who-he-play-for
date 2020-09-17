import React, {useState, useContext, useEffect, useLayoutEffect} from "react";
import { MessageContext } from "./MessageProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider"

export const Message = ({ MO }) => {
  const { playerObjArray, getPlayerData } = useContext(PlayerContext)
  const { usersPlayers, getUsersPlayers } = useContext(UserPlayerContext)

  const [currentMessage, setCurrentMessage] = useState({ user: {} } || {});
  const [showHideMatchingPlayers, setShowHideMatchingPlayers] = useState(false);

  const matchingPlayersToggle = () => {
    if (!showHideMatchingPlayers) {
      setShowHideMatchingPlayers(true);
    } else if (showHideMatchingPlayers) {
      setShowHideMatchingPlayers(false);
    }
  };


  return (
    <article className="message" id={MO.id}>
      <div className="entryText">
        {MO.user.name || ""}
        <span>{MO.messagetext}</span>
      </div>
      <button
        onClick={e => {
          e.preventDefault()
          matchingPlayersToggle()
        }}
      >Show Playerz</button>
      {
        showHideMatchingPlayers ?
          <div>AH SHIT ITS AN ARRAY</div> 
          : <div></div>
      }
    </article>
  );
};
