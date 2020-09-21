import React from "react";
import { Route } from "react-router-dom";

export const LogoutButton = (props) => {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("whfp_user");
        props.history.push("/login");
      }}
    >GET OUT MY FACE</button>
  );
};
