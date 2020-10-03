import React, { useState, useRef, useContext, useEffect } from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { PlayerContext } from "./PlayerProvider";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { PlayerSelectButton } from "../buttons/PlayerSelectButton";
import Stats from "../highlights/Stats";
import Highlight from "../highlights/Highlight";
import PlayerDetails from "./PlayerDetails";
import PlayerHeader from "./PlayerHeader";
import "./Players.css";
import PlayerIcons from "./PlayerIcons";
import PlayerInfoSelect from "../selectors/PlayerInfoSelect";
import { Col, Row, Container } from "react-bootstrap";

export const Player = ({ PO, TO, status }) => {
  const { getPlayerData } = useContext(PlayerContext);
  const { usersPlayers, getUsersPlayers } = useContext(UserPlayerContext);
  const [matchingUsersPlayer, setMatchingUsersPlayer] = useState({});
  const [showHideDetails, setShowHideDetails] = useState(false);
  const activeUserId = parseInt(localStorage.getItem("whpf_user"));

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
      <PlayerHeader
        headerInfo={{
          name: `${currentPlayer.player.firstName} ${currentPlayer.player.lastName}`,
          team: TO.teamName,
        }}
      />
      <Card.Body className="playerCard--body">
        <Row>
          <Container>
            <PlayerIcons
              details={{
                playerImg: currentPlayer.player.officialImageSrc,
                teamAbb: currentPlayer.player.currentTeam.abbreviation,
                teamId: currentPlayerTeam.NBATeamId,
              }}
            />
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
          </Container>
        </Row>
      </Card.Body>
      {/* <Highlight location="player" playerName={`${currentPlayer.player.firstName} ${currentPlayer.player.lastName}`} /> */}
      <PlayerInfoSelect
        playerDetails={{
          name: `${currentPlayer.player.firstName} ${currentPlayer.player.lastName}`,
          DOB: currentPlayer.player.birthDate,
          from: `${currentPlayer.player.birthCity} ${currentPlayer.player.birthCountry}`,
          weight: currentPlayer.player.weight,
          height: currentPlayer.player.height,
          position: currentPlayer.player.primaryPosition,
          id: NBAid,
        }}
      />
      {/* twitter */}
      {/* {currentPlayer.player.socialMediaAccounts.length > 0 ? (
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName={currentPlayer.player.socialMediaAccounts[0].value}
          options={{ height: 400 }}
        />
      ) : (
        <div></div>
      )} */}
    </Card>
  );
};
