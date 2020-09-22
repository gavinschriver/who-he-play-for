import React from "react";
import { StanEntryForm } from "./StanEntryForm";
import { TrashTalkEntryForm } from "./TrashTalkEntryForm";
import { Leaderboard } from "../leaderboard/Leaderboard";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

export const GamePlay = () => (
  <>
    <Container>
      <Row>
        <StanEntryForm />
      <Leaderboard location="game" />
        <TrashTalkEntryForm />
        </Row>
    </Container>
  </>
);
