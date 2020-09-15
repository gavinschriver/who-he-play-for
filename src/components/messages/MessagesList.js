import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MessageProvider";
import "./messages.css";

export const MessagesList = () => {
  const { messages, getMessages } = useContext(MessageContext);

  const [currentMessageObj, setCurrentMessageObj] = useState({});

  useEffect(() => {
    getMessages();
  }, []);
    

  return (
    <section className="messagesList">
      <h2>Gonna be some messages here</h2>
      <div id="messages">
        {messages.map((m) => {
          const messageObj = m
          return (
            <article>
              <div className="entryText">
                {m.user.name || ""}
                <span>{m.messagetext}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
