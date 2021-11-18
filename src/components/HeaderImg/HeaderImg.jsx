import React from "react";
import headerImg from "../../images/Update.png";
import "./HeaderImg.css";
import {Link} from "react-router-dom"

function HeaderImg() {
  return (
    <div className="img-container">
      <img className="header-img" src={headerImg} alt="" />
      <h1 className="header-copy">A website for everytime <a className="github-profile-link" href="https://github.com/thegeorgenikhil">you</a> forget the auth code</h1>
      <div className="btn-container">
          <Link className="btn btn-signup" to="/signup">Sign Up</Link>
          <Link className="btn btn-signin" to="/signin">Sign In</Link>
      </div>
    </div>
  );
}

export default HeaderImg;
