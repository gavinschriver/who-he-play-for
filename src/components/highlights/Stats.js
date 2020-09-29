import React, { useState, useEffect } from "react";

export default (props) => {
  const [playerId, setPlayerId] = useState(0);
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`http://data.nba.net/prod/v1/2019/players/201935_profile.json`)
      .then((res) => res.json())
      .then((result) => {
        setData(result.league.standard.stats);
        // console.log(result.league.standard.stats);
      });
  }, [playerId]);

  useEffect(() => {
    setPlayerId(props.Id);
  }, []);

    const playerData = data || {};
    
    console.log(playerData)

  return (
    <article>
      <h2></h2>
    </article>
  );
};
