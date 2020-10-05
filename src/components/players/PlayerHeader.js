import React from "react";
import { Card, Button } from "react-bootstrap";
import PlayerCardAction from "./PlayerCardAction"
import "./Players.css";

export default ({ headerInfo }) => {
  return (
    <>
      <div className={`${headerInfo.class}-header playerCard-header`}>
        {/* <Card.Header> */}
          <div className="playerBasics">
            <h5>{headerInfo.name}</h5>
            <Card.Subtitle>{headerInfo.team}</Card.Subtitle>
          </div>
        <PlayerCardAction options={{type: "stan", location: "lineup", player: headerInfo.name, status: headerInfo.status }}/>
        {/* </Card.Header> */}
      </div>
    </>
  );
};
