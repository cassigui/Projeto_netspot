import { ChangeEvent, FormEvent, useState } from "react";

function Crud() {
  const initialFormState = {
    local: "",
    nivelSinal: "",
    nghz: "", // Para o rádio button na primeira linha
    interferencia: "",
    velocidadeSinal: "",
    vghz: "", // Para o rádio button na segunda linha
  };

  const [formData, setFormData] = useState(initialFormState);

  // Função para atualizar o estado de cada campo
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para manipular o envio do formulário
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();
    console.log(`Dados do formulário (${timestamp}):`, formData);
    localStorage.setItem(timestamp, JSON.stringify(formData));
    setFormData(initialFormState);

    window.dispatchEvent(new Event("atualizarTabela"));
  };

  return (
    <>
      <div className="container">
        <h1>NOVA LEITURA DE REDE</h1>

        <form action="submit" onSubmit={handleSubmit}>
          <div className="firstLine">
            <label htmlFor="local">Local:</label>
            <input
              type="text"
              id="local"
              name="local"
              placeholder="Local: "
              value={formData.local}
              onChange={handleChange}
            />

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
          {/* <button type="submit" name="enviar" id="enviar">ENVIAR</button> */}
        </form>
      </div>
    </>
  );
}

export default Crud;
