import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BsCloudUploadFill,
  BsFilePdfFill,
  BsTrash,
} from "react-icons/bs";

function ResumeUpload() {
  const fileInput = useRef(null);
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // =========================
  // SELECT FILE
  // =========================
  const handleFile = (selectedFile) => {
    if (!selectedFile) {
      return;
    }

    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.toLowerCase().endsWith(".pdf")
    ) {
      alert("Please upload PDF only.");
      return;
    }

    setFile(selectedFile);
  };

  // =========================
  // DRAG & DROP
  // =========================
  const handleDrop = (e) => {
    e.preventDefault();

    const selectedFile = e.dataTransfer.files[0];

    handleFile(selectedFile);
  };

  // =========================
  // UPLOAD & ANALYZE RESUME
  // =========================
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume first.");
      return;
    }

    const token = localStorage.getItem("token");

    console.log("========== RESUME ANALYSIS ==========");
    console.log("JWT Token:", token);
    console.log("Selected File:", file.name);

    // =========================
    // LOGIN CHECK
    // =========================
    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      // =========================
      // CREATE FORM DATA
      // =========================
      const formData = new FormData();

      formData.append("file", file);

      console.log("Uploading file:", file.name);
      console.log(
        "API URL:",
        "http://localhost:8080/api/resume/upload"
      );

      // =========================
      // API REQUEST
      // =========================
      const response = await axios.post(
        "http://localhost:8080/api/resume/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },

          // AI response can take some time
          timeout: 600000,
        }
      );

      console.log("========== ANALYSIS SUCCESS ==========");
      console.log("Status:", response.status);
      console.log("Response:", response.data);

      // =========================
      // CHECK RESPONSE
      // =========================
      if (response.data && response.data.success) {
        console.log(
          "Analysis Data:",
          response.data.data
        );

        alert(
          response.data.message ||
            "Resume analyzed successfully."
        );

        // =========================
        // SEND AI RESPONSE
        // TO ANALYSIS PAGE
        // =========================
        navigate("/analysis", {
          state: {
            analysis: response.data.data,
          },
        });
      } else {
        alert(
          response.data?.message ||
            "Resume analysis failed."
        );
      }
    } catch (error) {
      console.error("========== ANALYSIS ERROR ==========");
      console.error(error);

      // =========================
      // SERVER RESPONSE ERROR
      // =========================
      if (error.response) {
        console.log(
          "Status:",
          error.response.status
        );

        console.log(
          "Response:",
          error.response.data
        );

        const status = error.response.status;
        const data = error.response.data;

        // 401
        if (status === 401) {
          alert(
            "Session expired. Please login again."
          );

          localStorage.removeItem("token");
          localStorage.removeItem("email");
          localStorage.removeItem("fullName");

          navigate("/login");
        }

        // 403
        else if (status === 403) {
          alert(
            "403 Forbidden: You are not authorized."
          );
        }

        // 400
        else if (status === 400) {
          alert(
            data?.message ||
              "Invalid resume file."
          );
        }

        // 413
        else if (status === 413) {
          alert(
            "Resume file is too large."
          );
        }

        // 500
        else if (status === 500) {
          alert(
            data?.message ||
              "Server error while analyzing resume."
          );
        }

        // Other HTTP errors
        else {
          alert(
            data?.message ||
              `Upload failed. Status: ${status}`
          );
        }
      }

      // =========================
      // NO RESPONSE FROM SERVER
      // =========================
      else if (error.request) {
        console.error(
          "No response received from backend."
        );

        alert(
          "Backend server is not responding. Please check Spring Boot."
        );
      }

      // =========================
      // REQUEST ERROR
      // =========================
      else {
        console.error(
          "Request Error:",
          error.message
        );

        alert(
          "Something went wrong while uploading the resume."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // REMOVE FILE
  // =========================
  const handleRemoveFile = () => {
    setFile(null);

    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-8 col-md-10">

          <div className="card shadow-lg border-0 rounded-4">

            <div className="card-body p-5">

              {/* HEADER */}
              <div className="text-center mb-5">

                <h2 className="fw-bold">
                  Upload Resume
                </h2>

                <p className="text-muted mb-0">
                  Upload your resume and let AI analyze it.
                </p>

              </div>

              {/* DROP AREA */}
              <div
                className="border border-3 border-primary rounded-4 text-center p-5"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >

                <BsCloudUploadFill
                  size={70}
                  className="text-primary mb-3"
                />

                <h4 className="fw-semibold">
                  Drag & Drop Resume
                </h4>

                <p className="text-muted">
                  Upload your resume in PDF format
                </p>

                <button
                  type="button"
                  className="btn btn-primary px-4"
                  onClick={() =>
                    fileInput.current?.click()
                  }
                  disabled={loading}
                >
                  Browse File
                </button>

                <input
                  ref={fileInput}
                  type="file"
                  hidden
                  accept="application/pdf,.pdf"
                  onChange={(e) =>
                    handleFile(e.target.files[0])
                  }
                />

              </div>

              {/* SELECTED FILE */}
              {file && (
                <div className="card mt-4 border">

                  <div className="card-body d-flex justify-content-between align-items-center">

                    <div className="d-flex align-items-center">

                      <BsFilePdfFill
                        size={30}
                        className="text-danger me-3"
                      />

                      <div>

                        <strong>
                          {file.name}
                        </strong>

                        <br />

                        <small className="text-muted">
                          {(file.size / 1024).toFixed(2)} KB
                        </small>

                      </div>

                    </div>

                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleRemoveFile}
                      disabled={loading}
                    >
                      <BsTrash />
                    </button>

                  </div>

                </div>
              )}

              {/* ANALYZE BUTTON */}
              <div className="d-grid mt-4">

                <button
                  type="button"
                  className="btn btn-success btn-lg fw-semibold"
                  onClick={handleUpload}
                  disabled={loading || !file}
                >

                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>

                      Analyzing Resume...
                    </>
                  ) : (
                    "Analyze Resume"
                  )}

                </button>

              </div>

              {/* INFO */}
              <div className="alert alert-info mt-4 mb-0">

                <small>
                  <strong>Note:</strong>{" "}
                  Your resume will be uploaded securely
                  and analyzed by the AI Resume Analyzer.
                </small>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ResumeUpload;