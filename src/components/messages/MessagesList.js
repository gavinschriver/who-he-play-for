import React, { useContext, useEffect, useState, useRef } from "react";
import { MessageContext } from "./MessageProvider";
import { Message } from "./Message";
import { MessageSelector } from "../selectors/MessageSelector";
import { Dropdown, DropdownButton, Collapse, Button } from "react-bootstrap";
import "./messages.css";
import { UserContext } from "../users/UserProvider";
import { PlayerContext } from "../players/PlayerProvider";
export const MessagesList = (props) => {
  const { messages, getMessages } = useContext(MessageContext);
  const { currentUserId, getUserById } = useContext(UserContext);
  const { playerObjArray, getPlayerData } = useContext(PlayerContext);

  // array that actually sets whtat's displayed in the map
  const [filteredMessages, setFilteredMessages] = useState([]);

  // collections to isolate messages pertaining only to a current user's lineup
  const [currentUsersMessages, setCurrentUsersMessages] = useState([]);
  const [currentUsersPlayers, setCurrentUsersPlayers] = useState([]);
  const [aboutCurrentUsersLineup, setAboutCurrentUsersLineup] = useState([]);

  const [currentUser, setCurrentUser] = useState({
    usersPlayers: [],
    messages: [],
  });
  const [pageLoaded, setPageLoaded] = useState(false);

  const handleSelection = (e) => {
    if (e === "current") {
      setFilteredMessages(currentUsersMessages);
    }
    if (e === "currentUsersPlayers") {
      setFilteredMessages(aboutCurrentUsersLineup);
    }
    if (e === "all") {
      setFilteredMessages(messages.reverse());
    }
  };


  // defining collection for current user's lineup
  const currentUsersPlayerNames = currentUsersPlayers.map((PO) => {
    return `${PO.player.firstName} ${PO.player.lastName}`;
  });
  
  useEffect(() => {
    const messagesAboutCurrentUsersLineup =
      messages
        .filter((m) => {
          return currentUsersPlayerNames.includes(m.messagetext);
        })
        .reverse() || {};
    setAboutCurrentUsersLineup(messagesAboutCurrentUsersLineup);
  }, [messages]);

  useEffect(() => {
      setFilteredMessages(messages.reverse());

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

  useEffect(() => {
    setCurrentUsersMessages(
      messages.filter(
        (m) => m.userId === parseInt(localStorage.getItem("whpf_user"))
      ) || {}
    );
  }, [messages]);


  // init hook
  useEffect(() => {
    getUserById(currentUserId)
      .then(setCurrentUser)
      .then(getMessages)
      .then(getPlayerData);
  }, []);

  return (
    <>
      <h2>Spin Zone</h2>
      <DropdownButton onSelect={handleSelection} title="Filter messages">
        <Dropdown.Item eventKey="all">All messages</Dropdown.Item>
        <Dropdown.Item eventKey="current">Your messages</Dropdown.Item>
        <Dropdown.Item eventKey="currentUsersPlayers">
          About your players
        </Dropdown.Item>
      </DropdownButton>
      <article>
        <section className="messagesList">
          {filteredMessages.map((m) => {
            return <Message key={m.id} MO={m} props={props} />;
          })}
        </section>
      </article>
    </>
  );
};
