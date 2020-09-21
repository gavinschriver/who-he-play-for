import React from "react"
import { Link, Route } from "react-router-dom"
import "./NavBar.css"
import { LogoutButton } from "../header/LogoutButton"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li>
            <Route render={(props) => <LogoutButton {...props} />}></Route>
            </li>
        </ul>
    )
}