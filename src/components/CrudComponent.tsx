import { FormEvent, useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importar o hook useParams
import "./CrudComponent.css";

function Crud() {
  const initialFormState = {
    local: "",
    nivelSinal: "",
    nghz: "",
    interferencia: "",
    velocidadeSinal: "",
    vghz: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [medicoes, setMedicoes] = useState<
    {
      id: number;
      local: string;
      nivelSinal: string;
      nghz: string;
      interferencia: string;
      velocidadeSinal: string;
      // vghz: string;
      dateTime: string;
    }[]
  >([]);
  const [locais, setLocais] = useState<
    { id: number; local: string; dateTime: string }[]
  >([]);

  const { idLocal } = useParams<{ idLocal: string }>(); // Captura o ID da URL

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

    const storedData = localStorage.getItem("medicoes");
    const medicoesArray = storedData ? JSON.parse(storedData) : [];
    const newId = medicoesArray.length + 1;
    const newEntry = {
      id: newId,
      local: formData.local,
      nivelSinal: formData.nivelSinal,
      nghz: formData.nghz,
      interferencia: formData.interferencia,
      velocidadeSinal: formData.velocidadeSinal,
      vghz: formData.vghz,
      dateTime: getCurrentDateTime(),
    };
    medicoesArray.push(newEntry);
    localStorage.setItem("medicoes", JSON.stringify(medicoesArray));
    setMedicoes(medicoesArray);
    // setFormData(initialFormState);
    setFormData((prevData) => ({
      ...initialFormState, // Limpa os outros campos
      local: prevData.local, // Preserva o valor do campo local
    }));

    window.dispatchEvent(new Event("atualizarTabela"));
  };

  const handleRemoveLocal = (idMedicao: number) => {
    const updatedMedicoes = medicoes.filter((entry) => entry.id !== idMedicao);
    localStorage.setItem("medicoes", JSON.stringify(updatedMedicoes));
    setMedicoes(updatedMedicoes);
  };

  useEffect(() => {
    const locaisSalvos = localStorage.getItem("locais");
    if (locaisSalvos) {
      setLocais(JSON.parse(locaisSalvos));
    }

    const medicoesSalvas = localStorage.getItem("medicoes");
    if (medicoesSalvas) {
      setMedicoes(JSON.parse(medicoesSalvas));
    }

    if (idLocal) {
      const locaisList = JSON.parse(locaisSalvos || "[]");
      const foundLocal = locaisList.find(
        (local: { id: number }) => local.id === parseInt(idLocal, 10)
      );

      if (foundLocal) {
        setFormData((prevData) => ({
          ...prevData,
          local: foundLocal.local,
        }));
      }
    }
  }, []);

  return (
    <>
      <section className="bg-light p-4 rounded">
        <div className="container mt-4">
          <h1 className="mb-4">NOVA LEITURA DE REDE</h1>

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="local" className="form-label">
                  Local:
                </label>
                <input
                  type="text"
                  id="local"
                  name="local"
                  className="form-control"
                  value={formData.local}
                  onChange={handleChange}
                  placeholder="Local"
                  disabled
                  required
                ></input>
              </div>

              <div className="col-md-6 d-flex align-items-center">
                <div className="col-6">
                  <label htmlFor="nivelSinal" className="form-label">
                    Nível de Sinal:
                  </label>
                  <input
                    type="text"
                    id="nivelSinal"
                    name="nivelSinal"
                    className="form-control"
                    placeholder="Nível do Sinal"
                    value={formData.nivelSinal}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-6">
                  <div className="row align-items-center ps-2 p-0 m-0">
                    <label htmlFor="nghz1" className="form-label">
                      Frequência:
                    </label>

                    <div className="col-6 p-0 m-0">
                      <input
                        type="radio"
                        id="nghz1"
                        className="form-check-input"
                        name="nghz"
                        value="2.4ghz"
                        checked={formData.nghz === "2.4ghz"}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="nghz1" className="form-check-label">
                        2.4ghz
                      </label>
                    </div>

                    <div className="form-check col-6">
                      <input
                        type="radio"
                        id="nghz2"
                        className="form-check-input"
                        name="nghz"
                        value="5.0ghz"
                        checked={formData.nghz === "5.0ghz"}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="nghz2" className="form-check-label">
                        5.0ghz
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="interferencia" className="form-label">
                  Interferência:
                </label>
                <input
                  type="text"
                  id="interferencia"
                  name="interferencia"
                  className="form-control"
                  placeholder="Interferência"
                  value={formData.interferencia}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 d-flex align-items-center">
                <div className="col-md-6">
                  <label htmlFor="velocidadeSinal" className="form-label">
                    Velocidade do Sinal:
                  </label>
                  <input
                    type="text"
                    id="velocidadeSinal"
                    name="velocidadeSinal"
                    className="form-control"
                    placeholder="Velocidade do Sinal"
                    value={formData.velocidadeSinal}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* <div className="col-6">
                  <div className="row align-items-center ps-2 p-0 m-0">
                    <label htmlFor="vghz1" className="form-label">
                      Frequência:
                    </label>

                    <div className="col-6 p-0 m-0">
                      <input
                        type="radio"
                        id="vghz1"
                        className="form-check-input"
                        name="vghz"
                        value="2.4ghz"
                        checked={formData.vghz === "2.4ghz"}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="vghz1" className="form-check-label">
                        2.4ghz
                      </label>
                    </div>

                    <div className="form-check col-6">
                      <input
                        type="radio"
                        id="vghz2"
                        className="form-check-input"
                        name="vghz"
                        value="5.0ghz"
                        checked={formData.vghz === "5.0ghz"}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="vghz2" className="form-check-label">
                        5.0ghz
                      </label>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              ENVIAR
            </button>
          </form>
        </div>
        <div className="container mt-4">
          <h2 className="mb-4">Medições</h2>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Local</th>
                  <th>Data e Hora</th>
                  <th>Nível de Sinal</th>
                  <th>Frequência</th>
                  <th>Interferência</th>
                  <th>Velocidade do Sinal</th>
                </tr>
              </thead>
              <tbody>
                {medicoes
                  .filter((entry) => entry.local === formData.local)
                  .map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.local}</td>
                      <td>{entry.dateTime}</td>
                      <td>{entry.nivelSinal}</td>
                      <td>{entry.nghz}</td>
                      <td>{entry.interferencia}</td>
                      <td>{entry.velocidadeSinal}</td>
                      <td>                      <button
                        className="btn btn-danger fw-bold text-light"
                        onClick={() => handleRemoveLocal(entry.id)}
                      >
                        Remover
                      </button></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default Crud;
