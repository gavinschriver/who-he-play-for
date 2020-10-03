import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { PlayerSelectButton } from "../buttons/PlayerSelectButton";

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
      <Button>ALSO COOL BUTTON</Button>
    </ButtonGroup>
  );
};
