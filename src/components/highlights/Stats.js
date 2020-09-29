import React, { useState, useEffect } from "react";

export default (props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`http://data.nba.net/prod/v1/2019/players/${props.id}_profile.json`)
      .then((res) => res.json())
      .then((result) => {
        setData(result.league.standard.stats);
      });
  }, []);
    
    useEffect(() => {
       console.log(data) 
    }, [data])


  return (
    <article>
      <h2>YAR</h2>
    </article>
  );
};
