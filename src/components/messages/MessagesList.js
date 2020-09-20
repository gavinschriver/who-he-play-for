import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { Message } from "./Message"
import "./messages.css";
import { UserContext } from "../users/UserProvider";

export const MessagesList = () => {
  const { messages, getMessages } = useContext(MessageContext);
  const { currentUserScore } = useContext(UserContext)
  const [filteredMessages, setFilteredMessages] = useState([])
  const [userScore, setUserScore] = useState({})

  useEffect(() => {
    getMessages();
  }, []);
    
  useEffect(() => {
    setFilteredMessages(messages.reverse())
  }, [messages])

  useEffect(() => {
    console.log(userScore)
    setUserScore(userScore)
  }, [currentUserScore])

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
