import React, { useState } from "react";
import { Table } from "react-bootstrap";

export default ({ playerDetails }) => {

  return (
    <>
      <Table className="playerCard__details">
        <tbody>
          <tr className="playerCard__details__DOB">
            <td className="detailName">Date of Birth: </td>
            <td className="detail">{playerDetails.DOB}</td>
          </tr>

          <tr className="playerCard__details__city">
            <td className="detailName">Hailing From: </td>
            <td className="detail">{playerDetails.from}</td>
          </tr>

          <tr className="playerCard__details__height">
            <td className="detailName">Height: </td>
            <td className="detail">{playerDetails.height}</td>
          </tr>

          <tr className="playerCard__details__weight">
            <td className="detailName">Weight (rude): </td>
            <td className="detail">{playerDetails.weight} lbs.</td>
          </tr>

          <tr className="playerCard__details__primaryPosition">
            <td className="detailName">Primary Position: </td>
            <td className="detail">
              {playerDetails.position === "SG"
                ? "Shooting Guard"
                : playerDetails.position === "PG"
                ? "Point Guard"
                : playerDetails.position === "SF"
                ? "Strong Forward"
                : playerDetails.position === "C"
                ? "Center"
                : playerDetails.position === "PF"
                ? "Power Forward"
                : "Unkown (Positionless BBall amirite?)"}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
