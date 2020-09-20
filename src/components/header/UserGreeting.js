import React, { useContext } from "react";
import { UserContext } from "../users/UserProvider";

export const UserGreeting = ({ user }) => {
    const { userScores } = useContext(UserContext);
    
  return (
    <>
      <h2>Welcome, {user.name}</h2>
      <h2>Your Score is:</h2>
    </>
  );
};
