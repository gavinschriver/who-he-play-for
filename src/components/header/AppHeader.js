import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../users/UserProvider";
import "./AppHeader.css";

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
          <h2>What's up,{user.name}</h2>
    </section>
  );
};
