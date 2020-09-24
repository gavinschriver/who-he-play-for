import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../users/UserProvider";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export const LogoutButton = ({ location, user }) => {
  const { removeUser } = useContext(UserContext);
  const [loggedOut, setLoggedOut] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const logout = () => {
    localStorage.removeItem("whpf_user");
    setLoggedOut(true);
  };

  const logoutAndDelete = () => {
    localStorage.removeItem("whpf_user");
    removeUser(user.id);
    setLoggedOut(true);
  };

  if (loggedOut) {
    return <Redirect to="/login" push={true} />;
  }

  if (location === "navbar") {
    return <Button onClick={logout}>LogOut</Button>;
  }

  if (location === "userAccount") {
    return (
      <>
        <Button
          onClick={() => {
            setShowAlert(true);
          }}
        >
          Delete account forever and ever
        </Button>
        {showAlert ? (
          <Alert dismissible onClose={() => setShowAlert(false)}>
            SUreee about that?<Button onClick={logoutAndDelete}>YES TERMINATE ME</Button>
          </Alert>
        ) : (
          <div></div>
        )}
      </>
    );
  }
};
