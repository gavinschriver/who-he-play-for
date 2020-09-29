import React from "react";
import { Badge, Card } from "react-bootstrap";

export const MessageHeader = (props) => {
  const user = props.userType === "current" ? "YOU" : props.userName;
  const prefix =
    props.messageType === "stan"
      ? "stan'd"
      : props.messageType === "trash"
      ? "talked trash on"
      : "hollered into the void";
  const yourGuyPrefix =
    props.messageType === "trash" &&
    props.isYourGuy === true
      ? "your guy"
      : "";
  const player = props.playerName

  return (
    <Card.Header>
      <Badge>
        {user} {prefix} {yourGuyPrefix} {player}
      </Badge>
    </Card.Header>
  );
};
