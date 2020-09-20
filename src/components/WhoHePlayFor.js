import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./WhoHePlayFor.css";
import { AppHeader } from "./header/AppHeader";
import { UserProvider } from "./users/UserProvider";

export const WhoHePlayFor = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("whpf_user")) {
          return (
            <>
              <UserProvider>
                <Route render={(props) => <ApplicationViews {...props} />} />
              </UserProvider>
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
