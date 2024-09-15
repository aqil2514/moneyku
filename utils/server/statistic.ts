import axios from "axios";
import { endpoint } from "lib/server";
import { getUser } from "utils/server/account";
import { BasicHTTPResponse } from "~/@types/General";
import { ChartData } from "~/@types/Statistic";

export async function getStatisticPromise(
  request: Request
): Promise<ChartData[]> {
  const user = await getUser(request);

  const response = await axios.get<BasicHTTPResponse<ChartData[]>>(`${endpoint}/statistic`, {
    params: { userId: user.uid },
  });

//   const test = {} as ChartData[];

  const chartData = response.data.data as ChartData[];

  return chartData;
}
