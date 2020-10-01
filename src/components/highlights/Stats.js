import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

export default (props) => {
  const [data, setData] = useState({});
  const [careerStats, setCareerStats] = useState({});
  const [latestStats, setLatestStats] = useState({});

  useEffect(() => {
    fetch(`http://data.nba.net/prod/v1/2019/players/${props.id}_profile.json`)
      .then((res) => res.json())
        .then((result) => {
            if (result.league) {
                setData(result.league.standard.stats);
            } 
      }
    );
  }, []);

  useEffect(() => {
    setCareerStats(data.careerSummary || {});
  }, [data]);

  useEffect(() => {
    setLatestStats(data.latest || {});
  }, [data]);

  return (
    <Table>
      <thead>
        <tr>
          <th>Per Game Stats</th>
          <th>Points</th>
          <th>Assists</th>
          <th>Steals</th>
          <th>Blocks</th>
          <th>Rebounds</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>All-time:</td>
          <td>{careerStats.ppg}</td>
          <td>{careerStats.apg}</td>
          <td>{careerStats.spg}</td>
          <td>{careerStats.bpg}</td>
          <td>{careerStats.rpg}</td>
        </tr>
        <tr>
          <td>Latest season:</td>
          <td>{latestStats.ppg}</td>
          <td>{latestStats.apg}</td>
          <td>{latestStats.spg}</td>
          <td>{latestStats.bpg}</td>
          <td>{latestStats.rpg}</td>
        </tr>
      </tbody>
    </Table>
  );
};
