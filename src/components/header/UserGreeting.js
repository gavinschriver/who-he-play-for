import React, { useContext } from "react";

export const UserGreeting = ({ user }) => {
  console.log(user.avatar)

  return (
    <>
      <article className="userGreeting">
        <h2>Why howdy, {user.name}</h2>
        <img src={user.avatar} />
      </article>
    </>
  );
};
