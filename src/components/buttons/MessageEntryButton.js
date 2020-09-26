import React from "react";
import Button from "react-bootstrap/Button";

export const MessageEntryButton = (props) => {
  const type = props.type;
  const typeText = props.type === "stan" ? "BANG!" : "";
  const newMessage = props.message;

  const handleSubmitMessageClick = props.action

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        handleSubmitMessageClick();
      }}
    >
      {typeText}
    </Button>
  );
};
