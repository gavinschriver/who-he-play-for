import React from "react";
import { LineupButton } from "../buttons/LineupButton";

export const Score = ({ SO, parent, rank }) => {
  const leaderRank = rank;

  const currentUserId = parseInt(localStorage.getItem("whpf_user"));

  if (parent === "UserPopOver") {
    return <div>{SO.score}</div>;
  }

  return (
    <tr className="score" key={`scoreKey-${SO.userId}`}>
      <td>
        <div className="score_rank score-item">{leaderRank}</div>
      </td>
      <td>
        <div className="userName score_userName score-item">{SO.username}</div>
      </td>
      <td>
        <div className="score__value score-item">{SO.score}</div>
      </td>
      <td>
        <div className="score_lineupButton score-item">
          <LineupButton
            userType={SO.userId === currentUserId ? "current" : "other"}
            userId={SO.userId}
            parent={parent}
            key={`key-${SO.userId}`}
          />
        </div>
      </td>
    </tr>
  );
};
