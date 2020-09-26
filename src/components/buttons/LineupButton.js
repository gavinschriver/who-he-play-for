import React, { useState, useContext } from "react";
import Collapse from "react-bootstrap/Collapse";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { PlayerSelectButton } from "./PlayerSelectButton";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { PlayerContext } from "../players/PlayerProvider";

export const LineupButton = (props) => {
  const { usersPlayers } = useContext(UserPlayerContext)
  const { playerObjArray } = useContext(PlayerContext)

  
  const [showHideMatchingPlayers, setShowHideMatchingPlayers] = useState(false);
  const locationClass = props.location;
  const userId = props.userId
  const selectButtonType = props.userType === "current" ? "stan" : "trash"
  const actionHeader = props.userType === "current" ? "STAN" : "TRASH 'EM?"

  const matchingUsersPlayers = usersPlayers.filter((uPO) => {
    return uPO.userId === userId;
  });

  const matchingPlayers = matchingUsersPlayers.map((mUPO) => {
    return playerObjArray.find((p) => {
      return mUPO.playerId === p.player.id;
    });
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
          <Table>
            <thead>
              <tr>
                <th>Player</th>
                <th>{actionHeader}</th>
              </tr>
            </thead>
            <tbody>
              {
                matchingPlayers.map(mPO => {
                  const redditSearch = `https://www.reddit.com/search?q=${mPO.player.firstName}%20${mPO.player.lastName}`;
                  return (
                    <tr>
                      <td>
                        <a href={redditSearch} target="_blank" className={locationClass}>{mPO.player.firstName} {mPO.player.lastName}</a>
                      </td>
                      <td>
                        <PlayerSelectButton type={selectButtonType} location={locationClass} player={mPO.player.firstName}/>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </Collapse>
      </div>
    </>
  );
};
