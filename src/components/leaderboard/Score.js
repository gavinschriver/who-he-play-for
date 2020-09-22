import React, { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";

export const Score = ({ SO, UO }) => {
  const [showHideMatchingPlayers, setShowHideMatchingPlayers] = useState(false);
  const { usersPlayers } = useContext(UserPlayerContext);
  const { playerObjArray, setTrashtalkPlayer, setStanPlayer } = useContext(
    PlayerContext
  );
  const currentUserId = parseInt(localStorage.getItem("whpf_user"));

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

  const filteredUsersPlayers = matchingUsersPlayer.filter((mUPO) => {
    return !mUPO.mentioned;
  });

  const filteredPlayerIds = filteredUsersPlayers.map((fUP) => {
    return fUP.playerId;
  });

  const matchingPlayers = matchingUsersPlayer.map((mUPO) => {
    return playerObjArray.find((p) => {
      return mUPO.playerId === p.player.id;
    });
  });

  return (
    <tbody>
      <td>{SO.username}</td>
      <td>{SO.score}</td>
      <td>
        <button
          onClick={(e) => {
            e.preventDefault();
            matchingPlayersToggle();
          }}
        >
          Show Playerz
        </button>
      </td>
      {showHideMatchingPlayers ? (
        <div className="lineup scoreBoard__lineup">
          <table>
            <tbody>
              {matchingPlayers.map((mPO) => {
                const redditSearch = `https://www.reddit.com/search?q=${mPO.player.firstName}%20${mPO.player.lastName}`;
                return (
                  <tr>
                    <td>
                      <a href={redditSearch} target="_blank">
                        {mPO.player.firstName} {mPO.player.lastName}
                      </a>
                    </td>
                    <td>
                      {SO.userId === currentUserId ? (
                        filteredPlayerIds.includes(mPO.player.id) ? (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setStanPlayer(`${mPO.player.firstName}`);
                            }}
                          >
                            STAN
                          </button>
                        ) : (
                          <div></div>
                        )
                      ) : (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setTrashtalkPlayer(
                              `${mPO.player.firstName} ${mPO.player.lastName}`
                            );
                          }}
                        >
                          TRASH
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div></div>
      )}
    </tbody>
  );
};
