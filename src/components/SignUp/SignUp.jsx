import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { authenticate, signup } from "../../auth/auth";
import Loader from "react-loader-spinner";

function SignUp() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    loading: false,
  });

  const navigate = useNavigate();

  const { name, email, password, loading } = values;

  function changeHandler(e) {
    const value = e.target.value;
    const name = e.target.name;
    setValues({ ...values, [name]: value });
  }

  function clickHandler(e) {
    e.preventDefault();
    setValues({ ...values, loading: true });
    if (name.length > 0 && email.length > 0 && password.length>0){
      setTimeout(() => {
        signup(values)
          .then(data => {
            if (data) {
              setValues({
                name: "",
                email: "",
                password: "",
                loading: false,
              });
              authenticate(data,() => navigate("/user"))
            }else{
              console.log("signup error");
            }
          })
          .catch((err) => alert(err));
      }, 1000);
    }else{
      alert("All fields required")
      setValues({ ...values, loading: false });
    }
  }

  return (
    <div>
      <NavBar />
      <form action="">
        <div className="form-group">
          <h1 className="onboarding-heading-text">Sign Up</h1>
          <input
            onChange={changeHandler}
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            autoComplete={"none"}
          />
          <input
            onChange={changeHandler}
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            autoComplete={"none"}
          />
          <input
            onChange={changeHandler}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
          />
          <button className="signup-btn" onClick={clickHandler}>
            {loading ? (
              <Loader type="TailSpin" color="#FFFFFF" height={15} width={15} />
            ) : (
              "Sign Up"
            )}
          </button>
          <p className="login-redirect">
            Already a user? Login{" "}
            <Link to="/signin" className="here-link">
              here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
