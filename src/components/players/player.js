import React from "react"

export const Player = ({ PO }) => {
    return (
        <article>
                <div>Player Name: {PO.player.firstName}</div>
                <div>
                  <img src={PO.player.officialImageSrc} />
                </div>
              </article>
    )
}