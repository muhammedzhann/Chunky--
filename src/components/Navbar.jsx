import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../style/Navbar.css';

const Navbar = () => {
    const state = useSelector(state => state.handleCart);
    const [userName, setUserName] = useState("");

    // Получение имени пользователя из localStorage
    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        if (storedName) {
            setUserName(storedName);
        }
    }, []);

    // Обработчик выхода
    const handleLogout = () => {
        localStorage.removeItem("userName"); // Удаляем имя пользователя из localStorage
        setUserName(""); // Сбрасываем состояние имени пользователя
    };

    return (
        <nav className="navbar sticky-top">
            <div className="container">
                {/* Логотип */}
                <a className="navbar-brand" href="/#home">Chunky</a>
                

                {/* Меню */}
                <ul className="navbar-links">
                    <li>
                    <NavLink className="nav-item" to="/">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <a className="nav-item" href="#products">Products</a>
                    </li>
                    <li>
                        <a  className="nav-item" href="#about">About</a>
                    </li>
                    <li>
                        <NavLink className="nav-item" to="/contact">
                            Contact
                        </NavLink>
                    </li>
                </ul>

                {/* Кнопки */}
                <div className="navbar-buttons">
                    {userName ? (
                        <>
                            <span className="navbar-user">
                                <NavLink to="/admin" className="nav-link">
                                    <i className="fa fa-user-circle profile-icon"></i> {userName}
                                </NavLink>
                            </span>
                            <button className="btn btn-dark logout-btn" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <NavLink to="/register" className="btn">
                            <i className="fa fa-user-plus"></i> Register
                        </NavLink>
                    )}
                    <NavLink to="/cart" className="btn">
                        <i className="fa fa-cart-shopping"></i> Cart ({state.length})
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
