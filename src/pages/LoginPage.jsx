import { setToken } from "../actions/authActions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "/public/assets/pages/RegisterPage.scss";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Form Submitted", formData);

      try {
        const response = await fetch(
          "https://testcandidate.linkedinindonesia.com/api/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data.data.access_token);
          const token = data.data.access_token.slice(3);
          console.log(token);
          dispatch(setToken({ token }));

          navigate("/user");
        } else {
          throw new Error("Failed to login");
        }
      } catch (err) {
        console.error("Error during login:", err);
      }
    }
  };

  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  return (
    <div className="wrapper">
      <div className="signup-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="first-group">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={!isFormValid}
          >
            Login
          </button>
        </form>

        <p className="login-text">
          Don't Have Any Account? <a href="/register">Register</a>
        </p>

        <div className="divider">Or</div>

        <button className="google-login">
          <span className="google-icon">G</span> Login with Google
        </button>
      </div>
    </div>
  );
}
