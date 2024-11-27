import { FC } from "react";
import "./Navbar.css"; // Para os estilos (opcional)

const Navbar: FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-links">
          <li>
            <a href="/locais" className="navbar-link">Locais</a>
          </li>
          <li>
            <a href="/medicoes" className="navbar-link">Medições</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
