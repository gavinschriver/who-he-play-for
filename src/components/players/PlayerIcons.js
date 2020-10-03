import React from "react";
import { Card, Col, Row, Container, Button } from "react-bootstrap";

export default ({ details }) => {
  const teamImg =
    details.teamAbb === "NONE"
      ? `/images/mj.jpg`
      : details.teamAbb === "BRO"
      ? `http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/bkn.png`
      : details.teamAbb === "OKL"
      ? `http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/okc.png`
      : `http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${details.teamAbb}.png`.toLowerCase();

  return (
    <div className="playerIcons">
      <Row>
        <Container>
          <Card.Img className="playerHeadshot" src={details.playerImg} />
          <Card.Img bsPrefix="icon" className="teamIcon" src={teamImg} />
        </Container>
      </Row>
    </div>
  );
};
