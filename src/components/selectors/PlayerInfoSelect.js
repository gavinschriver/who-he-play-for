import React from "react";
import { Tab, Col, Row, ListGroup } from "react-bootstrap";
import Stats from "../highlights/Stats";
import PlayerDetails from "../players/PlayerDetails";
import { TwitterTimelineEmbed } from "react-twitter-embed";

export default ({ playerDetails }) => {
  console.log(playerDetails.twitterName);
  return (
    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
      <Row>
        <Col sm={4}>
          <ListGroup horizontal>
            <ListGroup.Item action href="#link1">
              Stats
            </ListGroup.Item>
            <ListGroup.Item action href="#link2">
              Bio
            </ListGroup.Item>
            {playerDetails.twitterName !== "NONE" ? (
              <ListGroup.Item action href="#link3">
                TWEETME
              </ListGroup.Item>
            ) : (
              <div></div>
            )}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <Tab.Content>
            <Tab.Pane eventKey="#link1">
              <Stats id={playerDetails.id} />
            </Tab.Pane>
            <Tab.Pane eventKey="#link2">
              <PlayerDetails
                playerDetails={{
                  ...playerDetails,
                }}
              />
            </Tab.Pane>
            {playerDetails.twitterName !== "NONE" ? (
              <Tab.Pane eventKey="#link3">
                <TwitterTimelineEmbed
                  sourceType="profile"
                  screenName={playerDetails.twitterName}
                  options={{ height: 400 }}
                />
              </Tab.Pane>
            ) : (
              <div></div>
            )}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};
