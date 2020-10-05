import React, { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { Player } from "../players/Player";
import teamData from "../teams.json";
import CardGroup from "react-bootstrap/CardGroup";
import "./Lineup.css";
import { Button, DropdownButton, Collapse } from "react-bootstrap";

export const GenerateLineup = () => {
  //for looking up info about teams from NBA reference
  const teams = teamData.teams;

  const { getPlayerData, playerObjArray } = useContext(PlayerContext);
  const {
    usersPlayers,
    getUsersPlayers,
    addUserPlayer,
    removeUserPlayer,
  } = useContext(UserPlayerContext);
  const { mentionedCount } = useContext(UserPlayerContext);

  const [matchingUsersPlayers, setMatchingUsersPlayers] = useState([]);
  const [generateButtonShowing, setGenerateButtonShowing] = useState(false);
  const [showHideLineup, setShowHideLineup] = useState(true);
  const [lineupText, setLineupText] = useState("Hide Lineup")

  let orderNumber = 0;

  // find valid players
  const filteredPlayers = playerObjArray.filter(
    (p) =>
      p.player.currentRosterStatus === "ROSTER" && p.player.officialImageSrc
  );

  const filteredPlayerIds = filteredPlayers.map((p) => p.player.id);

  // posts 5 new userplayer objects
  const createUsersPlayers = () => {
    for (let i = 0; i < 5; i++) {
      const activeUserId = parseInt(localStorage.getItem("whpf_user"));
      const randomPlayerId =
        filteredPlayerIds[Math.floor(Math.random() * filteredPlayerIds.length)];

      const newUserPlayer = {
        userId: activeUserId,
        playerId: randomPlayerId,
      };
      addUserPlayer(newUserPlayer);
    }
  };

  // Invoke a delete function for each UPO in the component-state collection "matchingUsersPlayers"
  const deleteUsersPlayers = () => {
    matchingUsersPlayers.forEach((mUPO) => {
      removeUserPlayer(mUPO.id);
    });
  };

  const handleGenerateLineup = () => {
    {
      deleteUsersPlayers();
      createUsersPlayers();
      setGenerateButtonShowing(false);
    }
  };

  const toggleLineup = () => {
    if (!showHideLineup) {
      setShowHideLineup(true);
      setLineupText("Hide Lineup")
    } else if (showHideLineup) {
      setShowHideLineup(false)
      setLineupText("Show Lineup")
    }
  };

  // effects
  useEffect(() => {
    getPlayerData().then(getUsersPlayers);
  }, []);

  // listens for a change to usersPlayers API collection and resets component-level collection of only those matching the current user's id
  useEffect(() => {
    const arrayOfMatchingUPOS = usersPlayers.filter((upo) => {
      return upo.userId === parseInt(localStorage.getItem("whpf_user"));
    });
    setMatchingUsersPlayers(arrayOfMatchingUPOS);
  }, [usersPlayers]);

  useEffect(() => {
    if (mentionedCount === matchingUsersPlayers.length) {
      setGenerateButtonShowing(true);
    }
  }, [mentionedCount]);

  const orderedMatchingUPs = matchingUsersPlayers.map(mUP => {
    orderNumber++;
    const orderedUPObject = {
      id: mUP.id,
      playerId: mUP.playerId,
      userId: mUP.userId,
      orderNum: orderNumber
    }
    return orderedUPObject
  })

  console.log(orderedMatchingUPs)

  return (
    <>
      <h2 className="sectionTitle">Your Starting 5:</h2>

      <Button
        title="Show Lineup"
        onClick={(e) => {
          e.preventDefault();
          toggleLineup();
        }}
      >
        {lineupText}
      </Button>
      <Collapse in={showHideLineup}>
        <div>
          {(mentionedCount === 0 && !matchingUsersPlayers) ||
          mentionedCount === matchingUsersPlayers.length ? (
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleGenerateLineup();
              }}
            >
              Generate A Lineup
            </Button>
          ) : (
            <div></div>
          )}
          <CardGroup className="lineup__container">
            <section className="lineup">
              {matchingUsersPlayers.map((mUPO) => {
                const matchingPlayerObj = filteredPlayers.find(
                  (p) => p.player.id === mUPO.playerId
                );

                let matchingPlayerTeam;

                if (matchingPlayerObj.player.currentTeam) {

                  if (matchingPlayerObj.player.currentTeam.abbreviation === "BRO") {
                    matchingPlayerTeam = teams.find(t => {
                      return t.abbreviation === "BKN"
                    })

                  }

                  else if (matchingPlayerObj.player.currentTeam.abbreviation === "OKL") {
                    matchingPlayerTeam = teams.find(t => {
                      return t.abbreviation === "OKC"
                    })
                  }  
            

                  else
                  matchingPlayerTeam =
                    teams.find((t) => {
                      return (
                        t.abbreviation ===
                        matchingPlayerObj.player.currentTeam.abbreviation
                      );
                    }) || {};
                } else matchingPlayerTeam = {};

                return (
                  <Player
                    key={matchingPlayerObj.player.id}
                    PO={matchingPlayerObj}
                    TO={matchingPlayerTeam}
                    status={mUPO.mentioned ? true : false}
                  />
                );
              })}
            </section>
          </CardGroup>
        </div>
      </Collapse>
    </>
  );
};
