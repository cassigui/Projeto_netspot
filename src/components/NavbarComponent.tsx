import { FC } from "react";
import { NavLink } from "react-router-dom"; // Importar o NavLink
import "./Navbar.css";

const Navbar: FC = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark fixed-top">
      <div className="container jusitfy-content-center">
        <ul className="navbar-nav ms-auto me-auto">
          <li className="nav-item">
            <NavLink
              to="/locais"
              className={({ isActive }) =>
                isActive ? "nav-link text-primary fw-bold fs-5" : "nav-link text-white fs-5"
              }
            >
              Locais
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/medicoes"
              className={({ isActive }) =>
                isActive ? "nav-link text-primary fw-bold fs-5" : "nav-link text-white fs-5"
              }
            >
              Medições
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
