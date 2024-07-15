import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "components/ui/chart";
import { LabelList, Pie, PieChart } from "recharts";
import { getChartConfig, getChartData } from "./utils";
import { toCapitalizeWords } from "utils/general";
import { useStatisticData } from "./Providers/StatisticProvider";
import StatisticNavigation from "./S_Navigation";

export default function StatisticChart() {
  const { data } = useStatisticData();
  const chartData = getChartData(data);
  const chartConfig = getChartConfig(data);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex flex-col items-center pb-0">
          <CardTitle>Statistik keuangan</CardTitle>
          <CardDescription>Bulan Juni</CardDescription>
        </div>
        <StatisticNavigation />
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              formatter={(value, name) => {
                const capitalName = toCapitalizeWords(name as string);
                return `${capitalName} : ${value}%`;
              }}
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Pie
              data={chartData}
              label={false}
              dataKey="percent"
              nameKey="name"
              stroke="0"
            >
              <LabelList
                dataKey="percent"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
