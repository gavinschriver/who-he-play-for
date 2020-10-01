import React, { useState, useRef, useContext, useEffect } from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { PlayerContext } from "./PlayerProvider";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import "./Players.css";
import { PlayerSelectButton } from "../buttons/PlayerSelectButton";
import Stats from "../highlights/Stats";

export const Player = ({ PO, TO, status }) => {
  const { getPlayerData } = useContext(PlayerContext);
  const { usersPlayers, getUsersPlayers } = useContext(UserPlayerContext);
  const [matchingUsersPlayer, setMatchingUsersPlayer] = useState({});
  const [showHideDetails, setShowHideDetails] = useState(false);
  const activeUserId = parseInt(localStorage.getItem("whpf_user"));

  const handleDetailButtonClick = () => {
    if (!showHideDetails) {
      setShowHideDetails(true);
    } else setShowHideDetails(false);
  };

  // Assign component variable names for Player Objects and Team Objects cause why not
  const currentPlayer = PO;
  const currentPlayerTeam = TO;

  const NBATeamId = currentPlayerTeam.teamId;
  const NBAid = currentPlayer.player.externalMappings[0].id || {};

  useEffect(() => {
    getPlayerData().then(getUsersPlayers);
  }, []);

  useEffect(() => {
    setMatchingUsersPlayer(
      usersPlayers.find((uPO) => {
        return uPO.playerId === PO.player.id && uPO.userId === activeUserId;
      }) || {}
    );
  }, [usersPlayers]);

  const cardClass = matchingUsersPlayer.mentioned
    ? "playerCard playerCard--stanned"
    : "playerCard";

  const cardBG = matchingUsersPlayer.mentioned ? "primary" : "light";

  return (
    <Card className={cardClass} bg={cardBG}>
      <Card.Header as="h5">Player</Card.Header>
      <Card.Body className="playerCard--body">
        {NBAid ? <Stats id={NBAid} /> : <div></div>}
        {!status ? (
          <div>
            <PlayerSelectButton
              type="stan"
              location="lineup"
              player={`${currentPlayer.player.firstName} ${currentPlayer.player.lastName}`}
            />
          </div>
        ) : (
          <div></div>
        )}
        <Card.Title className="playerCard__name">
          Player: {currentPlayer.player.firstName}{" "}
          {currentPlayer.player.lastName}
        </Card.Title>
        <div className="playerCard__headshot img">
          <a
            href={`https://www.reddit.com/search?q=${currentPlayer.player.firstName}%20${currentPlayer.player.lastName}`}
            target="_blank"
          >
            <Card.Img src={currentPlayer.player.officialImageSrc} />
          </a>
        </div>
        {currentPlayer.player.currentTeam ? (
          <div className="playerCard__logo__img">
            {currentPlayer.player.currentTeam.abbreviation === "BRO" ? (
              <Card.Img
                src={`http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/bkn.png`}
              />
            ) : currentPlayer.player.currentTeam.abbreviation === "OKL" ? (
              <Card.Img
                src={`http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/okc.png`}
              />
            ) : (
              <Card.Img
                src={`http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${currentPlayer.player.currentTeam.abbreviation}.png`.toLowerCase()}
              />
            )}
          </div>
        ) : (
          <div>Poor lil buddy needs a team :(</div>
        )}
        <Button
          className="playerCard__showDetailsButton btn btn--details"
          onClick={(e) => {
            e.preventDefault();
            handleDetailButtonClick();
          }}
        >
          Get the juicy deets:
        </Button>
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
                    screenName={
                      currentPlayer.player.socialMediaAccounts[0].value
                    }
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
      </Card.Body>
    </Card>
  );
};
