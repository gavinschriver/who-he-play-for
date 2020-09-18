import React, { useState } from "react";

export const Player = ({ PO }) => {
  const [showHideDetails, setShowHideDetails] = useState(false);

  const handleDetailButtonClick = () => {
    if (!showHideDetails) {
      setShowHideDetails(true);
    } else setShowHideDetails(false);
  };

  return (
    <article className="playerCard card">
      <div>Player Name: {PO.player.firstName}</div>
      <div className="playerCard__headshot img">
        <img src={PO.player.officialImageSrc} />
      </div>
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
            <span className="detail">{PO.player.birthDate}</span>
          </div>
          <div className="playerCard__details__primaryPosition">
            <span className="detailName">Primary Position: </span>
                      <span className="detail">{
                          PO.player.primaryPosition === "SG"
                              ? 'Shooting Guard'
                              : PO.player.primaryPosition === "PG"
                                  ? 'Point Guard'
                                  : PO.player.primaryPosition = "SF"
                                      ? 'Strong Forward'
                                      : 'Unkown (Positionless Basketball amirite??)'
            }</span>
          </div>
        </article>
      ) : (
        <div></div>
      )}
    </article>
  );
};
