import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const LogoutButton = () => {

  const [loggedOut, setLoggedOut] = useState(false)

  const logout = () => {
    localStorage.removeItem("whpf_user")
    setLoggedOut(true)

  };

  if (loggedOut) {
    return <Redirect to="/login" push={true} />
  }

  return <Button onClick={logout}>LogOut</Button>;
};
