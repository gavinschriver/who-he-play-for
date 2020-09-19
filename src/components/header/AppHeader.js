import React, { useContext, useEffect } from "react";
import { UserContext } from "../users/UserProvider";

export const AppHeader = () => {
  const { users, getUsers } = useContext(UserContext);

  const currentUser = users.find((u) => {
    return u.id === parseInt(localStorage.getItem("whpf_user"));
  });

  console.log(currentUser);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className="appHeader">
      <h2>WHO HE PLAY FOR ANYWAY</h2>
    </section>
  );
};
