import React, { useState, useEffect } from "react";
import { Table, Alert } from "react-bootstrap";
import "./highlights.css"

export default (props) => {
  if (props.type === "player") {
    const [data, setData] = useState({});
    const [careerStats, setCareerStats] = useState({});
    const [latestStats, setLatestStats] = useState({});
    const [noObject, setNoObject] = useState(false);

    useEffect(() => {
      fetch(
        `https://data.nba.net/prod/v1/2019/players/${props.id}_profile.json`
      )
        .then((res) => res.json())
        .then((result) => {
          if (result.Message === "Object not found.") {
            setNoObject(true);
          }
          if (result.league) {
            setData(result.league.standard.stats);
          }
        });
    }, []);

    useEffect(() => {
      setCareerStats(data.careerSummary || {});
    }, [data]);

    useEffect(() => {
      setLatestStats(data.latest || {});
    }, [data]);

    // if (Object.entries(careerStats).length === 0) {
    //   console.log(careerStats, props.id);
    // }

    if (noObject) {
      if (props.tooltip) {
        return <div>Info unavailable</div>;
      }
      return <Alert variant={`danger`}>Info unavailable</Alert>;
    }

    if (props.tooltip) {
      return <div>Career Avg. Points Per Game: {careerStats.ppg}</div>;
    }

    return (
      <div className="statsTable">
        <Table striped bordered hover >
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
            {latestStats.ppg > -1 && (
              <tr>
                <td>Latest season:</td>
                <td>{latestStats.ppg}</td>
                <td>{latestStats.apg}</td>
                <td>{latestStats.spg}</td>
                <td>{latestStats.bpg}</td>
                <td>{latestStats.rpg}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
};
