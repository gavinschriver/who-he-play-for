import React, { useState, createContext } from "react";

export const UserContext = React.createContext();

export const UserProvider = (props) => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    return fetch(`https://whpf-database.herokuapp.com/users?_embed=messages&_embed=usersPlayers`)
      .then((res) => res.json())
      .then(setUsers);
  };

  const addUser = (newUser) => {
    return fetch("https://whpf-database.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then(getUsers);
  };

  const removeUser = (userId) => {
    return fetch(`https://whpf-database.herokuapp.com/users/${userId}`, {
      method: "DELETE",
    }).then(getUsers);
  };

  const updateUser = (user) => {
    return fetch(`https://whpf-database.herokuapp.com/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(getUsers);
  };

  const currentUserId = parseInt(localStorage.getItem("whpf_user"));

  const getUserById = (id) => {
    return fetch(
      `https://whpf-database.herokuapp.com/${id}?_embed=messages&_embed=usersPlayers`
    )
      .then((res) => res.json())
  };

  return (
    <UserContext.Provider
      value={{
        users,
        getUsers,
        addUser,
        removeUser,
        updateUser,
        currentUserId,
        getUserById
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
