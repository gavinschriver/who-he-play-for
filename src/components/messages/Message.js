import React, { useState, useContext, useRef, useEffect } from "react";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { MessageContext } from "./MessageProvider";
import { Avatar } from "../users/Avatar";
import "./messages.css";
import { UserContext } from "../users/UserProvider";

export const Message = ({ MO }) => {
  const { usersPlayers, getUsersPlayers } = useContext(UserPlayerContext);
  const { playerObjArray, getPlayerData, setTrashtalkPlayer } = useContext(
    PlayerContext
  );
  const { messages, removeMessage, getMessages, updateMessage } = useContext(
    MessageContext
  );
  const {users, getUsers } = useContext(UserContext)

  // component-state data collections
  const [matchingUsersPlayers, setMatchingUsersPlayers] = useState([]);
  const [matchingPlayers, setMatchingPlayers] = useState([]);
  const [currentUsersPOs, setCurrentUsersPOs] = useState([]);
  const [message, setMessage] = useState({});
  const [user, setUser] = useState({})

  // component-state booleans, set current user and get a ref for message to edit
  const [showHideMatchingPlayers, setShowHideMatchingPlayers] = useState(false);
  const [editFieldShowing, setEditFieldShowing] = useState(false);
  const currentUserId = parseInt(localStorage.getItem("whpf_user"));
  const editRef = useRef("");

  const matchingPlayersFirstNames = matchingPlayers.map((mPO) => {
    return mPO.player.firstName;
  });

  //find current user's lineup
  const currentUserPlayerIds = currentUsersPOs.map((cULO) => {
    return cULO.playerId;
  });

  const currentUsersPlayerObjects =
    currentUserPlayerIds.map((cUPID) => {
      return playerObjArray.find((pO) => {
        return pO.player.id === cUPID;
      });
    }) || {};

  const currenUsersLineupAsStrings =
    currentUsersPlayerObjects.map((cUPO) => {
      return cUPO.player.firstName;
    }) || {};

  // linup toggle
  const matchingPlayersToggle = () => {
    if (!showHideMatchingPlayers) {
      setShowHideMatchingPlayers(true);
    } else if (showHideMatchingPlayers) {
      setShowHideMatchingPlayers(false);
    }
  };

  //edit
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

  //effects time

  useEffect(() => {
    getUsersPlayers().then(getPlayerData).then(getMessages).then(getUsers);
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

  useEffect(() => {
    const matchingUser = users.find(u => {
      return u.id === MO.user.id
    }) || {}
    setUser(matchingUser)
  })

  const messageClassName = MO.stan
    ? "message card stanMessage"
    : "message card trashMessage";

  return (
    <article className={messageClassName} id={MO.id}>
      {/* description */}

      <div className="message__description">
        <span className="message__author">
          {MO.user.id === currentUserId ? (
            <span>YOU</span>
          ) : (
            <span>{MO.user.name || ""}</span>
          )}
        </span>

        {matchingPlayersFirstNames.includes(MO.messagetext) ? (
          <span> stan'd</span>
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
        )}
        <span className="message__playerName"> {MO.messagetext}</span>
      </div>

      {/* lineup */}

      {MO.user.id === currentUserId ? (
        <div></div>
      ) : (
        <div>
          <button
            className="message__showLineup button message--button lineup--button"
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

      {/* URL */}

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

      {/* edit/submit buttons */}

      {MO.user.id === currentUserId ? (
        <div className="message__edit">
          <button
            className="message__edit button edit--button message--button"
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
              className="message__submit button submit--button message--button"
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

      {/* chat text edit field */}

      {editFieldShowing ? (
        <textarea
          className="message__textedit input textarea--input"
          name="chattext"
          onChange={handleControlledInputChange}
          value={message.chattext}
        ></textarea>
      ) : (
        <div></div>
      )}

      {/* delete button */}

      {MO.user.id === currentUserId && !MO.stan ? (
        <button
          className="message__delete button delete--button message--button"
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
      {MO.stan ? <img /> : <div></div>}
      <Avatar user={user} location="message" />
    </article>
  );
};
