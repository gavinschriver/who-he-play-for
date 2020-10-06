import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { PlayerSelectButton } from "../buttons/PlayerSelectButton";
import Highlight from "../highlights/Highlight";
import PlayerSearch from "./PlayerSearch";
import MessageEntryModal from "../messages/MessageEntryModal";

export default ({ options }) => {
  return (
    <div>
      <ButtonGroup>
        {!options.status ? (
          <>
            {/* <PlayerSelectButton
              type={options.type}
              location={options.location}
              player={options.player}
            /> */}
            <MessageEntryModal
              location="playercard"
              player={options.player}
              type={options.type}
            />
          </>
        ) : (
          <div></div>
        )}
        <Highlight location="player" playerName={options.player} />
        {/* <PlayerSearch
          location="playerCard"
          playerDetails={{ playerName: options.player, type: options.type }}
        /> */}
      </ButtonGroup>
    </div>
  );
};
