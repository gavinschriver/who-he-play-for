import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Stats from "../highlights/Stats";
import PlayerSearch from "./PlayerSearch";

export default (props) => {
  return (
    <OverlayTrigger
      key={props.playerId}
      placement={`left`}
      overlay={
          <Tooltip id={`tooltip-${props.playerName}`}>
              <Stats id={props.playerId} type="player" tooltip={true}/>
              {/* <PlayerSearch location="lineup" playerDetails={{playerName: props.playerName}}/> */}
        </Tooltip>
      }
    >
      <div>{props.playerName}</div>
    </OverlayTrigger>
  );
};
