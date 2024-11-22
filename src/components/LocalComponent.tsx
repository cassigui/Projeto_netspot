import { ChangeEvent, FormEvent, useState, useEffect } from "react";

function Local() {
  const initialFormState = {
    local: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [locais, setLocais] = useState<
    { id: number; local: string; dateTime: string }[]
  >([]);

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

  useEffect(() => {
    const storedData = localStorage.getItem("locais");
    if (storedData) {
      setLocais(JSON.parse(storedData));
    }
  }, []);

  return (
    <>
      <div className="container">
        <h1>Cadastro de Local</h1>
        <form onSubmit={handleSubmit}>
          <div className="firstLine">
            <label htmlFor="local">Local:</label>
            <input
              type="text"
              id="local"
              name="local"
              placeholder="Digite o local"
              value={formData.local}
              onChange={handleChange}
              required
            />
          </div>
          <input type="submit" name="enviar" id="enviar" value={"CADASTRAR"} />
        </form>
      </div>

      <h2>Locais Cadastrados</h2>
      <div className="container">
        <div className="resultados">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Local</th>
                <th>Data e Hora</th>
              </tr>
            </thead>
            <tbody>
              {locais.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.id}</td>
                  <td>{entry.local}</td>
                  <td>{entry.dateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Local;
