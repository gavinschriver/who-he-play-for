import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { WhoHePlayFor } from "./components/WhoHePlayFor.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <WhoHePlayFor />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)