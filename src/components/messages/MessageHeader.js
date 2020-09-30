import React from "react";
import moment from "moment"
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
  const time = moment(props.time).format("LLL")

  return (
    <Card.Header>
      <Badge>
        {user} {prefix} {yourGuyPrefix} {player} {time}
      </Badge>
    </Card.Header>
  );
};
