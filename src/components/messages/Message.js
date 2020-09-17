import React, { useState, useContext } from "react";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { MessageContext } from "./MessageProvider";

export const Message = ({ MO }) => {
  const [showHideMatchingPlayers, setShowHideMatchingPlayers] = useState(false);
  const { usersPlayers } = useContext(UserPlayerContext);
  const { playerObjArray } = useContext(PlayerContext);
  const { removeMessage } = useContext(MessageContext);

  const matchingUsersPlayers = usersPlayers.filter((upo) => {
    return upo.userId === MO.user.id;
  });

  const matchingPlayers = matchingUsersPlayers.map((mUPO) => {
    return playerObjArray.find((p) => {
      return mUPO.playerId === p.player.id;
    });
  });

  const matchingPlayersFirstNames = matchingPlayers.map((mPO) => {
    return mPO.player.firstName;
  });

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
        <span class="message__username">{MO.user.name || ""}</span>
        {matchingPlayersFirstNames.includes(MO.messagetext) ? (
          <span> stans for:</span>
        ) : MO.trashtalk ? (
          <span> is talkin' trash on: </span>
        ) : (
          <div></div>
        )}
        <span> {MO.messagetext}</span>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          matchingPlayersToggle();
        }}
      >
        Show Current Lineup:
      </button>

      {showHideMatchingPlayers ? (
        <div>
          {matchingPlayers.map((mPO) => {
            return (
              <div>
                {mPO.player.firstName} {mPO.player.lastName}
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
      {MO.user.id === parseInt(localStorage.getItem("whpf_user")) && (!MO.stan) ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            removeMessage(MO.id);
          }}
        >
          #regret
        </button>
      ) : (
        <div></div>
      )}
    </article>
  );
};
