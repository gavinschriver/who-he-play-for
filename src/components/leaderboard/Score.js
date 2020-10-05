import React from "react";
import { LineupButton } from "../buttons/LineupButton";

export const Score = ({ SO, parent, rank }) => {
  const leaderRank = rank

  const currentUserId = parseInt(localStorage.getItem("whpf_user"));

  if (parent === "UserPopOver") {
    return (<div>{SO.score}</div>)
  }

  return (
    <tr className="score">
      <td>{leaderRank}</td>
      <td>{SO.username}</td>
      <td class="score__value">{SO.score}</td>
      <td>
        <LineupButton
          userType={SO.userId === currentUserId ? "current" : "other"}
          userId={SO.userId}
          parent={parent}
        />
      </td>
    </tr>
  );
};
