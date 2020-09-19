import React from "react"

export const UserGreeting = ({ user }) => {
    return (
        <h2>Welcome, {user.name}</h2>
    )
}