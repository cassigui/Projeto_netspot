import { LineChart } from "@mui/x-charts/LineChart";
import { useState, useEffect } from "react";


function GraficoVelocidadeLocal({local,medicoes,}: {local: string; medicoes: any[];
}) {
  const [dadosFiltrados, setDadosFiltrados] = useState<{
    xAxis: Date[];
    yAxis: number[];
  }>({ xAxis: [], yAxis: [] });

  useEffect(() => {
    if (medicoes.length > 0 && local) {
      const filtradas = medicoes.filter((medicao) => medicao.local === local);

      const xAxis = filtradas.map((medicao) => {
        const [date, time] = medicao.dateTime.split(" ");
        const [day, month, year] = date.split("/");
        const [hours, minutes, seconds] = time.split(":");
        return new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
          parseInt(hours),
          parseInt(minutes),
          parseInt(seconds)
        );
      });

      const yAxis = filtradas.map((medicao) =>
        parseFloat(medicao.velocidadeSinal)
      );

      console.log("Eixo X após conversão:", xAxis);
      console.log("Eixo Y após conversão:", yAxis);

      setDadosFiltrados({ xAxis, yAxis });
    }
  }, [medicoes, local]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Velocidade por Data e Hora - {local}</h1>
      <LineChart
        xAxis={[
          {
            data: dadosFiltrados.xAxis,
            scaleType: "time", // Para tratar como valores temporais
            label: "Data e Hora",
          },
        ]}
        series={[
          {
            data: dadosFiltrados.yAxis,
            label: "Velocidade do Sinal",
            area: true,
          },
        ]}
        width={1000}
        height={350}
      />
    </div>
  );
}

export default GraficoVelocidadeLocal;
