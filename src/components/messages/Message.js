import React, {useState} from "react";
import { MessageContext } from "./MessageProvider";

export const Message = ({ MO }) => {
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
