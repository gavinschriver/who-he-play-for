import React, { useState, createContext } from "react";

export const UserPlayerContext = React.createContext();

export const UserPlayerProvider = (props) => {
  const [usersPlayers, setUsersPlayers] = useState([]);

  const [mentionedCount, setMentionedCount] = useState(0);

  const getUsersPlayers = () => {
    return fetch(`https://whpf-database.herokuapp.com/usersPlayers`)
      .then((res) => res.json())
      .then(setUsersPlayers);
  };

  const addUserPlayer = (newUserPlayer) => {
    return fetch("https://whpf-database.herokuapp.com/usersPlayers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserPlayer),
    }).then(getUsersPlayers);
  };

  const removeUserPlayer = (userPlayerId) => {
    return fetch(`https://whpf-database.herokuapp.com/usersPlayers/${userPlayerId}`, {
      method: "DELETE",
    }).then(getUsersPlayers);
  };

  const updateUserPlayer = (userPlayer) => {
    return fetch(`https://whpf-database.herokuapp.com/${userPlayer.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userPlayer),
    }).then(getUsersPlayers);
  };


  return (
    <UserPlayerContext.Provider
      value={{
        usersPlayers,
        getUsersPlayers,
        addUserPlayer,
        removeUserPlayer,
        updateUserPlayer,
        mentionedCount,
        setMentionedCount,
      }}
    >
      {props.children}
    </UserPlayerContext.Provider>
  );
};
