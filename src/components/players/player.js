import React from "react"

export const Player = ({ matchingPlayerObj }) => {
    return (
        <article>
                <div>Player Name: {matchingPlayerObj.player.firstName}</div>
                <div>
                  <img src={matchingPlayerObj.player.officialImageSrc} />
                </div>
              </article>
    )
}