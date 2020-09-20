import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../users/UserProvider";
import { MessageContext } from "../messages/MessageProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";

export const Leaderboard = (props) => {
  const { getUsers, users } = useContext(UserContext);
  const { messages } = useContext(MessageContext);
  const { getPlayerData, playerObjArray } = useContext(PlayerContext);
  const { getUsersPlayers, usersPlayers } = useContext(UserPlayerContext);
  const currentUserId = parseInt(localStorage.getItem("whpf_user"));

  const userScores = users.map((u) => {
    let userscore = 0;

    //array of a user's messages
    const userMessages = u.messages;

    userMessages.forEach((m) => {
      if (m.stan) {
        userscore = userscore + 5;
      }
    });
    const userScoreObj = {
      username: u.name,
      userId: u.id,
      score: userscore,
    };

    return userScoreObj;
  });

  // only messages marked as trashtalk
  const trashtalkMessages = messages.filter((m) => {
    return m.trashtalk;
  });

  // strings of all the instances of trash talkin' (aka each occurance of a player's **first name  (will change maybe??) )
  const trashtalkStringNameInstances = trashtalkMessages.map((ttMO) => {
    return ttMO.messagetext;
  });

  const trashedUserScores = userScores.map((uSO) => {
    const matchingUserObject = users.find((u) => {
      return u.id === uSO.userId;
    });

    const matchingUserPlayerObjects = usersPlayers.filter((uPO) => {
      return uPO.userId === matchingUserObject.id;
    });

    const matchingPlayerObjects = matchingUserPlayerObjects.map((mUPO) => {
      return playerObjArray.find((pO) => {
        return pO.player.id === mUPO.playerId;
      });
    });

    const matchingPlayerStrings = matchingPlayerObjects.map((mPO) => {
      return mPO.player.firstName || {};
    });

    trashtalkStringNameInstances.forEach((ttSNI) => {
      if (matchingPlayerStrings.includes(ttSNI)) {
        uSO.score--;
      }
    });

    return uSO;
  });

  const sortedScores = trashedUserScores.sort((a, b) => {
    return b.score - a.score;
  });

  const currentUserScore =
    trashedUserScores.find((tSO) => tSO.userId === currentUserId) || {};

  useEffect(() => {
    getUsers().then(getUsersPlayers).then(getPlayerData);
  }, []);

  useEffect(() => {
    getUsers();
  }, [messages]);

  return (
    <section>
      {props.location === "game" ? (
        <>
          <h2>TRYING 2 PLAY??</h2>
          <table>
            <tbody>
              <tr>
                <th>User:</th>
                <th>Points:</th>
              </tr>
              {sortedScores.map((uSO) => {
                return (
                  <tr>
                    <td>{uSO.username}</td>
                    <td>{uSO.score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : props.location === "header" ? (
        <h2>{currentUserScore.score}</h2>
        ) : <div></div>
    }
    </section>
  );
};
