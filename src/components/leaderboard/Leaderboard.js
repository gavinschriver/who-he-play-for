import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../users/UserProvider";
import { MessageContext } from "../messages/MessageProvider";
import { PlayerContext } from "../players/PlayerProvider";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";

export const Leaderboard = () => {
  const { getUsers, users } = useContext(UserContext);
  const { messages } = useContext(MessageContext);
  const { getPlayerData, playerObjArray } = useContext(PlayerContext);
  const { getUsersPlayers, usersPlayers } = useContext(UserPlayerContext);

  // only messages marked as trash talk
  const trashtalkMessages = messages.filter((m) => {
    return m.trashtalk;
  });

  const trashtalkStringNameInstances = trashtalkMessages.map((ttMO) => {
    return ttMO.messagetext;
  });

  console.log(trashtalkStringNameInstances);

  useEffect(() => {
    getUsers()
      .then(getUsersPlayers)
      .then(getPlayerData);
  }, []);

  useEffect(() => {
    getUsers();
  }, [messages]);

  const userScores = users.map((u) => {
    let userscore = 0;

    const userMessages = u.messages;

    userMessages.forEach((m) => {
      if (m.stan) {
        userscore = userscore + 5;
      } else if (m.trashtalk) {
        userscore++;
      }
    });
    const userScoreObj = {
      username: u.name,
      userId: u.id,
      score: userscore,
    };

    const What = usersPlayers


    return userScoreObj;
  });

  const trashedUserScores = userScores.map((uSO) => {
    const matchingUserObject = users.find((u) => {
      return u.id === uSO.userId;
    });

    const matchingUserPlayerObjects = usersPlayers.filter((uPO) => {
      return uPO.userId === matchingUserObject.id || {};
    });

    const matchingPlayerObjects = matchingUserPlayerObjects.map((mUPO) => {
      return playerObjArray.find((pO) => {
        return pO.player.id === mUPO.playerId;
      });
    });

    const matchingPlayerStrings = matchingPlayerObjects.map((mPO) => {
      return mPO.player.firstName;
    });

    trashtalkStringNameInstances.forEach((ttSNI) => {
      if (matchingPlayerStrings.includes(ttSNI)) {
        uSO.score--;
      }
    });

    return uSO;
  });

  console.log(trashedUserScores)

  const sortedScores = userScores.sort((a, b) => {
    return b.score - a.score;
  });

  return (
    <table>
      <tbody>
        <tr>
          <th>User:</th>
          <th>Stans:</th>
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
  );
};
