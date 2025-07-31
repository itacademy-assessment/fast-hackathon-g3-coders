import { NavLink } from "react-router-dom";
import "./Header.css";

export const Header = () => {
    return (
        <header>
            <nav className={`navbar navbar-dark custom-navbar`}>
                <div className="container-fluid">
                    <div className="navbar-brand custom-navbar-brand">
                        GRUPO 3
                    </div>
                    <button
                        className="navbar-toggler custom-navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto gap-2 align-items-center m-3">
                            <li className="nav-item">
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `nav-link custom-nav-link ${
                                            isActive ? "active" : ""
                                        }`
                                    }
                                >
                                    ABOUT
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) =>
                                        `nav-link custom-nav-link ${
                                            isActive ? "active" : ""
                                        }`
                                    }
                                >
                                    PROFILE
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        `nav-link custom-nav-link ${
                                            isActive ? "active" : ""
                                        }`
                                    }
                                >
                                    LOGIN
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};
