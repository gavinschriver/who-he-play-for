import React, { useContext } from "react";
import { Avatar } from "../users/Avatar"

export const UserGreeting = ({ user }) => {

  return (
    <>
      <article className="userGreeting">
        <h2>Why howdy, {user.name}</h2>
        <Avatar user={user} location="greeting" />
      </article>
    </>
  );
};
