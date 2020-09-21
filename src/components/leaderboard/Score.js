import React from "react"

export const Score = ({SO}) => {
    return (
        <tr>
        <td>{SO.username}</td>
        <td>{SO.score}</td>
      </tr>
    )
}