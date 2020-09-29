import React from "react"
import { Button } from "react-bootstrap"

export const EditMessageButton = (props) => {
    const action = props.action
    

    return (
        <Button onClick={action}>EDIT DIS MESSAUGE</Button>
    )
}