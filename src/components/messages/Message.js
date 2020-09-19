import React, { useState, useContext } from "react";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { MessageContext } from "./MessageProvider";
import "./messages.css"

export const Message = ({ MO }) => {
  const [showHideMatchingPlayers, setShowHideMatchingPlayers] = useState(false);
  const { usersPlayers } = useContext(UserPlayerContext);
  const { playerObjArray } = useContext(PlayerContext);
  const { removeMessage } = useContext(MessageContext);
  const currentUserId = parseInt(localStorage.getItem("whpf_user"))

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
    <article className="message card" id={MO.id}>
      <div className="entryText">
        <span className="message__username">{MO.user.name || ""}</span>
        {matchingPlayersFirstNames.includes(MO.messagetext) ? (
          <span> stans for</span>
        ) : MO.trashtalk ? (
          <span> is talkin' trash on </span>
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
                <a href={`http://www.google.com/search?q=${mPO.player.firstName}+${mPO.player.lastName}`} target="_blank">{mPO.player.firstName} {mPO.player.lastName}</a>
                {
                  MO.user.id !== currentUserId
                    ? <span>TRASH</span>
                    :<span></span>
                }
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
        )}
      {MO.user.id === currentUserId && (!MO.stan) ? (
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
      {
        MO.stan
          ? <div className="message__url"><a href={MO.url} target="_blank">HEAT CHECK</a></div>
          : MO.trashtalk
            ? < div className="message__url" target="_blank"><a href={MO.url}>I'll just leave this here...</a></div>
            : <div></div>
      }
    </article>
  );
};
