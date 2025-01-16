import React, { useState, useEffect } from "react";  // Import useState and useEffect
import { useNavigate, Link } from "react-router-dom"; // Import Link here along with useNavigate
import "./Login.css";

// Define API_URL (replace with actual URL or import it if defined elsewhere)
const API_URL = "http://your-api-url.com"; // Replace this with your actual API URL

const Login = () => {
  const [password, setPassword] = useState(""); // State for password
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [email, setEmail] = useState(""); // State for email
  const [showerr, setShowerr] = useState(""); // State for error messages

  const validateEmail = function (email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    // Show an alert if the email is not valid
    if (!emailPattern.test(email)) {
      window.alert("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const togglePasswordVisibility = function () {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  const login = async () => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const json = await res.json();
    
    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("email", email);
      navigate("/");
      window.location.reload();
    } else {
      if (json.errors) {
        for (const error of json.errors) {
          setShowerr(error.msg);
        }
      } else {
        // Handle incorrect password or authentication error
        if (json.error === "Invalid credentials") {
          window.alert("Incorrect email or password. Please try again.");
        } else {
          setShowerr(json.error);
        }
      }
    }
  };

  const submitHandler = function (e) {
    e.preventDefault();

    // Validate email
    if (!validateEmail(email)) {
      return; // If email is invalid, stop the form submission
    }

    // Password validation
    if (!password) {
      window.alert("Password cannot be empty");
      return; // Stop submission if password is empty 
    }

    login();
  };

  return (
    <div className="login-container">
      <div className="login-grid">
        <div className="login-text">
          <h2>Login</h2>
        </div>
        <div className="login-text1">
          Are you a new member?{" "}
          <span>
            <Link to="/signup" style={{ color: "#2190ff" }}>
              Sign Up Here
            </Link>
          </span>
        </div>
        <br />
        <div className="login-form">
          <form onSubmit={submitHandler}>
            <div className="login-form-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="login-form-control"
                placeholder="Enter your email"
                aria-describedby="helpId"
                required
              />
              {showerr && <div className="err">{showerr}</div>}
            </div>
            <div className="login-form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  minLength="8"
                  required
                  className="login-form-control"
                  placeholder="Enter your password"
                  aria-describedby="helpId"
                />
                <span
                  className="password-icon"
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
              <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">
                Login
              </button>
            </div>

            <div className="btn-subgroup">
              <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">
                Reset
              </button>
            </div>
            <br />
            <div className="login-text">Forgot Password?</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
