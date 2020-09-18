import React, { useState } from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

export const Player = ({ PO }) => {
  const [showHideDetails, setShowHideDetails] = useState(false);

  const handleDetailButtonClick = () => {
    if (!showHideDetails) {
      setShowHideDetails(true);
    } else setShowHideDetails(false);
  };

    const currentPlayer = PO;
    
    console.log(currentPlayer.player.currentTeam)

  return (
    <article className="playerCard card">
      <div>
        Player Name: {currentPlayer.player.firstName}{" "}
        {currentPlayer.player.lastName}
      </div>
      <div className="playerCard__headshot img">
        <img src={currentPlayer.player.officialImageSrc} />
      </div>
      <div>Team:</div>
      <div className="playerCard__teamLogo img">LOL</div>
      <button
        className="playerCard__showDetailsButton btn btn--details"
        onClick={(e) => {
          e.preventDefault();
          handleDetailButtonClick();
        }}
      >
        Get the juicy deets:
      </button>
      {showHideDetails ? (
        <article className="playerCard__details">
          <div className="playerCard__details__heading heading">DEETS</div>
          <div className="playerCard__details__DOB">
            <span className="detailName">Date of Birth: </span>
            <span className="detail">{currentPlayer.player.birthDate}</span>
          </div>

          <div className="playerCard__details__city">
            <span className="detailName">Hailing From: </span>
            <span className="detail">
              {currentPlayer.player.birthCity},{" "}
              {currentPlayer.player.birthCountry}
            </span>
          </div>

          <div className="playerCard__details__weight">
            <span className="detailName">Weight (rude): </span>
            <span className="detail">{currentPlayer.player.weight}</span>
          </div>

          <div className="playerCard__details__primaryPosition">
            <span className="detailName">Primary Position: </span>
            <span className="detail">
              {currentPlayer.player.primaryPosition === "SG"
                ? "Shooting Guard"
                : currentPlayer.player.primaryPosition === "PG"
                ? "Point Guard"
                : currentPlayer.player.primaryPosition === "SF"
                ? "Strong Forward"
                : currentPlayer.player.primaryPosition === "C"
                ? "Center"
                : currentPlayer.player.primaryPosition === "PF"
                ? "Power Forward"
                : "Unkown (Positionless BBall amirite?)"}
            </span>
            <div className="playerCard__details__height">
              <span className="detailName">Height: </span>
              <span className="detail">{currentPlayer.player.height}</span>
              {currentPlayer.player.socialMediaAccounts.length > 0 ? (
                <TwitterTimelineEmbed
                  sourceType="profile"
                  screenName={currentPlayer.player.socialMediaAccounts[0].value}
                  options={{ height: 400 }}
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </article>
      ) : (
        <div></div>
      )}
    </article>
  );
};
