import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { Message } from "./Message"
import "./messages.css";
import { UserContext } from "../users/UserProvider";

export const MessagesList = () => {
  const { messages, getMessages } = useContext(MessageContext);
  const [filteredMessages, setFilteredMessages] = useState([])

  useEffect(() => {
    getMessages();
  }, []);
    
  useEffect(() => {
    setFilteredMessages(messages.reverse())
  }, [messages])

  const recentMessages = filteredMessages.slice(0, 100) || {}

  return (
    <article className="messagesList">

      {/* <Leaderboard /> */}

      <h2>Spin Zone</h2>

      <section id="messages">
        {         
          recentMessages.map((m) => {
          return <Message key={m.id} MO={m} />
          })
        }
      </section>

    </article>
  );
};
