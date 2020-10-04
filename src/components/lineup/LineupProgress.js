import React, { useEffect, useContext, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider";

export default () => {
  const { mentionedCount } = useContext(UserPlayerContext);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    setProgressPercent(mentionedCount * 20);
  }, [mentionedCount]);

  return (
    <>
      <h3>Current lineup progress</h3>
      <ProgressBar striped variant="danger" label={`${mentionedCount}/5`} now={progressPercent} />
    </>
  );
};
