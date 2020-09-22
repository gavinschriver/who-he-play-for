import React, { useState, useEffect, createContext } from "react";

export const MessageContext = React.createContext();

export const MessageProvider = (props) => {
  const [messages, setMessages] = useState([]);

  const getMessages = () => {
    return fetch(`http://localhost:8888/messages?_expand=user`)
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

  const updateMessage = message => {
    return fetch(`http://localhost:8888/messages/${message.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messages)
    })
        .then(getMessages)
}
    
    return (
        <MessageContext.Provider value={{ messages, getMessages, addMessage, removeMessage, updateMessage }}>
            {props.children}
        </MessageContext.Provider>
)
};
