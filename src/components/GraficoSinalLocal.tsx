import { BarChart } from "@mui/x-charts";
import { useState, useEffect } from "react";

function GraficoSinalLocal({
  local,
  medicoes,
}: {
  local: string;
  medicoes: any[];
}) {
  const [dadosFiltrados, setDadosFiltrados] = useState<{
    xAxis: string[];
    yAxisSinal: number[];
    yAxisInterferencia: number[];
  }>({
    xAxis: [],
    yAxisSinal: [],
    yAxisInterferencia: [],
  });

  useEffect(() => {
    if (medicoes.length > 0 && local) {
      // Filtra as medições pelo local
      const filtradas = medicoes.filter((medicao) => medicao.local === local);

      // Prepara os dados para o eixo X (Data e Hora)
      const xAxis = filtradas.map((medicao) =>
        medicao.dateTime
      );
    //   const xAxis = filtradas.map((medicao) => {
    //     const [date, time] = medicao.dateTime.split(" ");
    //     const [day, month, year] = date.split("/");
    //     const [hours, minutes, seconds] = time.split(":");
    //     return new Date(
    //       parseInt(year),
    //       parseInt(month) - 1,
    //       parseInt(day),
    //       parseInt(hours),
    //       parseInt(minutes),
    //       parseInt(seconds)
    //     );
    //   });

      // Prepara os dados para o eixo Y (Velocidade do Sinal e Interferência)
      const yAxisSinal = filtradas.map((medicao) =>
        parseFloat(medicao.nivelSinal)
      );
      const yAxisInterferencia = filtradas.map((medicao) =>
        parseFloat(medicao.interferencia)
      );

      // Atualiza o estado com os dados filtrados
      setDadosFiltrados({
        xAxis,
        yAxisSinal,
        yAxisInterferencia,
      });
    }
  }, [medicoes, local]);

  console.log(dadosFiltrados)

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Comparativo de Sinal e Interferência - {local}</h1>
      <BarChart
        xAxis={[
          {
            data: dadosFiltrados.xAxis,
            scaleType: "band", // Tratando como valores temporais
            label: "Data e Hora",
          },
        ]}
        series={[
          {
            data: dadosFiltrados.yAxisSinal,
            label: "Nível Sinal",
          },
          {
            data: dadosFiltrados.yAxisInterferencia,
            label: "Interferência",
          },
        ]}
        width={1000}
        height={350}
      />
    </div>
  );
}

export default GraficoSinalLocal;
