import React from "react";
import { Leaderboard } from "../leaderboard/Leaderboard";
import Container from "react-bootstrap/esm/Container";
import MessageEntryForm from "../messages/MessageEntryForm";
import "./gameplay.css";
import MessageEntryModal from "../messages/MessageEntryModal";

export const GamePlay = () => (
  <>
    <Container>
      <Leaderboard location="game" />
    </Container>
    <MessageEntryModal type="stan" />
    <MessageEntryForm type="stan" />
    <MessageEntryModal type="trash" />
    <MessageEntryForm type="trash" />
  </>
);
