import React, { useContext } from "react";
import { UserContext } from "../users/UserProvider";

export const UserGreeting = ({ user }) => {

  return (
    <>
      <article className="userGreeting">
        <h2>Why howdy, {user.name}</h2>
      </article>
    </>
  );
};
