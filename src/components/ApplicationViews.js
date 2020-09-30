import React from "react";
import { Route } from "react-router-dom";
import { GenerateLineup } from "./lineup/GenerateLineup";
import { PlayerProvider } from "./players/PlayerProvider";
import { UserPlayerProvider } from "./usersPlayers/UsersPlayersProvider";
import { MessageProvider } from "./messages/MessageProvider";
import { MessagesList } from "./messages/MessagesList";
import { UserProvider } from "./users/UserProvider";
import { GamePlay } from "./gameplay/GamePlay";
import { AppHeader } from "./header/AppHeader";
import { UserAccount } from "./users/UserAccount";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Highlight from "./highlights/Highlight";
import Stats from "./highlights/Stats";

export const ApplicationViews = (props) => {
  return (
    <>
      <Container fluid>
        <PlayerProvider>
          <UserPlayerProvider>
            <MessageProvider>
              <Route
                exact
                path="/"
                render={(props) => (
                  <>
                    <Jumbotron>
                      <AppHeader {...props} />
                      {/* <Highlight location="header"/> */}
                    </Jumbotron>
                    <Container className="maincontent" fluid="md">
                      <Row>
                        <GamePlay id="gamecontainer" {...props} />
                      </Row>
                      <Row>
                        <Col>
                          <GenerateLineup {...props} />
                        </Col>
                        <Col>
                          <MessagesList {...props} />
                        </Col>
                      </Row>
                      <Row>
                        <Col></Col>
                      </Row>
                    </Container>
                  </>
                )}
              ></Route>
            </MessageProvider>
          </UserPlayerProvider>
        </PlayerProvider>
      </Container>

      <UserProvider>
        <Route
          exact
          path="/account"
          render={(props) => <UserAccount {...props} />}
        ></Route>
      </UserProvider>

      <Route
        path="/logout"
        render={(props) => {
          localStorage.removeItem("whpf_user");
          props.history.push("/login");
        }}
      ></Route>
    </>
  );
};
