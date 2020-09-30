import React, { useContext, useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { MessageContext } from "../messages/MessageProvider";
import { UserContext } from "../users/UserProvider";
import { PlayerContext } from "../players/PlayerProvider";

export const MessageSelector = React.forwardRef((props, ref) => {
  const { messages, getMessages, setCollection } = useContext(MessageContext);
  const { getUserById, currentUserId } = useContext(UserContext);
  const { playerObjArray, getPlayerData } = useContext(PlayerContext);
  const [currentUsersPlayers, setCurrentUsersPlayers] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    usersPlayers: [],
    messages: [],
  });

  const handleMessageSelect = (collectionName) => {
    setCollection(collectionName);
  };

  const currentUsersMessages =
    messages.filter(
      (MO) => MO.userId === parseInt(localStorage.getItem("whpf_user"))
    );

  const currentUsersPlayerNames = currentUsersPlayers.map((PO) => {
    return `${PO.player.firstName} ${PO.player.lastName}`;
  });

  const messagesAboutCurrentUsersLineup = messages.filter((m) => {
    return currentUsersPlayerNames.includes(m.messagetext);
  });

  useEffect(() => {
    getUserById(currentUserId)
      .then(setCurrentUser)
      .then(getMessages)
      .then(getPlayerData);
  }, []);

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
    <DropdownButton title="Filter Messages">
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
    </DropdownButton>
  );
});
