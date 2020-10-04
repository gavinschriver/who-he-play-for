import React from "react";
import { Button } from "react-bootstrap";
import "../buttons/buttons.css"

export default ({ playerDetails, location, parent }) => {
  const [playerFirstName, playerLastName] = playerDetails.playerName.split(" ");
  const type = playerDetails.type;
  const redditSearchURL = `https://www.reddit.com/search?q=${playerFirstName}%20${playerLastName}`;

  return (
    <>
      {location === "playerCard" && (
        <Button className={`playerSearch-button ${type}-button  ${location}-button`}>
          <a href={redditSearchURL} target="_blank">
            GOSSIP ROCKET
          </a>
        </Button>
      )}
      {location === "lineup" && (
        <Button className={`playerSearch-button ${type}-button ${location}-button ${parent}-button`} variant="link">
          <a href={redditSearchURL} target="_blank">
            Search
          </a>
        </Button>
      )}
    </>
  );
};
