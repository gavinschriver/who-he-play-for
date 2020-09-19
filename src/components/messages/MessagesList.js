import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { Message } from "./Message"
import { Leaderboard } from "../leaderboard/Leaderboard"

import "./messages.css";

export const MessagesList = () => {
  const { messages, getMessages } = useContext(MessageContext);
  const [filteredMessages, setFilteredMessages] = useState([])

  useEffect(() => {
    getMessages();
  }, []);
    
  useEffect(() => {
    setFilteredMessages(messages.reverse())
  }, [messages])

  return (
    <article className="messagesList">

      {/* <Leaderboard /> */}

      <h2>Spin Zone</h2>

      <section id="messages">
        {         
          filteredMessages.map((m) => {
          return <Message key={m.id} MO={m} />
          })
        }
      </section>

    </article>
  );
};
