import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BsPersonFill,
  BsEnvelopeFill,
  BsLockFill,
  BsEye,
  BsEyeSlash,
} from "react-icons/bs";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // REGISTER USER
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Full Name validation
    if (!form.fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    // Email validation
    if (!form.email.trim()) {
      alert("Please enter your email.");
      return;
    }

    // Password validation
    if (!form.password) {
      alert("Please enter your password.");
      return;
    }

    // Confirm password validation
    if (!form.confirmPassword) {
      alert("Please confirm your password.");
      return;
    }

    // Password match
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      console.log("========== REGISTER REQUEST ==========");

      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          fullName: form.fullName,
          email: form.email,
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("========== REGISTER SUCCESS ==========");
      console.log("Status:", response.status);
      console.log("Response:", response.data);

      if (response.data.success) {
        alert("Registration Successful! Please login.");

        // Go to login page
        navigate("/login");
      } else {
        alert(
          response.data.message || "Registration failed."
        );
      }

    } catch (error) {
      console.error("========== REGISTER ERROR ==========");
      console.error(error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);

        const data = error.response.data;

        if (typeof data === "object") {

          if (data.message) {
            alert(data.message);

          } else if (data.fullName) {
            alert(data.fullName);

          } else if (data.email) {
            alert(data.email);

          } else if (data.password) {
            alert(data.password);

          } else {
            alert(
              "Registration failed. Please check your details."
            );
          }

        } else {
          alert("Registration failed.");
        }

      } else if (error.request) {

        alert(
          "Backend server is not responding. Please start Spring Boot."
        );

      } else {

        console.error("Request Error:", error.message);

        alert("Something went wrong.");

      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-primary bg-gradient">

      <div
        className="card shadow-lg border-0 rounded-4"
        style={{
          maxWidth: "500px",
          width: "100%",
        }}
      >

        <div className="card-body p-5">

          {/* HEADER */}
          <div className="text-center mb-4">

            <h2 className="fw-bold">
              Create Account 🚀
            </h2>

            <p className="text-muted">
              Join AI Resume Analyzer
            </p>

          </div>

          {/* REGISTER FORM */}
          <form onSubmit={handleSubmit}>

            {/* FULL NAME */}
            <div className="input-group mb-3">

              <span className="input-group-text">
                <BsPersonFill />
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />

            </div>

            {/* EMAIL */}
            <div className="input-group mb-3">

              <span className="input-group-text">
                <BsEnvelopeFill />
              </span>

              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />

            </div>

            {/* PASSWORD */}
            <div className="input-group mb-3">

              <span className="input-group-text">
                <BsLockFill />
              </span>

              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <BsEyeSlash />
                ) : (
                  <BsEye />
                )}
              </button>

            </div>

            {/* CONFIRM PASSWORD */}
            <div className="input-group mb-4">

              <span className="input-group-text">
                <BsLockFill />
              </span>

              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />

            </div>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="btn btn-success w-100 rounded-3 py-2 fw-semibold"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>

          </form>

          <hr />

          {/* LOGIN LINK */}
          <p className="text-center mb-0">

            Already have an account?{" "}

            <Link
              to="/login"
              className="fw-bold"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;