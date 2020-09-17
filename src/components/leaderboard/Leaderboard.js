import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../users/UserProvider";
import { MessageContext } from "../messages/MessageProvider";

export const Leaderboard = () => {
  const { getUsers, users } = useContext(UserContext);
  const { messages, getMessages } = useContext(MessageContext);
  const [userScores, setUserScores] = useState([]);

  useEffect(() => {
    getUsers().then(getMessages);
  }, []);

  useEffect(() => {
    console.log("messages change!");
    setUserScores(
      users
        .map((u) => {
          const userScoreObj = {
            username: u.name,
            userId: u.id,
            score: u.messages.length,
          };

          return userScoreObj;
        })
        .reverse()
    );
  }, [messages]);

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
