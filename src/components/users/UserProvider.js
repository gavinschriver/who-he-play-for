import React, { useState, useEffect, createContext } from "react";

export const UserContext = React.createContext();

export const UserProvider = (props) => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    return fetch(`http://localhost:8888/users?_embed=messages`)
      .then((res) => res.json())
      .then(setUsers);
  };

  const addUser = (newUser) => {
    return fetch("http://localhost:8888/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then(getUsers);
  };

  const removeUser = (userId) => {
    return fetch(`http://localhost:8888/users/${userId}`, {
      method: "DELETE",
    }).then(getUsers);
  };

  const updateUser = (user) => {
    return fetch(`http://localhost:8888/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(getUsers);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        getUsers,
        addUser,
        removeUser,
        updateUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};