import React from "react"

export default (props) => {
    return (
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName={currentPlayer.player.socialMediaAccounts[0].value}
          options={{ height: 400 }}
        />
    )
}