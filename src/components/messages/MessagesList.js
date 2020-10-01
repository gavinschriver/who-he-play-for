import React, { useContext, useEffect, useState, useRef } from "react";
import { MessageContext } from "./MessageProvider";
import { Message } from "./Message";
import { MessageSelector } from "../selectors/MessageSelector";
import { Dropdown, DropdownButton, Collapse, Button } from "react-bootstrap";
import "./messages.css";
export const MessagesList = (props) => {
  const { messages, getMessages } = useContext(MessageContext);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [showMessages, setShowMessages] = useState(true)
  const [messageText, setMessageText] = useState("Hide Messages")

  const toggleMessages = () => {
    if (!showMessages) {
      setShowMessages(true)
      setMessageText("Hide Messages")
    } else if (showMessages) {
      setShowMessages(false)
      setMessageText("Show Messages")
    }
  }

  useEffect(() => {
    setFilteredMessages(messages.reverse());
  }, [messages]);

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <h2>Spin Zone</h2>
      <Button onClick={e => { e.preventDefault(); toggleMessages() }}>{messageText}</Button>
      <Collapse in={showMessages}>
        <div>
          <section className="messagesList">
            {filteredMessages.map((m) => {
              return <Message key={m.id} MO={m} props={props} />;
            })}
          </section>
        </div>
      </Collapse>
    </>
  );
};
