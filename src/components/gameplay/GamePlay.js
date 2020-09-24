import React from "react";
import { StanEntryForm } from "./StanEntryForm";
import { TrashTalkEntryForm } from "./TrashTalkEntryForm";
import { Leaderboard } from "../leaderboard/Leaderboard";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";

export const GamePlay = () => (
  <>
    <Container className="gameplay">
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
