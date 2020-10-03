import React from "react";
import { Card } from "react-bootstrap";

export default ({ headerInfo }) => {
  console.log(headerInfo.team)

  return (
    <>
      <Card.Header as="h5">
        {headerInfo.name}
        <Card.Subtitle>{headerInfo.team}</Card.Subtitle>
      </Card.Header>
    </>
  );
};
