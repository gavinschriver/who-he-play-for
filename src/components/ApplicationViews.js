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
import Col from "react-bootstrap/Col"

export const ApplicationViews = (props) => {
  return (
    <>
      <Container fluid>
        <UserProvider>
          <PlayerProvider>
            <MessageProvider>
              <UserPlayerProvider>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <>
                      <Jumbotron>
                        <AppHeader {...props} />
                      </Jumbotron>
                      <Container>
                        <Row>
                          <GamePlay {...props} />
                        </Row>
                        <Row>
                          <Col>
                          <GenerateLineup {...props} />
                            <MessagesList {...props} />
                            </Col>
                        </Row>
                      </Container>
                    </>
                  )}
                ></Route>
              </UserPlayerProvider>
            </MessageProvider>
          </PlayerProvider>
        </UserProvider>
      </Container>

      <Route exact path="/account" render={(props) => <UserAccount />}></Route>
    </>
  );
};
