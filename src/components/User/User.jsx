import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { signout } from "../../auth/auth";
import NavBar from "../NavBar/NavBar";
import "./User.css";

function User() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  function signoutHandler() {
    signout(navigate("/"));
  }
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("jwt"));
    if (!userDetails) {
      navigate("/signin");
    } else {
      const userName = JSON.stringify(userDetails.user.fname);
      setUser(JSON.parse(userName));
    }
  }, []);
  return (
    <div>
      <NavBar />
      <div className="welcome-container">
        <h1 className="welcome-text">Hello, {user}👋</h1>
        <button className="signout-btn" onClick={signoutHandler}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default User;
