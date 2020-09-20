import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../users/UserProvider";
import { UserGreeting } from "./UserGreeting";
import "./AppHeader.css";
import { Leaderboard } from "../leaderboard/Leaderboard";
import { UserScore } from "./UserScore"

export const AppHeader = () => {
  const { users, getUsers } = useContext(UserContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const currentUser =
      users.find((u) => {
        return u.id === parseInt(localStorage.getItem("whpf_user"));
      }) || {};
    setUser(currentUser);
  }, [users]);

  return (
    <section className="appHeader">
          <h2>WHO HE PLAY FOR ANYWAY</h2>
      <UserGreeting user={user} />
      <Leaderboard location="header" />
    </section>
  );
};
