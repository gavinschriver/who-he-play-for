import React, { useState, useContext, useRef, useEffect } from "react";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { MessageContext } from "./MessageProvider";
import { Avatar } from "../users/Avatar";
import "./messages.css";
import { UserContext } from "../users/UserProvider";
import Button from "react-bootstrap/Button";
import { Table, Collapse } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import { PlayerSelectButton } from "../buttons/PlayerSelectButton";
import { LineupButton } from "../buttons/LineupButton";
import { DeleteMessageButton } from "../buttons/DeleteMessageButton";
import { MessageHeader } from "./MessageHeader";

export const Message = ({ MO }) => {
  const { usersPlayers, getUsersPlayers } = useContext(UserPlayerContext);
  const { playerObjArray, getPlayerData } = useContext(PlayerContext);
  const { messages, removeMessage, getMessages, updateMessage } = useContext(
    MessageContext
  );
  const { users, getUsers } = useContext(UserContext);

  // component-state data collections
  const [matchingUsersPlayers, setMatchingUsersPlayers] = useState([]);
  const [matchingPlayers, setMatchingPlayers] = useState([]);
  const [currentUsersPOs, setCurrentUsersPOs] = useState([]);
  const [message, setMessage] = useState({});
  const [user, setUser] = useState({});

  // component-state booleans, set current user and get a ref for message to edit
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
      return `${cUPO.player.firstName} ${cUPO.player.lastName}`;
    }) || {};

  //edit
  const toggleEditField = () => {
    setEditFieldShowing(!editFieldShowing);
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
    const matchingUser =
      users.find((u) => {
        return u.id === MO.user.id;
      }) || {};
    setUser(matchingUser);
  });

  const messageClassName = MO.stan
    ? "messageCard messageCard--stanned"
    : "messageCard";

  return (
    <Card className={messageClassName} id={MO.id}>
      {/* description */}
      <Card.Header className="message__description">
        <span className="message__author user--name">
          {MO.user.id === currentUserId ? (
            <span>YOU</span>
          ) : (
            <span>{MO.user.name || ""} </span>
          )}
        </span>

        {matchingPlayersFirstNames.includes(MO.messagetext) ? (
          <span class="messageType standTrue"> stan'd</span>
        ) : MO.trashtalk ? (
          <span>
            {" "}
            <span className="messageType trashtalkTrue">
              <Badge variant="danger">talked trash on</Badge>
            </span>
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
      </Card.Header>
      <MessageHeader
        userName={MO.user.name}
        userType={MO.user.id === currentUserId ? "current" : "other"}
        messageType={MO.stan ? "stan" : MO.trashtalk ? "trash" : "chat"}
        playerName={MO.messagetext}
        isYourGuy={matchingPlayersFirstNames.includes(MO.messagetext)}
      />
      {user.avatar ? <Avatar user={user} location="message" /> : <div></div>}

      <Card.Body className="playerCard--body">
        {/* lineup */}

        {MO.user.id === currentUserId ? (
          <div></div>
        ) : (
          <div>
            <LineupButton
              userType={MO.user.id === currentUserId ? "current" : "other"}
              userId={MO.userId}
            />
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
            <Button
              className="message__edit button edit--button message--button"
              ref={editRef}
              value={`editButton--${MO.id}`}
              onClick={(e) => {
                e.preventDefault();
                toggleEditField();
                const messageId = parseInt(
                  editRef.current.value.split("--")[1]
                );
                const messageToEdit = messages.find((m) => {
                  return m.id === messageId;
                });
                setMessage(messageToEdit);
              }}
            >
              Edit
            </Button>

            {editFieldShowing ? (
              <Button
                className="message__submit button submit--button message--button"
                onClick={(e) => {
                  e.preventDefault();
                  toggleEditField();
                  constructNewMessage();
                }}
              >
                Submit
              </Button>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div></div>
        )}

        {/* chat text edit field */}

        {editFieldShowing ? (
          <Form.Control
            as="textarea"
            className="message__textedit input textarea--input"
            name="chattext"
            onChange={handleControlledInputChange}
            value={message.chattext}
          ></Form.Control>
        ) : (
          <div></div>
        )}

        {/* delete button */}

        {MO.user.id === currentUserId ? (
          <DeleteMessageButton location="message" id={MO.id} />
        ) : (
          <div></div>
        )}
        {MO.stan ? <img /> : <div></div>}
      </Card.Body>
    </Card>
  );
};
