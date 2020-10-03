import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { PlayerSelectButton } from "../buttons/PlayerSelectButton";
import Highlight from "../highlights/Highlight";

export default ({ options }) => {
  return (
    <ButtonGroup>
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
    </ButtonGroup>
  );
};
