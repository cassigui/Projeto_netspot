import './components/CrudComponent.css';
import './components/ResultadoComponent.css';
import Crud from "./components/CrudComponent";
import Local from './components/LocalComponent';
import Navbar from './components/NavbarComponent';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Local />} />
          <Route path="/locais" element={<Local />} />
          <Route path="/medicoes" element={<Crud />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App