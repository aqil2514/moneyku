// import { TrendingUp } from "lucide-react";
// import { LabelList, Pie, PieChart } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "components/ui/chart";
// import { ChartData } from "~/@types/Statistic";
// const chartData: ChartData[] = [
//   {
//     name: "Lainnya",
//     nominal: "Rp. 391.000",
//     percent: "43%",
//   },
//   {
//     name: "Hiburan",
//     nominal: "Rp. 260.581",
//     percent: "29%",
//   },
//   {
//     name: "Transportasi",
//     nominal: "Rp. 187.000",
//     percent: "21%",
//   },
//   {
//     name: "Hadiah",
//     nominal: "Rp. 50.000",
//     percent: "6%",
//   },
//   {
//     name: "Jajanan",
//     nominal: "Rp. 15.000",
//     percent: "2%",
//   },
// ];

// const chartConfig = {
//   monthlySpending: {
//     label: "Pemakaian Bulanan",
//   },
//   lainnya: {
//     label: "Lainnya",
//   },
//   hiburan: {
//     label: "Hiburan",
//   },
//   transportasi: {
//     label: "Transportasi",
//   },
//   hadiah: {
//     label: "Hadiah",
//   },
//   jajanan: {
//     label: "Jajanan",
//   },
// } satisfies ChartConfig;
// // const chartData = [
// //   { browser: "chrome", visitors: 275, nominal: 1000, fill: "var(--color-chrome)" },
// //   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
// //   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
// //   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
// //   { browser: "other", visitors: 90, fill: "var(--color-other)" },
// // ]

// // const chartConfig = {
// //   visitors: {
// //     label: "Visitors",
// //   },
// //   nominal: {
// //     label: "Nominal",
// //   },
// //   chrome: {
// //     label: "Chrome",
// //     color: "hsl(var(--chart-1))",
// //   },
// //   safari: {
// //     label: "Safari",
// //     color: "hsl(var(--chart-2))",
// //   },
// //   firefox: {
// //     label: "Firefox",
// //     color: "hsl(var(--chart-3))",
// //   },
// //   edge: {
// //     label: "Edge",
// //     color: "hsl(var(--chart-4))",
// //   },
// //   other: {
// //     label: "Other",
// //     color: "hsl(var(--chart-5))",
// //   },
// // } satisfies ChartConfig

// export default function StatisticChart() {
//   return (
//     <Card className="flex flex-col">
//       <CardHeader className="items-center pb-0">
//         <CardTitle>Pie Chart - Label List</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[250px]"
//         >
//           <PieChart>
//             <ChartTooltip
//               content={
//                 <ChartTooltipContent nameKey="name" />
//               }
//             />
//             <Pie data={chartData} dataKey="percent" nameKey="name">
//               <LabelList
//                 dataKey="name"
//                 className="fill-background"
//                 stroke="none"
//                 fontSize={12}
//                 formatter={(value: keyof typeof chartConfig) =>
//                   chartConfig[value]?.label
//                 }
//               />
//             </Pie>
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col gap-2 text-sm">
//         <div className="flex items-center gap-2 font-medium leading-none">
//           Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Showing total visitors for the last 6 months
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "components/ui/chart";
import { ChartData } from "~/@types/Statistic";

const chartData = [
    { name: "Lainnya", nominal: "Rp. 391.000", percent: "43%" },
    { name: "Hiburan", nominal: "Rp. 260.581", percent: "29%" },
    { name: "Transportasi", nominal: "Rp. 187.000", percent: "21%" },
    { name: "Hadiah", nominal: "Rp. 50.000", percent: "6%" },
    { name: "Jajanan", nominal: "Rp. 15.000", percent: "2%" },
  ];
  
  const chartConfig = {
    nominal: { label: "Nominal" },
    percent: { label: "Percent" },
  };
  
  export default function StatisticChart() {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Pie Chart - Label List</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={chartData} dataKey="percent" nameKey="name" stroke="0">
                <LabelList
                  dataKey="percent"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    );
  }