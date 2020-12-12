import React from "react";
import { Leaderboard } from "../leaderboard/Leaderboard";
import Container from "react-bootstrap/esm/Container";
import MessageEntryForm from "../messages/MessageEntryForm";
import "./gameplay.css";
import MessageEntryModal from "../messages/MessageEntryModal";
import { Row, Col } from "react-bootstrap";

export const GamePlay = () => (
  <>
    <div className="gameEntryForm">
      <Container>
        <Row>
          <Col>
            <MessageEntryForm type="stan" />
          </Col>
          <Col>
            <MessageEntryModal type="stan" location="gameplay" />
          </Col>
        </Row>
        <Row>
          <Col>
            <MessageEntryForm type="trash" />
          </Col>
          <Col>
            <MessageEntryModal type="trash" location="gameplay" />
          </Col>
        </Row>
      </Container>
    </div>
    {/* <Container> */}
      <Leaderboard location="game" />
    {/* </Container> */}
  </>
);
