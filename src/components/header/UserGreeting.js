import React, { useContext } from "react";
import { Avatar } from "../users/Avatar"

export const UserGreeting = ({ user }) => {

  return (
    <>
      <article className="userGreeting">
        <h2>Why hey howdy, {user.name}</h2>
        {user.avatar  ? <Avatar user={user} location="greeting" /> : <div></div>}
      </article>
    </>
  );
};
