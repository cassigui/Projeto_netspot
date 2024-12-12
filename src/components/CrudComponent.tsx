import { FormEvent, useState, useEffect } from "react";
import './CrudComponent.css'

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
  const [locais, setLocais] = useState<
    { id: string; local: string; dateTime: string }[]
  >([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();
    console.log(`Dados do formulário (${timestamp}):`, formData);
    localStorage.setItem(timestamp, JSON.stringify(formData));
    setFormData(initialFormState);

    window.dispatchEvent(new Event("atualizarTabela"));
  };

  useEffect(() => {
    const locaisSalvos = localStorage.getItem("locais");
    if (locaisSalvos) {
      setLocais(JSON.parse(locaisSalvos));
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
                <label htmlFor="local" className="form-label">Local:</label>
                <select
                  id="local"
                  name="local"
                  className="form-select"
                  value={formData.local}
                  onChange={handleChange}
                >
                  <option value="">Selecione um local</option>
                  {locais.map((local) => (
                    <option key={local.id} value={local.local}>
                      {local.local}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 d-flex align-items-center">

                <div className="col-6">
                  <label htmlFor="nivelSinal" className="form-label">Nível de Sinal:</label>
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
                    <label htmlFor="nghz1" className="form-label">Frequência:</label>

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
                      <label htmlFor="nghz1" className="form-check-label">2.4ghz</label>
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
                      <label htmlFor="nghz2" className="form-check-label">5.0ghz</label>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="interferencia" className="form-label">Interferência:</label>
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
                  <label htmlFor="velocidadeSinal" className="form-label">Velocidade do Sinal:</label>
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

                <div className="col-6">
                  <div className="row align-items-center ps-2 p-0 m-0">
                    <label htmlFor="vghz1" className="form-label">Frequência:</label>

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
                      <label htmlFor="vghz1" className="form-check-label">2.4ghz</label>
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
                      <label htmlFor="vghz2" className="form-check-label">5.0ghz</label>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">ENVIAR</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Crud;
