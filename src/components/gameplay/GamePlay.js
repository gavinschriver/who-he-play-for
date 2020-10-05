import React from "react";
import { StanEntryForm } from "./StanEntryForm";
import { TrashTalkEntryForm } from "./TrashTalkEntryForm";
import { Leaderboard } from "../leaderboard/Leaderboard";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import "./gameplay.css";
import MessageEntryForm from "../messages/MessageEntryForm";

export const GamePlay = () => (
  <>
    <Leaderboard location="game" />
    <MessageEntryForm type="stan" />
    <MessageEntryForm type="trash" />
  </>
);
