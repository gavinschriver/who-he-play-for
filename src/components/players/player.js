import React, { useState } from "react"

export const Player = ({ PO }) => {
    const [showHideDetails, setShowHideDetails] = useState(false)

    const handleDetailButtonClick = () => {
        if (!showHideDetails) {
            setShowHideDetails(true)
        } else setShowHideDetails(false)
    }


    return (
        <article>
                <div className="player__card">Player Name: {PO.player.firstName}</div>
                <div>
                  <img src={PO.player.officialImageSrc} />
            </div>
            <button onClick={(e) => {
                e.preventDefault()
                handleDetailButtonClick()
            }
            }>Get the juicy deets:</button>
            {
                showHideDetails
                    ? <div>DEETS</div>
                    : <div></div>
            }
              </article>
    )
}