import React, { useState, useContext, useRef, useEffect } from "react";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { MessageContext } from "./MessageProvider";
import { Avatar } from "../users/Avatar";
import { UserContext } from "../users/UserProvider";
import { LineupButton } from "../buttons/LineupButton";
import { DeleteMessageButton } from "../buttons/DeleteMessageButton";
import { MessageHeader } from "./MessageHeader";
import { MessageURLink } from "./MessageURLink";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "./messages.css";
import { EditMessageButton } from "../buttons/EditMessageButton";
import MessageChatText from "./MessageChatText";
import SubmitedEditedMessageButton from "../buttons/SubmitedEditedMessageButton";
import { Container, Row, Col } from "react-bootstrap";

export const Message = ({ MO }) => {
  const { usersPlayers, getUsersPlayers } = useContext(UserPlayerContext);
  const { playerObjArray, getPlayerData } = useContext(PlayerContext);
  const { messages, getMessages, updateMessage } = useContext(MessageContext);
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
  const editMessageRef = React.createRef("");

  //find current user's lineup
  const currentUserPlayerIds = currentUsersPOs.map((cULO) => {
    return cULO.playerId;
  });

  const currentUsersPlayerObjects = currentUserPlayerIds.map((cUPID) => {
    return playerObjArray.find((pO) => {
      return pO.player.id === cUPID;
    });
  });

  const currentUsersLineupAsStrings = currentUsersPlayerObjects.map((cUPO) => {
    return `${cUPO.player.firstName} ${cUPO.player.lastName}`;
  });

  //edit
  const handleEditButtonPress = (e) => {
    e.preventDefault();
    toggleEditField();
    const messageId = parseInt(editMessageRef.current.value);
    const messageToEdit = messages.find((m) => {
      return m.id === messageId;
    });
    setMessage(messageToEdit);
  };

  const toggleEditField = () => {
    setEditFieldShowing(!editFieldShowing);
  };

  const handleControlledInputChange = (event) => {
    const newMessage = Object.assign({}, message);
    newMessage[event.target.name] = event.target.value;
    setMessage(newMessage);
  };

  const handleSubmitEditedMessage = (e) => {
    e.preventDefault();
    toggleEditField();
    constructNewMessage();
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
  }, [users]);

  const messageClassName = MO.stan
    ? "messageCard messageCard--stanned"
    : "messageCard";

  return (
    <Card className={messageClassName} id={MO.id}>
      <MessageHeader
        userName={MO.user.name}
        userType={MO.user.id === currentUserId ? "current" : "other"}
        messageType={MO.stan ? "stan" : MO.trashtalk ? "trash" : "chat"}
        playerName={MO.messagetext}
        isYourGuy={currentUsersLineupAsStrings.includes(MO.messagetext)}
        time={MO.timestamp}
      />
      <Container>
        <Row>
          <Col sm={4}>
            {user.avatar && <Avatar user={user} location="message" />}
          </Col>
          {/* chat text */}
          <Col sm={8}>
            {editFieldShowing ? (
              <Form.Control
                as="textarea"
                className="message__textedit input textarea--input"
                name="chattext"
                onChange={handleControlledInputChange}
                value={message.chattext}
              ></Form.Control>
            ) : (
              <MessageChatText class="message__chattext" text={MO.chattext} />
            )}
            {/* URL */}
            <MessageURLink
              url={MO.url}
              class="messageURLInk"
              type={MO.stan ? "stan" : MO.trashtalk ? "trash" : ""}
            />
          </Col>
        </Row>
      </Container>

      <Card.Body className="playerCard--body">
        {/* lineup */}

        {MO.user.id !== currentUserId && (
          <LineupButton
            userType={MO.user.id === currentUserId ? "current" : "other"}
            userId={MO.userId}
          />
        )}

        {/* edit/submit buttons */}

        {MO.user.id === currentUserId && (
          <div className="message__edit">
            <EditMessageButton
              id={MO.id}
              action={handleEditButtonPress}
              ref={editMessageRef}
            />

            {editFieldShowing && (
              <SubmitedEditedMessageButton action={handleSubmitEditedMessage} />
            )}
          </div>
        )}

        {/* delete button */}
        {MO.user.id === currentUserId && (
          <DeleteMessageButton location="message" id={MO.id} />
        )}
      </Card.Body>
    </Card>
  );
};
