import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { Message } from "./Message";
import { MessageSelector } from "../selectors/MessageSelector";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "./messages.css";
export const MessagesList = (props) => {
  const { messages, getMessages, collection } = useContext(MessageContext);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const collectionTypeRef = React.createRef([])


  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    setFilteredMessages(messages.reverse());
  }, [messages]);

  useEffect(() => {
    setFilteredMessages(collection)
  }, [collection])

  return (
    <>
      <article>
        <section className="messagesList">
          <h2>Spin Zone</h2>
          <MessageSelector />
          {filteredMessages.map((m) => {
            return <Message key={m.id} MO={m} props={props} />;
          })}
        </section>
      </article>
    </>
  );
};
