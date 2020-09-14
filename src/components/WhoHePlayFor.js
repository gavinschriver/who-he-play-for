import React from "react"
import { Route } from "react-router-dom"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"
import "./WhoHePlayFor.css"

export const WhoHePlayFor = () => (
    <>
        <NavBar />
        <ApplicationViews />
    </>
)