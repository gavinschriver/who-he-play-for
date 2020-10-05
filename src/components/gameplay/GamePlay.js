import React from "react";
import { Leaderboard } from "../leaderboard/Leaderboard";
import Container from "react-bootstrap/esm/Container";
import MessageEntryForm from "../messages/MessageEntryForm";
import "./gameplay.css";

export const GamePlay = () => (
  <>
    <Container>
      <Leaderboard location="game" />
    </Container>
    <MessageEntryForm type="stan" />
    <MessageEntryForm type="trash" />
  </>
);
