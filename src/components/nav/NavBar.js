import React from "react"
import { Link, Route } from "react-router-dom"
import "./NavBar.css"
import { LogoutButton } from "../header/LogoutButton"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Lol</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/animals">Nope</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/customers">Dont Care</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/employees">Just following orders</Link>
            </li>
            <li>
            <Route render={(props) => <LogoutButton {...props} />}></Route>
            </li>
        </ul>
    )
}