import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page container py-5">
      <div className="row align-items-center gy-4">
        <div className="col-lg-6">
          <div className="hero-content p-4 p-lg-5 rounded-4 shadow-sm bg-white">
            <span className="badge bg-primary mb-3">Student Grade Management</span>
            <h1 className="display-5 fw-bold">Manage students, courses and grades with confidence.</h1>
            <p className="lead text-muted mb-4">
              A clean, modern interface for tracking student records, course information and grade performance in one place.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <Link to="/login" className="btn btn-primary btn-lg">
                Get Started
              </Link>
              <Link to="/register" className="btn btn-outline-primary btn-lg">
                Create Account
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="hero-card p-4 rounded-4 shadow-sm bg-light">
            <h2 className="h4 mb-3">What you can do</h2>
            <ul className="list-unstyled text-muted lh-lg">
              <li>✔ Add, view and update student profiles.</li>
              <li>✔ Define courses and calculate GPA automatically.</li>
              <li>✔ Manage grades, search students, and generate reports.</li>
              <li>✔ Responsive dashboard built with React and Bootstrap.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row mt-5 g-4">
        <div className="col-md-4">
          <div className="feature-card p-4 rounded-4 shadow-sm bg-white h-100">
            <h3>Easy workflows</h3>
            <p className="text-muted mb-0">Add students, courses, and grades without clutter. The interface is built for fast, intuitive management.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature-card p-4 rounded-4 shadow-sm bg-white h-100">
            <h3>Secure access</h3>
            <p className="text-muted mb-0">Simple login authentication keeps your dashboard private and ready for your admin use.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature-card p-4 rounded-4 shadow-sm bg-white h-100">
            <h3>Designed for clarity</h3>
            <p className="text-muted mb-0">A lightweight layout with responsive forms and data tables for a modern website feel.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
