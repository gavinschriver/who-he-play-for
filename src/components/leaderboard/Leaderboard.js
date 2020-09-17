import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../users/UserProvider";
import { MessageContext } from "../messages/MessageProvider";

export const Leaderboard = () => {
    const { getUsers, users } = useContext(UserContext);
    const { messages} = useContext(MessageContext)

  useEffect(() => {
    getUsers();
  }, []);
    
    useEffect(() => {
        getUsers()
    }, [messages])

  const userScores = users.map((u) => {
    const userScoreObj = {
      username: u.name,
      userId: u.id,
      score: u.messages.length,
    };

    return userScoreObj;
  }).reverse();

  return (
    <table>
      <tr>
        <th>User:</th>
        <th>Stans:</th>
      </tr>
      {userScores.map((uSO) => {
        return (
          <tr>
            <td>{uSO.username}</td>
            <td>{uSO.score}</td>
          </tr>
        );
      })}
    </table>
  );
};
