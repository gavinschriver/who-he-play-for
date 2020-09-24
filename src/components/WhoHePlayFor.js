import React from "react";
import { Route, Redirect, Link } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { AppHeader } from "./header/AppHeader";
import { UserProvider } from "./users/UserProvider";
import "./WhoHePlayFor.css";
import { Navbar, Nav, NavItem, NavDropdown } from "react-bootstrap/";

export const WhoHePlayFor = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("whpf_user")) {
          return (
            <>
              <UserProvider>
                <Route render={() => <NavBar />} />
              </UserProvider>
              <Route render={(props) => <ApplicationViews {...props} />} />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login" render={(props) => <Login {...props} />} />
    <Route path="/register" render={(props) => <Register {...props} />} />
  </>
);
