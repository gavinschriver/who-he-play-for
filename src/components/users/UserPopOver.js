import React from "react";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";
import { Leaderboard } from "../leaderboard/Leaderboard";
import { FaBasketballBall } from "react-icons/fa/";

export default (props) => {
  const userPop = (
    <Popover>
      <Popover.Title>User details <FaBasketballBall/></Popover.Title>
      <Popover.Content>
        <Leaderboard matchingUserId={props.userId} />
      </Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="hover" placement="right" overlay={userPop}>
      <Button variant="light">{props.user}</Button>
    </OverlayTrigger>
  );
};
