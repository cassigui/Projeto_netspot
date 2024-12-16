import { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

function Resultado() {
  const [medicoes, setMedicoes] = useState<
    {
      id: number;
      local: string;
      nivelSinal: string;
      nghz: string;
      interferencia: string;
      velocidadeSinal: string;
      vghz: string;
      dateTime: string;
    }[]
  >([]);
  const [locais, setLocais] = useState<
    { id: number; local: string; dateTime: string }[]
  >([]);

  useEffect(() => {
    const locaisSalvos = localStorage.getItem("locais");
    if (locaisSalvos) {
      setLocais(JSON.parse(locaisSalvos));
    }

    const medicoesSalvas = localStorage.getItem("medicoes");
    if (medicoesSalvas) {
      setMedicoes(JSON.parse(medicoesSalvas));
    }
  }, []);

  return (
    <>
    <section className="bg-light p-4 rounded">
        <div className="container mt-4">
          <h1 className="mb-4">RESULTADO ÚLTIMAS LEITURAS</h1>
        </div>
        <BarChart
        xAxis={[
          {
            id: "locais",
            data: medicoes
              .map((medicao) => medicao.local)
              .filter((v, i, a) => a.indexOf(v) === i),
            scaleType: "band",
          },
        ]}
        series={[
          {
            id: "Nivel de Sinal",
            label: "Nível de Sinal",
            data: medicoes
              .filter((medicao) =>
                !isNaN(parseFloat(medicao.nivelSinal))
              )
              .reduce<{ local: string; valor: number }[]>((acc, medicao) => {
                const index = acc.findIndex((item) => item.local === medicao.local);
                if (index === -1) {
                  acc.push({
                    local: medicao.local,
                    valor: parseFloat(medicao.nivelSinal),
                  });
                } else {
                  acc[index].valor = parseFloat(medicao.nivelSinal);
                }
                return acc;
              }, [])
              .map((item) => item.valor),
          },
          {
            id: "Interferencia",
            label: "Interferencia",
            data: medicoes
              .filter((medicao) =>
                !isNaN(parseFloat(medicao.interferencia))
              )
              .reduce<{ local: string; valor: number }[]>((acc, medicao) => {
                const index = acc.findIndex((item) => item.local === medicao.local);
                if (index === -1) {
                  acc.push({
                    local: medicao.local,
                    valor: parseFloat(medicao.interferencia),
                  });
                } else {
                  acc[index].valor = parseFloat(medicao.interferencia);
                }
                return acc;
              }, [])
              .map((item) => item.valor),
          },
        ]}
        width={500}
        height={300}
      />
      </section>
      <section className="bg-light p-4 rounded">
        <div className="container mt-4">
          <h1 className="mb-4">RESULTADOS VELOCIDADE</h1>
        </div>
        <BarChart
        xAxis={[
          {
            id: "locais",
            data: medicoes
              .map((medicao) => `${medicao.local} (${medicao.nghz || medicao.vghz})`)
              .filter((v, i, a) => a.indexOf(v) === i), // Filtra combinações únicas de local e banda
            scaleType: "band",
          },
        ]}
        series={[
          {
            id: "Velocidade do Sinal",
            label: "Velocidade do Sinal",
            data: medicoes
              .filter((medicao) =>
                !isNaN(parseFloat(medicao.velocidadeSinal))
              )
              .reduce<{ local: string; valor: number }[]>((acc, medicao) => {
                const index = acc.findIndex((item) => item.local === medicao.local);
                if (index === -1) {
                  acc.push({
                    local: medicao.local,
                    valor: parseFloat(medicao.velocidadeSinal),
                  });
                } else {
                  acc[index].valor = parseFloat(medicao.velocidadeSinal);
                }
                return acc;
              }, [])
              .map((item) => item.valor),
          },
        ]}
        width={500}
        height={300}
      />
      </section>
    </>
  );
}

export default Resultado;
