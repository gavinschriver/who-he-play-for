import React from "react";
import { Card } from "react-bootstrap";
import "./Players.css"

export default ({ headerInfo }) => {
  return (
    <>
      <div className={`${headerInfo.class}-header`}>
        <Card.Header as="h5">
          {headerInfo.name}
          <Card.Subtitle>{headerInfo.team}</Card.Subtitle>
        </Card.Header>
      </div>
    </>
  );
};
