import { FormEvent, useState, useEffect } from "react";

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
      <div className="container">
        <h1>NOVA LEITURA DE REDE</h1>

        <form action="submit" onSubmit={handleSubmit}>
          <div className="firstLine">
            <label htmlFor="local">Local:</label>
            <select id="local" name="local" value={formData.local} onChange={handleChange}>
              <option value="">Selecione um local</option>
              {locais.map((local) => (
                <option key={local.id} value={local.local}>
                  {local.local}
                </option>
              ))}
            </select>

            <label htmlFor="nivelSinal">Nível de Sinal:</label>
            <input
              type="text"
              id="nivelSinal"
              name="nivelSinal"
              placeholder="Nível do Sinal: "
              value={formData.nivelSinal}
              onChange={handleChange}
            />

            <div>
              <div className="radioContainer">
                <label htmlFor="nghz1" className="textRadio">
                  2.4ghz
                </label>
                <input
                  type="radio"
                  id="nghz1"
                  className="Lradios"
                  name="nghz"
                  value="2.4ghz"
                  checked={formData.nghz === "2.4ghz"}
                  onChange={handleChange}
                />
              </div>
              <div className="radioContainer">
                <label htmlFor="nghz2" className="textRadio">
                  5.0ghz
                </label>
                <input
                  type="radio"
                  id="nghz2"
                  className="Lradios"
                  name="nghz"
                  value="5.0ghz"
                  checked={formData.nghz === "5.0ghz"}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="secondLine">
            <label htmlFor="interferencia">Interferência:</label>
            <input
              type="text"
              id="interferencia"
              name="interferencia"
              placeholder="Interferência:"
              value={formData.interferencia}
              onChange={handleChange}
            />

            <label htmlFor="velocidadeSinal">Velocidade do Sinal:</label>
            <input
              type="text"
              id="velocidadeSinal"
              name="velocidadeSinal"
              placeholder="Velocidade do Sinal: "
              value={formData.velocidadeSinal}
              onChange={handleChange}
            />

            <div className="">
              <div className="radioContainer">
                <label htmlFor="vghz1" className="textRadio">
                  2.4ghz
                </label>
                <input
                  type="radio"
                  id="vghz1"
                  className="Lradios"
                  name="vghz"
                  value="2.4ghz"
                  checked={formData.vghz === "2.4ghz"}
                  onChange={handleChange}
                />
              </div>
              <div className="radioContainer">
                <label htmlFor="vghz2" className="textRadio">
                  5.0ghz
                </label>
                <input
                  type="radio"
                  id="vghz2"
                  className="Lradios"
                  name="vghz"
                  value="5.0ghz"
                  checked={formData.vghz === "5.0ghz"}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <input type="submit" name="enviar" id="enviar" value={"ENVIAR"} />
        </form>
      </div>
    </>
  );
}

export default Crud;
