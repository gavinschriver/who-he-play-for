import React, { useState, useEffect, createContext } from "react";

export const MessageContext = React.createContext();

export const MessageProvider = (props) => {
  const [messages, setMessages] = useState([]);

  const getMessages = () => {
    return fetch(`http://localhost:8888/messages`)
      .then((res) => res.json())
      .then(setMessages);
  };

  const addMessage = (newMessage) => {
    return fetch("http://localhost:8888/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    }).then(getMessages);
  };

  const removeMessage = (messageId) => {
    return fetch(`http://localhost:8888/messages/${messageId}`, {
      method: "DELETE",
    }).then(getMessages);
  };
    
    return (
        <MessageContext.Provider value={{ messages, getMessages, addMessage, removeMessage }}>
            {props.children}
        </MessageContext.Provider>
)
};
