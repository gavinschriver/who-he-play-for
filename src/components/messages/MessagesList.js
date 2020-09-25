import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { Message } from "./Message";
import "./messages.css";
import CardGroup from "react-bootstrap/CardGroup";
export const MessagesList = (props) => {
  const { messages, getMessages } = useContext(MessageContext);
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    setFilteredMessages(messages.reverse());
  }, [messages]);

  const recentMessages = filteredMessages.slice(0, 50) || {};

  return (
    <>
      <article>
        <section className="messagesList">
          <h2>Spin Zone</h2>
          {recentMessages.map((m) => {
            return <Message key={m.id} MO={m} props={props} />;
          })}
        </section>
      </article>
    </>
  );
};
