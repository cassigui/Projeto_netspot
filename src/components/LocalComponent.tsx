import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para navegação
import "./LocalComponent.css";

function Local() {
  const initialFormState = {
    local: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [locais, setLocais] = useState<{ id: number; local: string; dateTime: string }[]>([]);
  const navigate = useNavigate(); // Usado para navegação programática

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedData = localStorage.getItem("locais");
    const locaisArray = storedData ? JSON.parse(storedData) : [];
    const newId = locaisArray.length + 1;
    const newEntry = {
      id: newId,
      local: formData.local,
      dateTime: getCurrentDateTime(),
    };
    locaisArray.push(newEntry);
    localStorage.setItem("locais", JSON.stringify(locaisArray));
    setLocais(locaisArray);
    setFormData(initialFormState);
  };

  const handleViewMedicoes = (localId: number) => {
    // Usar a navegação para a página de medições
    navigate(`/medicoes/${localId}`);
  };

  const handleRemoveLocal = (localId: number) => {
    // Filtra o local removido e atualiza o localStorage
    const updatedLocais = locais.filter((entry) => entry.id !== localId);
    localStorage.setItem("locais", JSON.stringify(updatedLocais));
    setLocais(updatedLocais); // Atualiza o estado para refletir a remoção
  };

  useEffect(() => {
    const storedData = localStorage.getItem("locais");
    if (storedData) {
      setLocais(JSON.parse(storedData));
    }
  }, []);

  return (
    <section className="bg-light p-4 rounded">
      <div className="container">
        <h1 className="mb-4">Cadastro de Local</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="local" className="form-label">Local:</label>
            <input
              type="text"
              id="local"
              name="local"
              className="form-control"
              placeholder="Digite o local"
              value={formData.local}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Cadastrar</button>
        </form>

        <div className="mt-5">
          <h2>Locais Cadastrados</h2>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Local</th>
                  <th>Data e Hora</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                {locais.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.id}</td>
                    <td>{entry.local}</td>
                    <td>{entry.dateTime}</td>
                    <td>
                      <button
                        className="btn btn-primary me-2 fw-bold text-light"
                        onClick={() => handleViewMedicoes(entry.id)}
                      >
                        Ver Medições
                      </button>
                      <button
                        className="btn btn-danger fw-bold text-light"
                        onClick={() => handleRemoveLocal(entry.id)}
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Local;
