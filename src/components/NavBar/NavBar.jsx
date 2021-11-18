import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div>
      <nav className="navbar">
        <div ><Link className="nav-brand" to="/">authRef</Link></div>
        <a className="github-link" href="/">
          View Code <i className="fab fa-github"></i>
        </a>
      </nav>
    </div>
  );
}

export default NavBar;
