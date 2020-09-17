import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../users/UserProvider";

export const Leaderboard = () => {
    const { getUsers, users } = useContext(UserContext);

  useEffect(() => {
    getUsers();
  }, []);

    const userScores = users.map(u => {
        return u.messages.length
    })

    console.log(userScores)

    return null
};
