import React from "react"
import FormControl from "react-bootstrap/FormControl"

export default (props) => {
    const matchingPlayers = ['test', 'vals', 'here']

    const type = props.type
    const options = type === "stan" ? 
        matchingPlayers.map(mP => <option>{mP}</option>)
        : <option></option>
        
    return (
        <FormControl as="select">
            {options}
        </FormControl>
    )
}