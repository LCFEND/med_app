import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import "./Sign_Up.css";

export default function Signup() {
  const [userName, setName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userPhone, setPhone] = useState("");
  const [errorNumber, setErrorNumber] = useState("");
  const [userPassword, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showerr, setShowerr] = useState("");

  const navigate = useNavigate();

  // Email Validation Function
  const validateEmail = function (email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  // Phone Number Validation Function
  const validatePhoneNumber = function (phone) {
    const phoneNumberPattern = /d{10}/;
    // Check if the phone number is exactly 10 digits
    if (phone.length < 10) {
      setErrorNumber("Phone Number should be exactly 10 digits.");
      return false;
    }
    if (phone.length > 10) {
      setErrorNumber("Phone Number cannot be more than 10 digits.");
      return false;
    }
    // Return true if the phone number is 10 digits
    return phoneNumberPattern.test(phone);
  };

  // Password Validation Function
  const validatePassword = function (password) {
    // Check for at least 8 characters
    return password.length >= 8;
  };

  // Toggle Password Visibility
  const togglePasswordVisibility = function () {
    setShowPassword(!showPassword);
  };

  // Registration API Call
  const register = async () => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        password: userPassword,
        phone: userPhone,
      }),
    });

    const json = await response.json();
    console.log(json, "response");

    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("name", userName);
      sessionStorage.setItem("phone", userPhone);
      sessionStorage.setItem("email", userEmail);
      navigate("/"); // Redirect to home page after successful sign up
      window.location.reload();
    } else {
      if (json.errors) {
        for (const error of json.errors) {
          setShowerr(error.msg);
        }
      } else {
        setShowerr(json.error);
      }
    }
  };

  // Form Submit Handler
  const submitHandler = function (e) {
    e.preventDefault();

    // Validate Name (minimum 4 characters)
    if (userName.length < 4) {
      setShowerr("Name should have at least 4 characters.");
      return;
    }

    // Validate Email
    if (!validateEmail(userEmail)) {
      setShowerr("Please Enter a Valid Email");
      return;
    }

    // Validate Phone Number (exactly 10 digits)
    if (!validatePhoneNumber(userPhone)) {
      return; // If phone validation fails, we return here
    }

    // Validate Password (minimum length 8)
    if (!validatePassword(userPassword)) {
      setShowerr("Password should have at least 8 characters.");
      return;
    }

    // Proceed to register
    register();
  };

  // Reset Handler
  const resetHandler = function () {
    setName("");
    setEmail("");
    setPhone("");
    setErrorNumber("");
    setPassword("");
    setShowerr("");
  };

  return (
    <div className="signup-container">
      <div className="signup-grid">
        <div className="signup-text">
          <h2>Sign Up</h2>
        </div>
        <div className="signup-text1" style={{ textAlign: "left" }}>
          Already a member?{" "}
          <span>
            <Link to="/login" style={{ color: "#2190ff" }}>
              Login
            </Link>
          </span>
        </div>
        <div className="signup-form">
          <form method="POST" onSubmit={submitHandler}>
            <div className="signup-form-group">
              <label htmlFor="role">Role</label>
              <select
                name="role"
                id="role"
                defaultValue="Select role"
                required
                className="signup-form-control"
              >
                <option disabled>Select role</option>
                <option value="Doctor">Doctor</option>
                <option value="Patient">Patient</option>
              </select>
            </div>
            <div className="signup-form-group">
              <label htmlFor="name">Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={userName}
                type="text"
                name="name"
                id="name"
                minLength="4"
                required
                className="signup-form-control"
                placeholder="Enter your name"
                aria-describedby="helpId"
              />
              {showerr && <div className="err">{showerr}</div>}
            </div>
            <div className="signup-form-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={userEmail}
                type="email"
                name="email"
                required
                id="email"
                className="signup-form-control"
                placeholder="Enter your email"
                aria-describedby="helpId"
              />
              {showerr && <div className="err">{showerr}</div>}
            </div>
            <div className="signup-form-group">
              <label htmlFor="phone">Phone</label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={userPhone}
                type="tel"
                name="phone"
                id="phone"
                required
                minLength="10"
                maxLength="10"
                className="signup-form-control"
                placeholder="Enter your phone number"
                aria-describedby="helpId"
              />
              {errorNumber && <div className="err">{errorNumber}</div>}
            </div>
            <div className="signup-form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={userPassword}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  minLength="8"
                  required
                  className="signup-form-control"
                  placeholder="Enter your password"
                  aria-describedby="helpId"
                />
                <span
                  className="password-icon"
                  style={{ marginRight: "30px" }}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <i className="fa fa-eye"></i>
                  ) : (
                    <i className="fa fa-eye-slash"></i>
                  )}
                </span>
              </div>
            </div>
            <div className="btn-subgroup">
              <button
                type="submit"
                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
              >
                Sign Up
              </button>
            </div>
            <div className="btn-subgroup">
              <button
                type="reset"
                onClick={resetHandler}
                className="btn btn-danger mb-2 waves-effect waves-light"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}