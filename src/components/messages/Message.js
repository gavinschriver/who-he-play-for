import React, { useState, useContext, useRef, useEffect } from "react";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { MessageContext } from "./MessageProvider";
import "./messages.css";

export const Message = ({ MO }) => {
  const [showHideMatchingPlayers, setShowHideMatchingPlayers] = useState(false);
  const { usersPlayers, getUsersPlayers } = useContext(UserPlayerContext);
  const { playerObjArray, getPlayerData, setTrashtalkPlayer } = useContext(PlayerContext);
  const { removeMessage } = useContext(MessageContext);
  const currentUserId = parseInt(localStorage.getItem("whpf_user"));
  const [matchingUsersPlayers, setMatchingUsersPlayers] = useState([])
  const [matchingPlayers, setMatchingPlayers] = useState([])
  const [currentUsersPOs, setCurrentUsersPOs] = useState([])
  const [currentPlayers, setCurrentPlayers] = useState([])

  const matchingPlayersFirstNames = matchingPlayers.map((mPO) => {
    return mPO.player.firstName;
  });

  //DRILLING DOWN TO CURRENT USERS LINEUP WEEEE

  //array of current user's lineup player IDs
  const currentUserPlayerIds = currentUsersPOs.map((cULO) => {
    return cULO.playerId;
  });

  //array of current user's lineup as PLAYA objects
  const currentUsersPlayerObjects = currentUserPlayerIds.map((cUPID) => {
    return playerObjArray.find((pO) => {
      return pO.player.id === cUPID;
    });
  }) || {};

  //array of current users lineup as firstName 
  const currenUsersLineupAsStrings = currentUsersPlayerObjects.map((cUPO) => {
    return cUPO.player.firstName;
  }) || {};

  const matchingPlayersToggle = () => {
    if (!showHideMatchingPlayers) {
      setShowHideMatchingPlayers(true);
    } else if (showHideMatchingPlayers) {
      setShowHideMatchingPlayers(false);
    }
  };

  const messageClassName = MO.stan ? "message card stanMessage" : "message card trashMessage"

  useEffect(() => {
    getUsersPlayers()
    .then(getPlayerData)
  }, [])

  useEffect(() => {
    const matchingUPs = usersPlayers.filter((upo) => {
      return upo.userId === MO.user.id;
    }) || {};
    setMatchingUsersPlayers(matchingUPs)
  }, [usersPlayers])

  useEffect(() => {
    const matchingPOs = matchingUsersPlayers.map((mUPO) => {
      return playerObjArray.find((p) => {
        return mUPO.playerId === p.player.id;
      });
    }) || {}
    setMatchingPlayers(matchingPOs)
  }, [playerObjArray])

  useEffect(() => {
    const currentUserLineup = usersPlayers.filter((uPO) => {
      return uPO.userId === currentUserId;
    }) || {};
    setCurrentUsersPOs(currentUserLineup)
  }, [usersPlayers])

  return (
    <article className={messageClassName} id={MO.id}>
      <div className="entryText">

        {
          MO.user.id === currentUserId
            ? <span>YOU</span>
            :<span >{MO.user.name || ""}</span>
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
          <span> stan'd </span>
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
                      href={`https://www.reddit.com/search?q=${mPO.player.firstName}%20${mPO.player.lastName}`}
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
        <div className="message__url" >
          <a href={MO.url} target="_blank">I'll just leave this here...</a>
        </div>
      ) : (
        <div></div>
          )}
      <div>{MO.chattext}</div>
    </article>
  );
};
