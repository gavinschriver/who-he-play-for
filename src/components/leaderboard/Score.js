import React, { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import Collapse from "react-bootstrap/esm/Collapse";
import $ from "jquery";
import { PlayerSelectButton } from "../buttons/PlayerSelectButton";
import { LineupButton} from "../buttons/LineupButton"

export const Score = ({ SO }) => {
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


// score animation attempts
  
  const [scoreValue, setScoreValue] = useState(0)

  useEffect(() => {
    const initialScoreValue = SO.score;
    setScoreValue(initialScoreValue)
  })

  // useEffect(() => {
  //   countUp(scoreValue)
  // }, [scoreValue])
  

  // function countUp(scoreval) {
  //   var div_by = 100,
  //     speed = Math.round(scoreval / div_by),
  //     $display = $(".score__value"),
  //     run_score = 1,
  //     int_speed = 24;

  //   var int = setInterval(function () {
  //     if (run_score < div_by) {
  //       $display.text(speed * run_score);
  //       run_score++;
  //     } else if (parseInt($display.text()) < scoreval) {
  //       var curr_score = parseInt($display.text()) + 1;
  //       $display.text(curr_score);
  //     } else {
  //       clearInterval(int);
  //     }
  //   }, int_speed);
  // }

  // find players for each score item
  const matchingUsersPlayers = usersPlayers.filter((uPO) => {
    return uPO.userId === SO.userId;
  });

  const matchingPlayers = matchingUsersPlayers.map((mUPO) => {
    return playerObjArray.find((p) => {
      return mUPO.playerId === p.player.id;
    });
  });

  // filter out players that have already been mentioned so they don't appear on current user's lineup
  const filteredUsersPlayers = matchingUsersPlayers.filter((mUPO) => {
    return !mUPO.mentioned;
  });

  const filteredPlayerIds = filteredUsersPlayers.map((fUP) => {
    return fUP.playerId;
  });

  return (
    <tr className="score">
      <td>{SO.username}</td>
      <td class="score__value">{SO.score}</td>
      <td>
        <button
          className="score__showLineup button score--button lineup--button"
          onClick={(e) => {
            e.preventDefault();
            matchingPlayersToggle();
          }}
        >
          Show Playerz
        </button>
      </td>
      <Collapse in={showHideMatchingPlayers}>

        <div className="scoreboard__lineup lineup">
          <table>
            <tbody>
              {matchingPlayers.map((mPO) => {
                const redditSearch = `https://www.reddit.com/search?q=${mPO.player.firstName}%20${mPO.player.lastName}`;
                return (
                  <tr>
                    <td>
                      <a
                        href={redditSearch}
                        target="_blank"
                        className="scoreboard__lineup__player link lineup--link scoreboard--link"
                      >
                        {mPO.player.firstName} {mPO.player.lastName}
                      </a>
                    </td>
                    <td>
                      {SO.userId === currentUserId ? (
                        filteredPlayerIds.includes(mPO.player.id) ? (
                          <PlayerSelectButton type="stan" location="scoreboard" player={mPO.player.firstName}/>
                        ) : (
                          <div></div>
                        )
                      ) : (
                        <PlayerSelectButton type="trash" location="scoreboard" player={mPO.player.firstName}/>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Collapse>
      <LineupButton />
    </tr>
  );
};
