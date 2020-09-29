import React from "react";
import { Badge, Card } from "react-bootstrap";

export const MessageHeader = (props) => {
  const user = props.userType === "current" ? "YOU" : props.userName;

  return (
    <Card.Header>
          <Badge>{user}</Badge>
    </Card.Header>
  );
};
