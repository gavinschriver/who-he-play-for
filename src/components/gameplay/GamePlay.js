import React from "react";
import { StanEntryForm } from "./StanEntryForm";
import { TrashTalkEntryForm } from "./TrashTalkEntryForm";
import { Leaderboard } from "../leaderboard/Leaderboard";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import { Route } from "react-router-dom";

export const GamePlay = () => (
  <>
    <Container className="gameplay" id="gamecontainer" fluid>
      <Row>
        <Col>
          <StanEntryForm />
        </Col>
        <Col>
          <Leaderboard location="game" />
        </Col>
        <Col>
          <TrashTalkEntryForm />
        </Col>
      </Row>
    </Container>
  </>
);
