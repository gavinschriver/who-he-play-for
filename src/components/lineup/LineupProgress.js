import React, { useEffect, useContext, useState } from "react"
import { ProgressBar } from "react-bootstrap"
import { UserPlayerContext } from "../usersPlayers/UsersPlayersProvider"

export default () => {
    const {mentionedCount} = useContext(UserPlayerContext)
    const [progressPercent, setProgressPercent] = useState(0)

    useEffect(() => {
        setProgressPercent(mentionedCount * 20)
        alert(mentionedCount)
    }, [mentionedCount])
    
    return (
        <ProgressBar now={progressPercent}/>
    )
}