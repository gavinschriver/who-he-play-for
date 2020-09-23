import React, { useContext } from "react";

export const UserGreeting = ({ user }) => {
  const avatarValue = user.avatar

  return (
    <>
      <article className="userGreeting">
        <h2>Why howdy, {user.name}</h2>
        <img src="/images/log192.png" alt="" />
      </article>
    </>
  );
};
