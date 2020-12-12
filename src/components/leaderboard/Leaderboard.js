import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../users/UserProvider";
import { MessageContext } from "../messages/MessageProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { Score } from "./Score";
import "./leaderboard.css";
import Table from "react-bootstrap/Table";
import Collapse from "react-bootstrap/Collapse";
import LineupProgress from "../lineup/LineupProgress";

//this comp is a bit inaccurately named now. Should be Scores or something
//to indicate it generates all scores and returns them conditionally rendered

export const Leaderboard = (props) => {
  const matchingUserId = props.matchingUserId;
  const { getUsers, users } = useContext(UserContext);
  const { messages, getMessages } = useContext(MessageContext);
  const { getPlayerData, playerObjArray } = useContext(PlayerContext);
  const { getUsersPlayers, usersPlayers } = useContext(UserPlayerContext);

  // component-state values for everything
  const [usersArray, setUsersArray] = useState([]);
  const [messagesArray, setMessagesArray] = useState([]);
  const [playersArray, setPlayersArray] = useState([]);
  const [usersPlayersArray, setUsersPlayersArray] = useState([]);
  const currentUserId = parseInt(localStorage.getItem("whpf_user"));

  // create colleciton of pre-trashed user scores
  const userScores = usersArray.map((u) => {
    let userscore = 0;

    const userMessages = u.messages;

    let stanCount = 0;

    let trashCount = 0;

    userMessages.forEach((m) => {
      if (m.stan) {
        userscore = userscore + 50;
        stanCount++;
      } else if (m.trashtalk) {
        trashCount++;
      }
    });
    const userScoreObj = {
      username: u.name,
      userId: u.id,
      score: userscore,
      stans: stanCount,
      trashtalks: trashCount,
    };

    return userScoreObj;
  });

  //trashtalk
  const trashtalkMessages = messages.filter((m) => {
    return m.trashtalk;
  });

  // is this the only line that would need adjusting to fix first AND last name of player problem?
  const trashtalkStringNameInstances = trashtalkMessages.map((ttMO) => {
    return ttMO.messagetext;
  });

  const trashedUserScores = userScores.map((uSO) => {
    const matchingUserObject = usersArray.find((u) => {
      return u.id === uSO.userId;
    });

    const matchingUserPlayerObjects =
      usersPlayersArray.filter((uPO) => {
        return uPO.userId === matchingUserObject.id;
      }) || {};

    const matchingPlayerObjects =
      matchingUserPlayerObjects.map((mUPO) => {
        return playersArray.find((pO) => {
          return pO.player.id === mUPO.playerId;
        });
      });

    // HERES the line that would have to change to match; this is the collection of player name string references from a user's current lineup
    const matchingPlayerStrings =
      matchingPlayerObjects.map((mPO) => {
        if (typeof mPO !== "undefined") {
          return `${mPO.player.firstName} ${mPO.player.lastName}`;
        }
      });

    trashtalkStringNameInstances.forEach((ttSNI) => {
      if (matchingPlayerStrings.includes(ttSNI)) {
        uSO.score = uSO.score - 10;
      }
    });

    return uSO;
  });

  //scores sorted after trashtalk calculation
  const sortedScores = trashedUserScores.sort((a, b) => {
    return b.score - a.score;
  });

  // unique values for current user and all-time leaders
  const currentUserScore =
    trashedUserScores.find((tSO) => tSO.userId === currentUserId) || {};

  const matchingUserScore =
    trashedUserScores.find((tSO) => tSO.userId === matchingUserId) || {};

  const mentionedMatchingUPS = usersPlayersArray.filter((up) => {
    return up.userId === matchingUserId && up.mentioned;
  });

  const sortedByStans =
    userScores.sort((a, b) => {
      return b.stans - a.stans;
    }) || {};

  const stanimal = sortedByStans[0] || {};

  const sortedByTrashtalks =
    userScores.sort((a, b) => {
      return b.trashtalks - a.trashtalks;
    }) || {};

  const trashtalkchamp = sortedByTrashtalks[0] || {};

  //effects

  useEffect(() => {
    getPlayerData().then(getUsers).then(getUsersPlayers);
  }, []);

  useEffect(() => {
    setUsersArray(users || {});
  }, [users]);

  useEffect(() => {
    setUsersPlayersArray(usersPlayers || {});
  }, [usersPlayers]);

  useEffect(() => {
    setPlayersArray(playerObjArray || {});
  }, [playerObjArray]);

  useEffect(() => {
    getUsers();
  }, [messages]);

  let rank = 0;

  if (playerObjArray.length === 0) {
    return (
      <h1>NO DATA</h1>
    )
  }

  if (playerObjArray.length > 0) {

    return (
      <article className="scores">
        {/* if we're rendering in the game form... */}
        {props.location === "game" ? (
          <section className="scoreboard">
            <div className="scoreboard__allTime">
              <article className="allTime">
                <div className="scoreboard__allTime__type stanimal">
                  <h3 className="stanimal__heading heading scoreboard--heading">
                    All time stanimal:
                </h3>
                  <span className="stanimal__stanner name user--name">
                    {stanimal.username}{" "}
                  </span>
                  <span className="stanimal__stanCount">
                    with {stanimal.stans} stans
                </span>
                </div>
              </article>
              <article className="allTime">
                <div className="scoreboard__allTime__type trashtalkchamp">
                  <h3 className="trashtalkchamp__heading heading scoreboard--heading">
                    Trash talk champion:
                </h3>
                  <span className="trashtalkchamp__champ name user--name">
                    {trashtalkchamp.username}{" "}
                  </span>
                  <span className="trashtalkchamp__trashtalkCount">
                    with {trashtalkchamp.trashtalks} trashes
                </span>
                </div>
              </article>
            </div>
            <div className="leaderboard-table">
              <Table>
                <tbody>
                  <tr>
                    <th>Rank</th>
                    <th>User</th>
                    <th>Score</th>
                    <th>Lineup</th>
                  </tr>
                  {/* begin map (sending uSO to Score.js*/}
                  {sortedScores.map((uSO) => {
                    const matchingUser =
                      users.find((u) => {
                        return u.id === uSO.userId;
                      }) || {};

                    rank++;

                    return (
                      <Score
                        key={uSO.id}
                        SO={uSO}
                        UO={matchingUser}
                        rank={rank}
                        parent="scoreboard"
                      />
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </section>
        ) : props.location === "header" ? (
          <>
            <section className="userScores">
              <div className="userScores__score">
                <div className="userScores__trashtalks__heading">
                  Your score:{" "}
                  <span className="score-item">{currentUserScore.score}</span>
                </div>
              </div>
              <div className="userScores__stans">
                <div className="userScores__stans__heading">
                  Your stan count:{" "}
                  <span className="userScores__stans__ score-item">
                    {currentUserScore.stans}
                  </span>
                </div>
              </div>
              <div className="userScores__trashtalks">
                <div className="userScores__trashtalks__heading">
                  Your trashtalk count:{" "}
                  <span className="userScores__trashtalks__ score-item">
                    {currentUserScore.trashtalks}
                  </span>
                </div>
              </div>
              <LineupProgress />
            </section>
          </>
        ) : (
              <>
                <div>Score: {matchingUserScore.score}</div>
                <div>
                  Total posts:{" "}
                  {users.find((u) => u.id === matchingUserId).messages.length}
                </div>
                <div>Stan'd in current linup: {mentionedMatchingUPS.length}/5</div>
              </>
            )}
      </article>
    );
  }
};
