import React from "react"
import { Link, Route } from "react-router-dom"
import "./NavBar.css"
import { LogoutButton } from "../header/LogoutButton"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li> 
                <Link className="navbar__item" to="/"> Home </Link>
            </li>
            <li> 
                <Link className="navbar__item" to="/account"> Your account </Link>
            </li>
            <li>
                <Link className="navbar_item" to="/logout">Log Out</Link>
            </li>
            <LogoutButton />

        </ul>
    )
}