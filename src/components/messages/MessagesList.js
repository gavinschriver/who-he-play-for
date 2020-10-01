import React, { useContext, useEffect, useState, useRef } from "react";
import { MessageContext } from "./MessageProvider";
import { Message } from "./Message";
import { MessageSelector } from "../selectors/MessageSelector";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "./messages.css";
export const MessagesList = (props) => {
  const { messages, getMessages, collection } = useContext(MessageContext);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const showHide = React.createRef();
  const dropdownRef = useRef("")

  useEffect(() => {
    setFilteredMessages(messages.reverse());
  }, [messages]);

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <article>
        <section className="messagesList">
          <h2>Spin Zone</h2>
          <DropdownButton as={"select"} ref={dropdownRef}>
            <Dropdown.Item value="4">
              Would this work?
            </Dropdown.Item>
          </DropdownButton>
          {filteredMessages.map((m) => {
            return <Message key={m.id} MO={m} props={props} />;
          })}
        </section>
      </article>
    </>
  );
};
