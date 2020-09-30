import React, { useState, useContext } from "react";
import Collapse from "react-bootstrap/Collapse";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { PlayerSelectButton } from "./PlayerSelectButton";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { PlayerContext } from "../players/PlayerProvider";
import Stats from "../highlights/Stats";
import StatsButton from "./StatsButton";

export const LineupButton = (props) => {
  const { usersPlayers } = useContext(UserPlayerContext);
  const { playerObjArray } = useContext(PlayerContext);

  const [showHideMatchingPlayers, setShowHideMatchingPlayers] = useState(false);
  const locationClass = props.location;
  const userId = props.userId;
  const selectButtonType = props.userType === "current" ? "stan" : "trash";
  const actionHeader = props.userType === "current" ? "STAN" : "TRASH 'EM?";

  const matchingUsersPlayers = usersPlayers.filter((uPO) => {
    return uPO.userId === userId;
  });

  const matchingPlayers = matchingUsersPlayers.map((mUPO) => {
    return playerObjArray.find((p) => {
      return mUPO.playerId === p.player.id;
    });
  });

  const mentionedUsersPlayers = usersPlayers.filter((up) => {
    return up.mentioned === true;
  });

  // BUG: if same playerId appears in 2 different userPlayers, as in, for the same lineup, 
  // the conditional that decides whether the button should show up to stan that  player will be "false" for both even
  // if only 1 is marked because that player Id # is going to be in this array
  const mentionedPlayerIds = mentionedUsersPlayers.map((mUP) => {
    return mUP.playerId;
  });

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
          <div>
            <Table>
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Stats</th>
                  <th>{actionHeader}</th>
                </tr>
              </thead>
              <tbody>
                {matchingPlayers.map((mPO) => {
                  const NBAid = mPO.player.externalMappings[0].id || {};
                  const redditSearch = `https://www.reddit.com/search?q=${mPO.player.firstName}%20${mPO.player.lastName}`;
                  return (
                    <tr>
                      <td>
                        <a
                          href={redditSearch}
                          target="_blank"
                          className={locationClass}
                        >
                          {mPO.player.firstName} {mPO.player.lastName}
                        </a>
                      </td>
                      <td>
                        <StatsButton id={NBAid}/>
                      </td>
                      <td>
                        {props.userType === "current" &&
                        !mentionedPlayerIds.includes(mPO.player.id) ? (
                          <PlayerSelectButton
                            type={selectButtonType}
                            location={locationClass}
                            player={`${mPO.player.firstName} ${mPO.player.lastName}`}
                          />
                        ) : props.userType === "current" &&
                          mentionedPlayerIds.includes(mPO.player.id) ? (
                          <div></div>
                        ) : (
                          <PlayerSelectButton
                            type={selectButtonType}
                            location={locationClass}
                            player={`${mPO.player.firstName} ${mPO.player.lastName}`}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Collapse>
      </div>
    </>
  );
};
