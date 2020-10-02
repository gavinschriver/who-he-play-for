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
  const [filter, setFilter] = useState(null);
  const currentUserId = parseInt(localStorage.getItem("whpf_user"))


  const handleFilterSelect = (e) => {
    setFilter(e);
  };

  // init hook
  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <DropdownButton title="Filter messages" onSelect={handleFilterSelect}>
        <Dropdown.Item eventKey="all">All messages</Dropdown.Item>
        <Dropdown.Item eventKey="current">Your messages</Dropdown.Item>
        <Dropdown.Item eventKey="stan">Stans</Dropdown.Item>
        <Dropdown.Item eventKey="currentUsersPlayers">
          About your players
        </Dropdown.Item>
      </DropdownButton>
      <article>
        {messages
          .filter((m) => {
            if (filter === null) {
              return m;
            }
            if (filter === "stan") {
              return m.stan;
            }
            if (filter === "current") {
              return m.userId === currentUserId
            }
          })
          .map((m) => (
            <Message MO={m} key={m.id} />
          )).reverse()}
      </article>
    </>
  );
};

// return (
//   <>
//     <h2>Spin Zone</h2>
//     <DropdownButton title="Filter messages">
//       <Dropdown.Item eventKey="all">All messages</Dropdown.Item>
//       <Dropdown.Item eventKey="current">Your messages</Dropdown.Item>
//       <Dropdown.Item eventKey="currentUsersPlayers">
//         About your players
//       </Dropdown.Item>
//     </DropdownButton>MMM
//     <article>
//       <section className="messagesList">

//       </section>
//     </article>
//   </>
// );

// const { currentUserId, getUserById } = useContext(UserContext);
// const { playerObjArray, getPlayerData } = useContext(PlayerContext);
// const activeUserId = parseInt(localStorage.getItem("whpf_user"));
// const [currentUser, setCurrentUser] = useState({
//   usersPlayers: [],
//   messages: [],
// });
