import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import "./NavBar.css";
import { LogoutButton } from "../header/LogoutButton";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

export const NavBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">
          WHO HE PLAY FOR
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <Link className="navbar__item" to="/">
                Home
              </Link>
            </NavItem>

            <NavItem>
              <Link className="navbar__item" to="/account">
                Your account
              </Link>
            </NavItem>
            <NavItem>
              <LogoutButton location="navbar" />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

// return (

//             <NavLink href="/home">profile page</NavLink>
//           </NavItem>
//           <NavItem>
//             <NavLink href="/responsibilities">responsibilities</NavLink>
//           </NavItem>
//           <NavItem>
//             <NavLink href="/archive">archive</NavLink>
//           </NavItem>
//           <NavItem>
//             <NavLink href="/logout">logout</NavLink>
//           </NavItem>
// );
