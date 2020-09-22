import React, { useState, useContext, useRef, useEffect } from "react";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { MessageContext } from "./MessageProvider";
import "./messages.css";

export const Message = ({ MO }) => {
  const [showHideMatchingPlayers, setShowHideMatchingPlayers] = useState(false);
  const { usersPlayers, getUsersPlayers } = useContext(UserPlayerContext);
  const { playerObjArray, getPlayerData, setTrashtalkPlayer } = useContext(
    PlayerContext
  );
  const { messages, removeMessage, getMessages, updateMessage } = useContext(
    MessageContext
  );
  const currentUserId = parseInt(localStorage.getItem("whpf_user"));
  const [matchingUsersPlayers, setMatchingUsersPlayers] = useState([]);
  const [matchingPlayers, setMatchingPlayers] = useState([]);
  const [currentUsersPOs, setCurrentUsersPOs] = useState([]);

  const [message, setMessage] = useState({});

  const editRef = useRef("");

  const matchingPlayersFirstNames = matchingPlayers.map((mPO) => {
    return mPO.player.firstName;
  });

  //DRILLING DOWN TO CURRENT USERS LINEUP WEEEE

  //array of current user's lineup player IDs
  const currentUserPlayerIds = currentUsersPOs.map((cULO) => {
    return cULO.playerId;
  });

  //array of current user's lineup as PLAYA objects
  const currentUsersPlayerObjects =
    currentUserPlayerIds.map((cUPID) => {
      return playerObjArray.find((pO) => {
        return pO.player.id === cUPID;
      });
    }) || {};

  //array of current users lineup as firstName
  const currenUsersLineupAsStrings =
    currentUsersPlayerObjects.map((cUPO) => {
      return cUPO.player.firstName;
    }) || {};

  const matchingPlayersToggle = () => {
    if (!showHideMatchingPlayers) {
      setShowHideMatchingPlayers(true);
    } else if (showHideMatchingPlayers) {
      setShowHideMatchingPlayers(false);
    }
  };

  const [editFieldShowing, setEditFieldShowing] = useState(false);

  const toggleEditField = () => {
    if (!editFieldShowing) {
      setEditFieldShowing(true);
    } else if (editFieldShowing) {
      setEditFieldShowing(false);
    }
  };

  const handleControlledInputChange = (event) => {
    const newMessage = Object.assign({}, message);
    newMessage[event.target.name] = event.target.value;
    setMessage(newMessage);
  };

  const messageClassName = MO.stan
    ? "message card stanMessage"
    : "message card trashMessage";

  useEffect(() => {
    getUsersPlayers().then(getPlayerData).then(getMessages);
  }, []);

  useEffect(() => {
    const matchingUPs =
      usersPlayers.filter((upo) => {
        return upo.userId === MO.user.id;
      }) || {};
    setMatchingUsersPlayers(matchingUPs);
  }, [usersPlayers]);

  useEffect(() => {
    const matchingPOs =
      matchingUsersPlayers.map((mUPO) => {
        return playerObjArray.find((p) => {
          return mUPO.playerId === p.player.id;
        });
      }) || {};
    setMatchingPlayers(matchingPOs);
  }, [playerObjArray]);

  useEffect(() => {
    const currentUserLineup =
      usersPlayers.filter((uPO) => {
        return uPO.userId === currentUserId;
      }) || {};
    setCurrentUsersPOs(currentUserLineup);
  }, [usersPlayers]);

  const constructNewMessage = () => {
    const updatedMessage = {
      id: message.id,
      messagetext: message.messagetext,
      chattext: message.chattext,
      stan: message.stan,
      trashtalk: message.trashtalk,
      url: message.url,
      timestamp: message.timestamp,
      userId: message.userId,
    };
    updateMessage(updatedMessage);
  };

  return (
    <article className={messageClassName} id={MO.id}>

      <div className="message__description">
        <span className="message__author">
        {MO.user.id === currentUserId ? (
          <span>YOU</span>
        ) : (
          <span>{MO.user.name || ""}</span>
        )}
        </span>
          
        {
          /* does the incoming message's messagetext field contain a player name 
          that's in the collection of that message object's user's lineup? if so, it's a STAN */
          matchingPlayersFirstNames.includes(MO.messagetext) ? (
            <span>
              {" "}
              stan'd
            </span>
          ) : MO.trashtalk ? (
            <span>
              {" "}
                <span>talked trash on</span>
              {currenUsersLineupAsStrings.includes(MO.messagetext) ? (
                <span> your guy</span>
              ) : (
                <span></span>
              )}
            </span>
          ) : (
            <span> stan'd </span>
          )
        }
        <span className="message__playerName"> {MO.messagetext}</span>
      </div>

      {MO.user.id === currentUserId ? (
        <div></div>
      ) : (
        <div>
          <button className="button message__showLineup message--button"
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

      {MO.stan ? (
        <div className="message__url message__url__heatcheck">
          <a href={MO.url} target="_blank" className="link message--link">
            HEAT CHECK
          </a>
        </div>
      ) : MO.trashtalk ? (
        <div className="message__url message__url__trashtalk">
          <a href={MO.url} target="_blank" className="link message--link">
            I'll just leave this here...
          </a>
        </div>
      ) : (
        <div></div>
      )}

      <div className="message__chattext">{MO.chattext}</div>

      {MO.user.id === currentUserId ? (
        <div className="message__edit">
          <button
            className="message__edit__button button message--button"
            ref={editRef}
            value={`editButton--${MO.id}`}
            onClick={(e) => {
              e.preventDefault();
              toggleEditField();
              const messageId = parseInt(editRef.current.value.split("--")[1]);
              const messageToEdit = messages.find((m) => {
                return m.id === messageId;
              });
              setMessage(messageToEdit);
            }}
          >
            Edit
          </button>

          {editFieldShowing ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleEditField();
                constructNewMessage();
              }}
            >
              Submit
            </button>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div></div>
      )}

      {editFieldShowing ? (
        <textarea
          name="chattext"
          onChange={handleControlledInputChange}
          value={message.chattext}
        ></textarea>
      ) : (
        <div></div>
      )}

      {/* regret */}
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
    </article>
  );
};
