import React, { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";

export const Score = ({ SO, UO }) => {
  const [showHideMatchingPlayers, setShowHideMatchingPlayers] = useState(false);
  const { usersPlayers } = useContext(UserPlayerContext);
  const { playerObjArray } = useContext(PlayerContext);

  const matchingPlayersToggle = () => {
    if (!showHideMatchingPlayers) {
      setShowHideMatchingPlayers(true);
    } else if (showHideMatchingPlayers) {
      setShowHideMatchingPlayers(false);
    }
  };

    const matchingUsersPlayer = usersPlayers.filter((uPO => {
      return uPO.userId === SO.userId
    }))  
    
    const matchingPlayers = matchingUsersPlayer.map((mUPO => {
        return playerObjArray.find(p => {
            return mUPO.playerId === p.player.id
        })
    }))

    const matchingPlayerFirstNames = matchingPlayers.map(mPO => {
        return mPO.player.firstName
    })


    
  return (
    <div>
      <span>{SO.username}</span>
      <span>{SO.score}</span>
      <button
        onClick={(e) => {
          e.preventDefault();
          matchingPlayersToggle();
        }}
      >
        Show Playerz
      </button>
      {showHideMatchingPlayers ? (
        <div>
          AH SHIT ITS AN ARRAY
          {matchingPlayers.map((mPO) => {

            return <div>{mPO.player.firstName}</div>;
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
