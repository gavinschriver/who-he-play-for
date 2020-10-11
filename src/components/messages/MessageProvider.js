import React, { useState, useEffect, createContext } from "react";

export const MessageContext = React.createContext();

export const MessageProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [collection, setCollection] = useState([])
 
  const getMessages = () => {
    return fetch(`https://whpf-database.herokuapp.com/messages?_expand=user`)
      .then((res) => res.json())
      .then(setMessages);
  };

  const addMessage = (newMessage) => {
    return fetch("https://whpf-database.herokuapp.com/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    }).then(getMessages);
  };

  const removeMessage = (messageId) => {
    return fetch(`https://whpf-database.herokuapp.com/messages/${messageId}`, {
      method: "DELETE",
    }).then(getMessages);
  };

  const updateMessage = (message) => {
    return fetch(`https://whpf-database.herokuapp.com/messages/${message.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }).then(getMessages);
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        getMessages,
        addMessage,
        removeMessage,
        updateMessage,
        collection, setCollection
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};
