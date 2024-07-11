import { ChartConfig } from "components/ui/chart";
import { ChartData } from "~/@types/Statistic";

export function getChartConfig(data: ChartData[]) {
  const config = data.reduce((acc, d) => {
    acc[d.name.toLowerCase()] = {
      label: d.name,
      color: d.color,
    };
    return acc;
  }, {} as ChartConfig) satisfies ChartConfig;

  return config;
}

export function getChartData(data: ChartData[]) {
  return data.map((d) => {
    const chart: ChartData = {
      name: d.name.toLowerCase(),
      percent: d.percent,
      fill: d.color,
    };

    return chart;
  });
}
