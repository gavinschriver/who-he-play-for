import React from "react";
import Stats from "../highlights/Stats";

export default (props) => {
  const playerId = props.id;

    return <Stats id={playerId} />
};
