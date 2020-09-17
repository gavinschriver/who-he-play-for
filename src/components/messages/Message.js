import React, {useState, useContext} from "react";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { PlayerContext } from "../players/PlayerProvider"

export const Message = ({ MO }) => {
  const [showHideMatchingPlayers, setShowHideMatchingPlayers] = useState(false);
  const { usersPlayers } = useContext(UserPlayerContext)
  const { playerObjArray } = useContext(PlayerContext)

  const matchingUsersPlayers = usersPlayers.filter(upo => {
    return upo.userId === MO.user.id
  })

  const matchingPlayers = matchingUsersPlayers.map(mUPO => {
    return (playerObjArray.find(p => {
      return mUPO.playerId === p.player.id
    }))
  })

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
