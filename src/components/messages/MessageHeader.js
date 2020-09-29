import React from "react";
import { Badge, Card } from "react-bootstrap";

export const MessageHeader = (props) => {
    const user = props.userType === "current" ? "YOU" : props.userName;
    const prefix = props.messageType === "stan" ? "stan'd" : props.messageType === "trash" ? "talked trash on" : "hollered into the void"

  return (
    <Card.Header>
          <Badge>
              {user} {prefix}
          </Badge>
    </Card.Header>
  );
};
