import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../users/UserProvider";
import { UserGreeting } from "./UserGreeting";
import { Leaderboard } from "../leaderboard/Leaderboard";
import { Container, Row, Col } from "react-bootstrap";
import SiteTitle from "./SiteTitle";
import "./AppHeader.css";
import Highlight from "../highlights/Highlight";

export const AppHeader = (props) => {
  const { users, getUsers } = useContext(UserContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const currentUser =
      users.find((u) => {
        return u.id === parseInt(localStorage.getItem("whpf_user"));
      }) || {};
    setUser(currentUser);
  }, [users]);

  return (
    <article className="appHeader">
      <Container>
        <Row>
          <Col>
            <SiteTitle />
            <UserGreeting user={user} />
          </Col>
          <Col>
            <Leaderboard location="header" />
          </Col>
          <Col>
            {/* <Highlight location="header"/> */}
          </Col>
        </Row>
      </Container>
    </article>
  );
};
