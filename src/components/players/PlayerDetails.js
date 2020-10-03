import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { TwitterTimelineEmbed } from "react-twitter-embed";

export default ({ playerDetails }) => {
  const playerName = playerDetails.name;
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetailsShowing = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
        <article className="playerCard__details">
          <div className="playerCard__details__heading heading">DEETS</div>
          <div className="playerCard__details__DOB">
            <span className="detailName">Date of Birth: </span>
            <span className="detail">{playerDetails.DOB}</span>
          </div>

          <div className="playerCard__details__city">
            <span className="detailName">Hailing From: </span>
            <span className="detail">{playerDetails.from}</span>
                  </div>
                  
          <div className="playerCard__details__height">
            <span className="detailName">Height: </span>
            <span className="detail">{playerDetails.height}</span>
          </div>

          <div className="playerCard__details__weight">
            <span className="detailName">Weight (rude): </span>
            <span className="detail">{playerDetails.weight}</span>
          </div>

          <div className="playerCard__details__primaryPosition">
            <span className="detailName">Primary Position: </span>
            <span className="detail">
              {playerDetails.position === "SG"
                ? "Shooting Guard"
                : playerDetails.position === "PG"
                ? "Point Guard"
                : playerDetails.position === "SF"
                ? "Strong Forward"
                : playerDetails.position === "C"
                ? "Center"
                : playerDetails.position === "PF"
                ? "Power Forward"
                : "Unkown (Positionless BBall amirite?)"}
            </span>
          </div>
        </article>
    </>
  );
};

