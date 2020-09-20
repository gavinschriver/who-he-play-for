import React, { useState, useContext, useRef } from "react";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { MessageContext } from "./MessageProvider";
import "./messages.css";

export const Message = ({ MO }) => {
  const [showHideMatchingPlayers, setShowHideMatchingPlayers] = useState(false);
  const { usersPlayers } = useContext(UserPlayerContext);
  const { playerObjArray, setTrashtalkPlayer } = useContext(PlayerContext);
  const { removeMessage } = useContext(MessageContext);
  const currentUserId = parseInt(localStorage.getItem("whpf_user"));

  //For each message object, use it's userId to look up the userID on matching upos (bring in that message's user's whole lineup)
  const matchingUsersPlayers = usersPlayers.filter((upo) => {
    return upo.userId === MO.user.id;
  });

  // turn the message object user's UPOS into Player Objects
  const matchingPlayers = matchingUsersPlayers.map((mUPO) => {
    return playerObjArray.find((p) => {
      return mUPO.playerId === p.player.id;
    });
  });

  // array of strings of each of the current message object's user's Lineup 
  const matchingPlayersFirstNames = matchingPlayers.map((mPO) => {
    return mPO.player.firstName;
  });

  //DRILLING DOWN TO CURRENT USERS LINEUP WEEEE

  //true false to see if any of the UPOs belong to current user. For some reason.
  const isCurrentUser = matchingUsersPlayers.find((mUPO) => {
    return mUPO.userId === currentUserId;
  });

  //current users lineup as UserPlayerObjects
  const currentUserLineup = usersPlayers.filter((uPO) => {
    return uPO.userId === currentUserId;
  });

  //array of current user's lineup player IDs
  const currentUserPlayerIds = currentUserLineup.map((cULO) => {
    return cULO.playerId;
  });

  //array of current user's lineup as PLAYA objects
  const currentUsersPlayerObjects = currentUserPlayerIds.map((cUPID) => {
    return playerObjArray.find((pO) => {
      return pO.player.id === cUPID;
    });
  });

  //array of current users lineup as firstName STRINGS FINALLY JESUS
  const currenUsersLineupAsStrings = currentUsersPlayerObjects.map((cUPO) => {
    return cUPO.player.firstName;
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

        {
          MO.user.id === currentUserId
            ? <span>YOU</span>
            :<span className="message__username">{MO.user.name || ""}</span>
        }
        

        { /* does the incoming message's messagetext field contain a player name 
          that's in the collection of that message object's user's lineup? if so, it's a STAN */
          matchingPlayersFirstNames.includes(MO.messagetext) ? (


            

            <span> stan{MO.user.id === currentUserId ? <span>'d</span> : <span>'d</span>}</span>
            
            
        ) : MO.trashtalk ? (
          <span>
            {" "}
            {MO.user.id === currentUserId ? <span>talked trash on</span> : <span>talked trash on</span>} 
            {currenUsersLineupAsStrings.includes(MO.messagetext) ? (
              <span> your guy</span>
            ) : (
              <span></span>
            )}
          </span>
        ) : (
          <span> stans for </span>
            )}
        
        {/* in case we wanna add just plain non-game-related message later... 
        will probably have to change this field (property) to something else because
        messagetext is now the first name of the player being shouted out */}

        <span> {MO.messagetext}</span>

      </div>

      {MO.user.id === currentUserId ? (
        <div></div>
      ) : (
        <div>
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
                    <a
                      href={`http://www.google.com/search?q=${mPO.player.firstName}+${mPO.player.lastName}`}
                      target="_blank"
                    >
                      {mPO.player.firstName} {mPO.player.lastName}
                    </a>
                    {MO.user.id !== currentUserId ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setTrashtalkPlayer(mPO.player.firstName);
                        }}
                      >
                        TRASH
                      </button>
                    ) : (
                      <span></span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}

      {MO.user.id === currentUserId && !MO.stan ? (
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
      {MO.stan ? (
        <div className="message__url">
          <a href={MO.url} target="_blank">
            HEAT CHECK
          </a>
        </div>
      ) : MO.trashtalk ? (
        <div className="message__url" target="_blank">
          <a href={MO.url}>I'll just leave this here...</a>
        </div>
      ) : (
        <div></div>
      )}
    </article>
  );
};
