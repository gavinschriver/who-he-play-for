import React, { useState, useEffect, createContext } from "react";

export const UserPlayerContext = React.createContext();

export const UserPlayerProvider = (props) => {
  const [usersPlayers, setUsersPlayers] = useState([]);

  const getUsersPlayers = () => {
    return fetch(`http://localhost:8888/usersPlayers`)
      .then((res) => res.json())
      .then(setUsersPlayers);
  };

  const addUserPlayer = (newUserPlayer) => {
    return fetch("http://localhost:8888/usersPlayers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserPlayer),
    }).then(getUsersPlayers);
  };

  const removeUserPlayer = (userPlayerId) => {
    return fetch(`http://localhost:8888/usersPlayers/${userPlayerId}`, {
      method: "DELETE",
    }).then(getUsersPlayers);
  };
    
    return (
        <UserPlayerContext.Provider value={{ usersPlayers, getUsersPlayers, addUserPlayer, removeUserPlayer }}>
            {props.children}
        </UserPlayerContext.Provider>
)
};