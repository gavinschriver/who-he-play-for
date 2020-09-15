import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MessageProvider";

export const MessagesList = () => {
  const { messages, getMessages } = useContext(MessageContext);

  const [messagesArray, setMessagesArray] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    console.log(messages);
    setMessagesArray(messagesArray);
  }, [messages]);   

  return (
    <section className="messagesList">
      <h2>Gonna be some messages here</h2>
          {
              messages.map((m) => {
                  return <div>{m.messagetext}</div>;
              })
          }
    </section>
  );
};
