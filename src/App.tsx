// import './components/CrudComponent.css';
// import './components/ResultadoComponent.css';
import Crud from "./components/CrudComponent";
import Local from './components/LocalComponent';
import Navbar from './components/NavbarComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Resultado from "./components/ResultadoComponent";

const App = () => {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Local />} />
          <Route path="/locais" element={<Local />} />
          <Route path="/medicoes/:idLocal" element={<Crud />} />
          <Route path="/resultados" element={<Resultado />} />
        </Routes>
      </Router>
  );
};

export default App