import React, { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";

export const Score = ({ SO, UO }) => {
  const [showHideMatchingPlayers, setShowHideMatchingPlayers] = useState(false);
  const { usersPlayers } = useContext(UserPlayerContext);
  const { playerObjArray, setTrashtalkPlayer } = useContext(PlayerContext);

  const matchingPlayersToggle = () => {
    if (!showHideMatchingPlayers) {
      setShowHideMatchingPlayers(true);
    } else if (showHideMatchingPlayers) {
      setShowHideMatchingPlayers(false);
    }
  };

  const matchingUsersPlayer = usersPlayers.filter((uPO) => {
    return uPO.userId === SO.userId;
  });

  const matchingPlayers = matchingUsersPlayer.map((mUPO) => {
    return playerObjArray.find((p) => {
      return mUPO.playerId === p.player.id;
    });
  });

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
            const redditSearch = `https://www.reddit.com/search?q=${mPO.player.firstName}%20${mPO.player.lastName}`;
            return (
              <div>
                <a href={redditSearch} target="_blank">
                  {mPO.player.firstName} {mPO.player.lastName}
                </a>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setTrashtalkPlayer(mPO.player.firstName);
                  }}
                >
                  TRASH
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
