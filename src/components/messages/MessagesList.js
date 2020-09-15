import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MessageProvider";
import "./messages.css";

export const MessagesList = () => {
  const { messages, getMessages } = useContext(MessageContext);


  useEffect(() => {
    getMessages();
  }, []);
    

  return (
    <section className="messagesList">
      <h2>Gonna be some messages here</h2>
      <div id="messages">
        {messages.map((m) => {
          return (
            <article className="message">
              <div className="entryText">
                {m.user.name || ""}
                <span>{m.messagetext}</span>
              </div>
              <button>Show User's Lineup</button>
            </article>
          );
        })}
      </div>
    </section>
  );
};
