import { useState } from "react";
import "/public/assets/pages/RegisterPage.scss";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();

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
          "https://testcandidate.linkedinindonesia.com/api/register",
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
          console.log("Success:", data);
          navigate("/login");
        } else {
          throw new Error("Failed to register");
        }
      } catch (err) {
        console.error("Error during registration:", err);
      }
    }
  };

  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  return (
    <div className="wrapper">
      <div className="signup-container">
        <h2>Sign Up</h2>
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
                <label>Set Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                />
              </div>
              <div className="form-group full-width">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+62xxxxxxxxxx"
                />
              </div>
            </div>

            <div className="second-group">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="signup-button"
            disabled={!isFormValid}
          >
            Sign Up
          </button>
        </form>

        <p className="login-text">
          Already Have An Account? <a href="/login">Log In</a>
        </p>

        <div className="divider">Or</div>

        <button className="google-signup">
          <span className="google-icon">G</span> Sign up with Google
        </button>
      </div>
    </div>
  );
}
