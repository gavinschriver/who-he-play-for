import React, { useContext, useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { MessageContext } from "../messages/MessageProvider";
import { UserContext } from "../users/UserProvider";
import { PlayerContext } from "../players/PlayerProvider";
import "./selectors.css";

export const MessageSelector = React.forwardRef((props, ref) => {
  const { messages, getMessages, setCollection } = useContext(MessageContext);
  const { getUserById, currentUserId } = useContext(UserContext);
  const { playerObjArray, getPlayerData } = useContext(PlayerContext);
  const [allMessages, setAllMessages] = useState([]);
  const [currentUsersPlayers, setCurrentUsersPlayers] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    usersPlayers: [],
    messages: [],
  });

  const handleMessageSelect = (collectionName) => {
    setCollection(collectionName);
  };

  const currentUsersMessages = allMessages.filter(
    (MO) => MO.userId === parseInt(localStorage.getItem("whpf_user"))
  );

  const currentUsersPlayerNames = currentUsersPlayers.map((PO) => {
    return `${PO.player.firstName} ${PO.player.lastName}`;
  });

  const messagesAboutCurrentUsersLineup = allMessages.filter((m) => {
    return currentUsersPlayerNames.includes(m.messagetext);
  });

  useEffect(() => {
    getUserById(currentUserId)
      .then(setCurrentUser)
      .then(getMessages)
      .then(getPlayerData);
  }, []);

  useEffect(() => {
    setAllMessages(messages);
  }, [messages]);

  useEffect(() => {
    const matchingPlayers =
      currentUser.usersPlayers.map((up) => {
        return playerObjArray.find((p) => {
          return p.player.id === up.playerId;
        });
      }) || {};
    setCurrentUsersPlayers(matchingPlayers);
  }, [playerObjArray]);

  return (
    <DropdownButton title="Show Messages" ref={ref} value={false}>
      <Dropdown.Item
        onClick={(e) => {
          e.preventDefault();
          handleMessageSelect(messages);
        }}
      >
        Show all
      </Dropdown.Item>
      <Dropdown.Item
        onClick={(e) => {
          e.preventDefault();
          handleMessageSelect(currentUsersMessages);
        }}
      >
        Your messages
      </Dropdown.Item>
      <Dropdown.Item
        onClick={(e) => {
          e.preventDefault();
          handleMessageSelect(messagesAboutCurrentUsersLineup);
        }}
      >
        About your players
      </Dropdown.Item>
      <Dropdown.Item
        className="closeMessages"
        onClick={(e) => {
          e.preventDefault();
          handleMessageSelect([]);
        }}
      >
        Close Messages
      </Dropdown.Item>
    </DropdownButton>
  );
});
