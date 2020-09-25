import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

export const LineupButton = (props) => {
  const [showHideMatchingPlayers, setShowHideMatchingPlayers] = useState(false);
  const locationClass = props.location;

  const matchingPlayersToggle = () => {
    setShowHideMatchingPlayers(!showHideMatchingPlayers);
  };

  const clickFunction = (e) => {
    e.preventDefault();
    matchingPlayersToggle();
  };

  return (
    <>
      <Button className={locationClass} onClick={clickFunction}>
        Show Lineup
      </Button>
      <div>
        <Collapse in={showHideMatchingPlayers}>
          <Table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Name</th>
              </tr>
            </thead>
          </Table>
        </Collapse>
      </div>
    </>
  );
};
