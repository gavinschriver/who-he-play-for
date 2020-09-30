import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

export default (props) => {
  const [data, setData] = useState({});
  const [careerStats, setCareerStats] = useState({});

  useEffect(() => {
    fetch(`http://data.nba.net/prod/v1/2019/players/${props.id}_profile.json`)
      .then((res) => res.json())
      .then((result) => {
        setData(result.league.standard.stats);
      });
  }, []);

  useEffect(() => {
    setCareerStats(data.careerSummary || {});
  }, [data]);
    
    console.log(careerStats)

  return (
    <Table>
      <thead>
        <tr>
          <th>Stat sample</th>
          <th>Points per Game</th>
          <th>Assists per Game</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>All-time</td>
          <td>{careerStats.ppg}</td>
          <td>EVEN MORE</td>
        </tr>
      </tbody>
    </Table>
  );
};
