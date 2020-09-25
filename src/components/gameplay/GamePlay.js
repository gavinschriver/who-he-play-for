import React from "react";
import { StanEntryForm } from "./StanEntryForm";
import { TrashTalkEntryForm } from "./TrashTalkEntryForm";
import { Leaderboard } from "../leaderboard/Leaderboard";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import "./gameplay.css"
import { Route } from "react-router-dom";

export const GamePlay = () => (
  <>
    <section id="gamecontainer" className="gameplay--container">
      <Container className="container gameplay--container" fluid>
        <Row>
          <Col className="container entryForm--container">
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
    </section>
  </>
);
