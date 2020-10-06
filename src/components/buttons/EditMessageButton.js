import React from "react"
import { Button } from "react-bootstrap"

export const EditMessageButton = React.forwardRef((props, ref) => {
    const action = props.action
    
    return (
        <Button ref={ref} onClick={action} value={props.id}>Edit Message</Button>
    )
})