import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./SignIn.css";
import Loader from "react-loader-spinner";
import { authenticate, signin } from "../../auth/auth";

function SignIn() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
  });

  function changeHandler(e) {
    const name = e.target.name;
    setValues({ ...values, [name]: e.target.value });
  }

  function clickHandler(e) {
    e.preventDefault();
    setValues({ ...values, loading: true });
    setTimeout(() => {
      signin({ email: email, password: password })
        .then((data) => {
          if (!data.error) {
            if (data) {
              setValues({
                email: "",
                password: "",
                loading: false,
              });
              authenticate(data, () => navigate("/user"));
            }
          } else {
            setValues({
              email: "",
              password: "",
              loading: false,
            });
            alert("Wrong password");
          }
        })
        .catch((err) => alert(err));
    }, 1000);
  }
  const { email, password, loading } = values;

  return (
    <div>
      <NavBar />
      <form action="">
        <div className="form-group">
          <h1 className="onboarding-heading-text">Sign In</h1>
          <input
            name="email"
            onChange={changeHandler}
            type="email"
            placeholder="Email"
            value={email}
            autoComplete={"none"}
          />
          <input
            name="password"
            onChange={changeHandler}
            type="password"
            placeholder="Password"
            value={password}
          />
          <button className="signin-btn" type="submit" onClick={clickHandler}>
            {loading ? (
              <Loader type="TailSpin" color="#FFFFFF" height={15} width={15} />
            ) : (
              "Sign In"
            )}
          </button>
          <p className="login-redirect">
            New User? Create an account{" "}
            <Link to="/signup" className="here-link">
              here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
