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
    <section id="gamecontainer" className="gameplay--container">
      <Container className="container gameplay--container" fluid>
        <Row>
          {/* <Col className="container entryForm--container">
            <StanEntryForm />
          </Col> */}
          {/* <Col>
            <TrashTalkEntryForm />
          </Col> */}
          <Col>
            <MessageEntryForm type="stan" />
          </Col>
          <Col>
            <Leaderboard location="game" />
          </Col>
          <Col>
            <MessageEntryForm type="trash" />
          </Col>
        </Row>
      </Container>
    </section>
  </>
);
