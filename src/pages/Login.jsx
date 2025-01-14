import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Footer, Navbar } from "../components";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Получаем всех пользователей с сервера
            const response = await axios.get(
                "https://6746985538c8741641d37ede.mockapi.io/users"
            );
            const users = response.data;

            // Проверяем, есть ли пользователь с таким email и паролем
            const user = users.find(
                (u) => u.email === formData.email && u.password === formData.password
            );

            if (user) {
                setMessage("Login successful!");

                // Сохраняем данные пользователя в localStorage
                localStorage.setItem("userRole", user.role); // "admin" или "user"
                localStorage.setItem("userName", user.name);

                // Если это админ, перенаправляем на AdminPage
                if (user.email === "muha17@gmail.com" && user.password === "121212") {
                    localStorage.setItem("userRole", "admin");
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            } else {
                setMessage("Invalid email or password. Please try again.");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Login</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="my-3">
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
                            <div className="my-3">
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
                            <div className="my-3">
                                <p>
                                    New Here?{" "}
                                    <Link
                                        to="/register"
                                        className="text-decoration-underline text-info"
                                    >
                                        Register
                                    </Link>
                                </p>
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit">
                                    Login
                                </button>
                            </div>
                        </form>
                        {message && <p className="text-center mt-3">{message}</p>}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;
