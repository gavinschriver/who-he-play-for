import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { PlayerSelectButton } from "../buttons/PlayerSelectButton";
import Highlight from "../highlights/Highlight";
import PlayerSearch from "./PlayerSearch";

export default ({ options }) => {
  return (
    <ButtonGroup vertical>
      {!options.status ? (
        <PlayerSelectButton
          type={options.type}
          location={options.location}
          player={options.player}
        />
      ) : (
        <div></div>
      )}
      {/* <Highlight location="player" playerName={options.player} /> */}
      <PlayerSearch playerDetails={{playerName: options.player}} />
    </ButtonGroup>
  );
};
