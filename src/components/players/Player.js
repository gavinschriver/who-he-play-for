import React, { useState, useRef, useContext, useEffect } from "react";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { PlayerContext } from "./PlayerProvider";
import Card from "react-bootstrap/Card";
import PlayerHeader from "./PlayerHeader";
import PlayerIcons from "./PlayerIcons";
import PlayerInfoSelect from "../selectors/PlayerInfoSelect";
import { Col, Row, Container, Modal } from "react-bootstrap";
import PlayerCardAction from "./PlayerCardAction";
import "./Players.css";

export const Player = ({ PO, TO, status }) => {
  const { getPlayerData } = useContext(PlayerContext);
  const { usersPlayers, getUsersPlayers } = useContext(UserPlayerContext);
  const [matchingUsersPlayer, setMatchingUsersPlayer] = useState({});
  const activeUserId = parseInt(localStorage.getItem("whpf_user"));

  // Assign component variable names for Player Objects and Team Objects cause why not
  const currentPlayer = PO;
  const currentPlayerTeam = TO;
  const NBATeamId = currentPlayerTeam.teamId;
  const NBAid = currentPlayer.player.externalMappings[0].id || {};
  const cardClass = matchingUsersPlayer.mentioned
    ? "playerCard playerCard-stanned"
    : "playerCard";

  // const cardBG = matchingUsersPlayer.mentioned ? "primary" : "light";

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

  return (
    <div className={cardClass}>
      <Card>
        <PlayerHeader
          headerInfo={{
            name: `${currentPlayer.player.firstName} ${currentPlayer.player.lastName}`,
            team: TO.teamName,
            class: cardClass,
            type: "stan",
            status
          }}
        />
        {/* {cardClass !== "playerCard playerCard--stanned" && */}
        <div className={cardClass}>
          <Col>
            <PlayerIcons
              details={{
                playerImg: currentPlayer.player.officialImageSrc,
                teamAbb: currentPlayer.player.currentTeam
                  ? currentPlayer.player.currentTeam.abbreviation
                  : "NONE",
                teamId: NBATeamId,
              }}
            />
          </Col>
          <Col>
            <PlayerCardAction
              options={{
                type: "stan",
                location: "lineup",
                player: `${currentPlayer.player.firstName} ${currentPlayer.player.lastName}`,
                status,
              }}
            />
          </Col>
          <PlayerInfoSelect
            playerDetails={{
              name: `${currentPlayer.player.firstName} ${currentPlayer.player.lastName}`,
              DOB: currentPlayer.player.birthDate,
              from: `${currentPlayer.player.birthCity} ${currentPlayer.player.birthCountry}`,
              weight: currentPlayer.player.weight,
              height: currentPlayer.player.height,
              position: currentPlayer.player.primaryPosition,
              id: NBAid,
              twitterName:
                currentPlayer.player.socialMediaAccounts.length > 0
                  ? currentPlayer.player.socialMediaAccounts[0].value
                  : "NONE",
            }}
          />
        </div>
        {/* // } */}
      </Card>
    </div>
  );
};
