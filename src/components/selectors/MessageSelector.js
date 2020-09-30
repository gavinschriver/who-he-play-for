import React, { useContext, useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { MessageContext } from "../messages/MessageProvider";

export const MessageSelector = React.forwardRef((props, ref) => {
  const { messages, getMessages, setCollection } = useContext(MessageContext);

  const handleMessageSelect = (collectionName) => {
    setCollection(collectionName);
  };

  const currentUsersMessages = messages.filter(
    (MO) => MO.userId === parseInt(localStorage.getItem("whpf_user"))
) || {};

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <DropdownButton title="Filter Messages">
      <Dropdown.Item
        onClick={(e) => {
          e.preventDefault();
          handleMessageSelect(messages);
        }}
      >
        Show all
      </Dropdown.Item>
      <Dropdown.Item
        onClick={(e) => {
          e.preventDefault();
          handleMessageSelect(currentUsersMessages);
        }}
      >
        Your messages
      </Dropdown.Item>
    </DropdownButton>
  );
});
