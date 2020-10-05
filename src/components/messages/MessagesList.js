import React, { useContext, useEffect, useState, useRef } from "react";
import { MessageContext } from "./MessageProvider";
import { Message } from "./Message";
import { Dropdown, DropdownButton } from "react-bootstrap";
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
  const collectionTitle =
    filter === null || filter === "recent" ? (
      "Recent"
    ) : filter === "all" ? (
      "All"
    ) : filter === "current" ? (
      "Your messages"
    ) : filter === "stan" ? (
      "Stans"
    ) : filter === "trash" ? (
      "Trashtalk"
    ) : filter === "aboutPlayers" ? (
      "About your lineup"
    ) : filter === "hide" ? (
      <div></div>
    ) : (
      ""
    );
  //all stan trash aboutPlayers current
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
      <h2 className="sectionTitle">Spin Zone</h2>
      <div className="filterControls">
        <DropdownButton
          variant="secondary"
          title="Filter messages"
          onSelect={handleFilterSelect}
        >
          <Dropdown.Item eventKey="all">All messages</Dropdown.Item>
          <Dropdown.Item eventKey="recent">Recent Activity</Dropdown.Item>
          <Dropdown.Item eventKey="current">Your messages</Dropdown.Item>
          <Dropdown.Item eventKey="stan">Stans</Dropdown.Item>
          <Dropdown.Item eventKey="trash">Trashtalk</Dropdown.Item>
          <Dropdown.Item eventKey="aboutPlayers">
            About your players
          </Dropdown.Item>
          <Dropdown.Item eventKey="hide">Hide All Messages</Dropdown.Item>
        </DropdownButton>
        {filter !== "hide" && (
          <h6 className="filterText">
            Currently displaying: {collectionTitle}
          </h6>
        )}
      </div>
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
              const sliced = sorted.slice(0, 10);
              return sliced.includes(m);
            }
            if (filter === "all") {
              return m;
            }
            if (filter === "stan") {
              return m.stan;
            }
            if (filter === "trash") {
              return m.trashtalk;
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
            if (filter === "hide") {
              return null;
            }
          })
          .map((m) => (
            <Message MO={m} key={m.id} />
          ))}
      </article>
    </>
  );
};
