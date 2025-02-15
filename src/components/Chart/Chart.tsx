import { useState, FC } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);
import "./Chart.css";
import { CHART_COLORS } from "./Chart.const ";
import { TChartProps, TChartState, TChartDict } from "./Chart.type";

export const Chart: FC<TChartProps> = ({ routeList, setPlacemark }) => {
  const [chartState, setChartState] = useState<TChartState>({
    alt: false,
    direction: true,
    fuel1: false,
    ignition: false,
    speed: false,
    voltage: false,
  });
  const chartDict: TChartDict = {};

  routeList.route.forEach((item) => {
    Object.entries(item.reserve).forEach(([key, value]) =>
      !chartDict[key] ? (chartDict[key] = []) : chartDict[key].push(value)
    );
  });

  const lineChartData = {
    labels: routeList.labels,
    datasets: Object.keys(chartState).map((key) => {
      return {
        data: chartState[key as keyof typeof chartState] ? chartDict[key] : {},
        label: key,
        borderColor: CHART_COLORS[key],
        fill: true,
        lineTension: 0,
      };
    }),
  };

  return (
    <div className="chartContainer">
      <div className="titleContainer">
        <h2 className="title">График: hino е644сн763</h2>
        <ul className="checkboxContainer">
          {Object.entries(chartState).map(([key, value]) => {
            return (
              <li className="checkboxLabel" key={key}>
                <label>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => {
                      chartState[key as keyof typeof chartState] =
                        e.target.checked;
                      setChartState({ ...chartState });
                    }}
                  />
                </label>
                {key}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="lineContainer">
        <Line
          width={1200}
          height={250}
          options={{
            plugins: { legend: { display: false } },
            onClick: (e, elements) =>
              setPlacemark(routeList.latlon[elements[0].index]),
          }}
          data={lineChartData}
          className="line"
        />
      </div>
    </div>
  );
};
