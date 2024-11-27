import { useEffect, useState, useMemo } from "react";
import SimpleCharts from "./SimpleCharts";

function Resultado() {
  const [dadosTabela, setDadosTabela] = useState<
    Array<{
      local: string;
      nivelSinal: string;
      velocidadeSinal: string;
      interferencia: string;
    }>
  >([]);

  useEffect(() => {
    const carregarDados = () => {
      const dados = Object.keys(localStorage)
        .filter((key) => key) // Filter out null or undefined keys
        .map((key) => {
          const dado = localStorage.getItem(key);
          return dado ? JSON.parse(dado) : null;
        })
        .filter(Boolean); // Filter out null values

      setDadosTabela(dados);
    };

    carregarDados();
    // Define o listener para atualizar os dados quando o evento "atualizarTabela" for emitido
    const atualizarTabelaListener = () => carregarDados();
    window.addEventListener("atualizarTabela", atualizarTabelaListener);

    // Remove o listener quando o componente é desmontado
    return () => {
      window.removeEventListener("atualizarTabela", atualizarTabelaListener);
    };
  }, []);

  const tabelaContent = useMemo(
    () =>
      dadosTabela.map((dado, index) => (
        <tr key={index}>
          <td>{dado.local}</td>
          <td>{dado.nivelSinal}</td>
          <td>{dado.velocidadeSinal}</td>
          <td>{dado.interferencia}</td>
        </tr>
      )),
    [dadosTabela]
  );

  return (
    <div className="container">
      <div className="resultados">
        <div>
          <table>
            <thead>
              <tr>
                <th>Local</th>
                <th>Nível</th>
                <th>Velocidade</th>
                <th>Interferência</th>
              </tr>
            </thead>
            <tbody>{tabelaContent}</tbody>
          </table>
        </div>
        <div className="grafico">
          <SimpleCharts/>
        </div>
      </div>
    </div>
  );
}

export default Resultado;
