import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BsEye,
  BsEyeSlash,
  BsEnvelopeFill,
  BsLockFill,
} from "react-icons/bs";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      console.log("========== LOGIN RESPONSE ==========");
      console.log(response.data);

      // ==============================
      // CHECK API RESPONSE
      // ==============================

      if (!response.data.success) {
        alert(response.data.message || "Login failed.");
        return;
      }

      const data = response.data.data;

      // ==============================
      // GET JWT TOKEN
      // ==============================

      const token = data?.token;

      console.log("JWT TOKEN RECEIVED:", token);

      if (!token) {
        alert("Login successful, but JWT token was not received.");
        return;
      }

      // ==============================
      // SAVE TOKEN
      // ==============================

      localStorage.setItem("token", token);

      if (data.email) {
        localStorage.setItem("email", data.email);
      }

      if (data.fullName) {
        localStorage.setItem("fullName", data.fullName);
      }

      // ==============================
      // VERIFY TOKEN WAS SAVED
      // ==============================

      const savedToken = localStorage.getItem("token");

      console.log("JWT TOKEN SAVED:", savedToken);

      if (!savedToken) {
        alert("Token could not be saved. Please try again.");
        return;
      }

      console.log("========== LOGIN SUCCESS ==========");

      alert("Login Successful");

      // Upload page
      navigate("/upload");

    } catch (error) {
      console.error("========== LOGIN ERROR ==========");
      console.error(error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);

        alert(
          error.response.data?.message ||
            `Login failed. Status: ${error.response.status}`
        );
      } else if (error.request) {
        alert("Backend server is not responding.");
      } else {
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
          maxWidth: "450px",
          width: "100%",
        }}
      >

        <div className="card-body p-5">

          {/* HEADER */}

          <div className="text-center mb-4">

            <h2 className="fw-bold">
              Welcome Back 👋
            </h2>

            <p className="text-muted">
              Login to AI Resume Analyzer
            </p>

          </div>


          {/* LOGIN FORM */}

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}

            <div className="input-group mb-3">

              <span className="input-group-text">
                <BsEnvelopeFill />
              </span>

              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
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
                  setShowPassword((prev) => !prev)
                }
              >
                {showPassword ? (
                  <BsEyeSlash />
                ) : (
                  <BsEye />
                )}
              </button>

            </div>


            {/* REMEMBER ME */}

            <div className="d-flex justify-content-between mb-4">

              <div className="form-check">

                <input
                  className="form-check-input"
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />

                <label className="form-check-label">
                  Remember Me
                </label>

              </div>

              <Link to="/forgot-password">
                Forgot Password?
              </Link>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-3 py-2 fw-semibold"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>


          <hr className="my-4" />


          {/* REGISTER */}

          <p className="text-center mb-0">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="fw-bold"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;