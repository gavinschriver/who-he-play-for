import React from "react";
import { LineupButton } from "../buttons/LineupButton";

export const Score = ({ SO, parent }) => {

  const currentUserId = parseInt(localStorage.getItem("whpf_user"));

  return (
    <tr className="score">
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
