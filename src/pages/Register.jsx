import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";
import "../style/Register.css";
import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  }); // Состояние формы
  const [message, setMessage] = useState(""); // Состояние для сообщений
  const [error, setError] = useState(""); // Состояние для ошибок

  // Обработчик изменения полей формы
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация пароля
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long."); // Сообщение об ошибке
      return;
    }

    try {
      const response = await axios.post(
        "https://6746985538c8741641d37ede.mockapi.io/users",
        formData
      );
      setMessage("Registration successful!"); // Сообщение об успехе
      setError(""); // Очистка ошибок
      setFormData({ name: "", email: "", password: "" }); // Очистка формы
      console.log("Response:", response.data);
    } catch (error) {
      setMessage("Error during registration. Please try again."); // Сообщение об ошибке регистрации
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Register</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="form my-3">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Сообщение об ошибке */}
              {error && <p className="text-danger">{error}</p>}
              <div className="my-3">
                <p>
                  Already has an account?{" "}
                  <Link to="/login" className="text-decoration-underline text-info">
                    Login
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Register
                </button>
              </div>
            </form>
            {/* Сообщение об успехе */}
            {message && <p className="text-success text-center mt-3">{message}</p>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
