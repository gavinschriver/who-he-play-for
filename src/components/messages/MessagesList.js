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

  const handleMessageSelect = (collectionName) => {
   setFilteredMessages(collectionName)
  }

  const currentUsersMessages = messages.filter(MO => MO.userId === parseInt(localStorage.getItem("whpf_user")))

  return (
    <>
      <article>
        <section className="messagesList">
          <h2>Spin Zone</h2>
          {/* <DropdownButton title="Filter Messages">
          <Dropdown.Item onClick={(e) => {
              e.preventDefault()
              handleMessageSelect(messages)
            }}>
              Show all 
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => {
              e.preventDefault()
              handleMessageSelect(currentUsersMessages)
            }}>
              Your messages
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => {
              e.preventDefault()
              handleMessageSelect(currentUsersMessages)
            }}>
              About your players
            </Dropdown.Item>
          </DropdownButton> */}
          <MessageSelector />
          {filteredMessages.map((m) => {
            return <Message key={m.id} MO={m} props={props} />;
          })}
        </section>
      </article>
    </>
  );
};
