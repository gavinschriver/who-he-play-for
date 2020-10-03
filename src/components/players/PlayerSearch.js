import React from "react";
import { Button } from "react-bootstrap";

export default ({ playerDetails, location }) => {
  const [playerFirstName, playerLastName] = playerDetails.playerName.split(" ");
  const redditSearchURL = `https://www.reddit.com/search?q=${playerFirstName}%20${playerLastName}`;

  return (
    <>
      {location === "playerCard" && (
        <Button>
          <a href={redditSearchURL} target="_blank">
            GOSSIP ROCKET
          </a>
        </Button>
      )}
      {location === "lineup" && (
          <a href={redditSearchURL} target="_blank">
            GOSSIP ROCKET
          </a>
      )}
    </>
  );
};
