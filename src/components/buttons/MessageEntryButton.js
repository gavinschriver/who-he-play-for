import React from "react";
import Button from "react-bootstrap/Button";

export const MessageEntryButton = (props) => {
  const type = props.type;
  const typeText = props.type === "stan" ? "BANG!" : "Shots Fired";
  const newMessage = props.message;

  const handleSubmitMessageClick = props.action

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        alert(newMessage.player)
        handleSubmitMessageClick();
      }}
    >
      {typeText}
    </Button>
  );
};
