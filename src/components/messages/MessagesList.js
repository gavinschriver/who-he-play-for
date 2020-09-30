import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { Message } from "./Message";
import { MessageSelector } from "../selectors/MessageSelector";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "./messages.css";
export const MessagesList = (props) => {
  const { getMessages, collection} = useContext(
    MessageContext
  );
  const [filteredMessages, setFilteredMessages] = useState([]);
  const showHide = React.createRef();

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    setFilteredMessages(collection);
  }, [collection]);

  return (
    <>
      <article>
        <section className="messagesList">
          <h2>Spin Zone</h2>
          <MessageSelector ref={showHide} />
            {filteredMessages.map((m) => {
              return <Message key={m.id} MO={m} props={props} />;
            })}
        </section>
      </article>
    </>
  );
};
