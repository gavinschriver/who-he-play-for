import React, { useContext, useEffect, useState, useRef } from "react";
import { MessageContext } from "./MessageProvider";
import { Message } from "./Message";
import { MessageSelector } from "../selectors/MessageSelector";
import { Dropdown, DropdownButton, Collapse, Button } from "react-bootstrap";
import { UserContext } from "../users/UserProvider";
import { PlayerContext } from "../players/PlayerProvider";
import "./messages.css";

export const MessagesList = (props) => {
  const { messages, getMessages } = useContext(MessageContext);
  const { getUserById, currentUserId } = useContext(UserContext);
  const { playerObjArray, getPlayerData } = useContext(PlayerContext);
  const [filter, setFilter] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    usersPlayers: [],
    messages: [],
  });

  const handleFilterSelect = (e) => {
    setFilter(e);
  };

  // init hook
  useEffect(() => {
    getUserById(currentUserId)
      .then(setCurrentUser)
      .then(getMessages)
      .then(getPlayerData);
  }, []);

  useEffect(() => {
    setCurrentUser(currentUser);
  }, [currentUser]);

  return (
    <>
      <h2>Spin Zone</h2>
      <DropdownButton title="Filter messages" onSelect={handleFilterSelect}>
        <Dropdown.Item eventKey="all">All messages</Dropdown.Item>
        <Dropdown.Item eventKey="recent">Recent Activity</Dropdown.Item>
        <Dropdown.Item eventKey="current">Your messages</Dropdown.Item>
        <Dropdown.Item eventKey="stan">Stans</Dropdown.Item>
        <Dropdown.Item eventKey="aboutPlayers">
          About your players
        </Dropdown.Item>
      </DropdownButton>
      <article>
        {messages
          .sort((a, b) => {
            return b.timestamp - a.timestamp;
          })
          .filter((m) => {
            if (filter === null || filter === "recent") {
              const sorted = messages.sort((a, b) => {
                return b.timestamp - a.timestamp;
              });
              const sliced = sorted.slice(0, 5);
              return sliced.includes(m);
            }
            if (filter === "all") {
              return m;
            }
            if (filter === "stan") {
              return m.stan;
            }
            if (filter === "current") {
              return m.userId === currentUserId;
            }
            if (filter === "aboutPlayers") {
              const matchingPlayerObjs =
                currentUser.usersPlayers.map((up) => {
                  return playerObjArray.find((p) => {
                    return p.player.id === up.playerId;
                  });
                }) || {};
              const currentUsersPlayerNames = matchingPlayerObjs.map((PO) => {
                return `${PO.player.firstName} ${PO.player.lastName}`;
              });
              return currentUsersPlayerNames.includes(m.messagetext);
            }
          })
          .map((m) => (
            <Message MO={m} key={m.id} />
          ))}
      </article>
    </>
  );
};
