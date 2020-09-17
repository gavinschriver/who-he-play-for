import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../users/UserProvider";

export const Leaderboard = () => {
    const { getUsers, users } = useContext(UserContext);

  useEffect(() => {
    getUsers();
  }, []);

    const userScores = users.map(u => {
        const userScoreObj = {
            userId: u.id,
            score: u.messages.length
        }

        return userScoreObj
    })

    return (
        <table>
            <tr><th>User:</th><th>Score:</th></tr>
        </table>
    )
};
