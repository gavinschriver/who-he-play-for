import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../users/UserProvider";
import { MessageContext } from "../messages/MessageProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";
import { Score } from "./Score";

//this comp is a bit inaccurately named now. Should be Scores or something
//to indicate it generates all scores and returns them conditionally rendered

export const Leaderboard = (props) => {
  const { getUsers, users } = useContext(UserContext);
  const { messages } = useContext(MessageContext);
  const { getPlayerData, playerObjArray } = useContext(PlayerContext);
  const { getUsersPlayers, usersPlayers } = useContext(UserPlayerContext);
  const [usersArray, setUsersArray] = useState([]);
  const [messagesArray, setMessagesArray] = useState([]);
  const [playersArray, setPlayersArray] = useState([]);
  const [usersPlayersArray, setUsersPlayersArray] = useState([]);
  const currentUserId = parseInt(localStorage.getItem("whpf_user"));

  const userScores = usersArray.map((u) => {
    let userscore = 0;

    //array of a user's messages
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

  // only messages marked as trashtalk //
  const trashtalkMessages = messages.filter((m) => {
    return m.trashtalk;
  });

  // strings of all the instances of trash talkin' (aka each occurance of a player's **first name  (will change maybe??) )
  const trashtalkStringNameInstances = trashtalkMessages.map((ttMO) => {
    return ttMO.messagetext;
  });

  // After initial user scores are calculated, then adjust for trashing
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
      }) || {};

    const matchingPlayerStrings =
      matchingPlayerObjects.map((mPO) => {
        return mPO.player.firstName;
      }) || {};

    trashtalkStringNameInstances.forEach((ttSNI) => {
      if (matchingPlayerStrings.includes(ttSNI)) {
        uSO.score = uSO.score - 10;
      }
    });

    return uSO;
  });

  const sortedScores = trashedUserScores.sort((a, b) => {
    return b.score - a.score;
  });

  // and now, some fun stuff
  const currentUserScore =
    trashedUserScores.find((tSO) => tSO.userId === currentUserId) || {};

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

  return (
    <article className="scores">
      {/* if we're rendering in the game form... */}
      {props.location === "game" ? (
        <section className="scoreboard">
          <div className="stanimal">
            <div className="stanimal__heading">All time stanimal:</div>
            <span>{stanimal.username}</span>
            <span className="stanimal__stanCount">
              {" "}
              with {stanimal.stans} stans
            </span>
          </div>
          <div className="trashtalkchamp">
            <div className="trashtalkchamp__heading">Trash talk champion:</div>
            <span>{trashtalkchamp.username}</span>
            <span className="trashtalkchamp__trashtalkCount">
              {" "}
              with {trashtalkchamp.trashtalks} trashes
            </span>
          </div>
          <table>
            <tr>
              <th>User</th>
              <th>Score</th>
            </tr>
            {/* begin map (sending uSO to Score.js*/}
            {sortedScores.map((uSO) => {
              const matchingUser =
                users.find((u) => {
                  return u.id === uSO.userId;
                }) || {};

              return <Score key={uSO.id} SO={uSO} UO={matchingUser} />;
            })}
          </table>
        </section>
      ) : props.location === "header" ? (
        <>
          <section className="userScores">
            <div className="userScores__score">
              <div className="userScores__trashtalks__heading">Your score:</div>
              <span>{currentUserScore.score}</span>
            </div>
            <div className="userScores__trashtalks">
              <div className="userScores__trashtalks__heading">
                Your trashtalk count:
              </div>
              <span className="userScores__trashtalks__">
                {currentUserScore.trashtalks}
              </span>
            </div>
          </section>
        </>
      ) : (
        <div></div>
      )}
    </article>
  );
};
