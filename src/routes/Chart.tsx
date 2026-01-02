import { fetchCoinHistory } from "./api";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { useTheme } from "styled-components";

interface IHistoryData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps) {
  const theme = useTheme();
  const isDark = theme.bgColor === "#1e272e";
  const { isLoading, data } = useQuery<IHistoryData[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const candleSeries = [
    {
      name: "price",
      data:
        data?.map((candle) => ({
          x: new Date(Number(candle.time_close) * 1000), // 초 → ms
          y: [
            Number(candle.open),
            Number(candle.high),
            Number(candle.low),
            Number(candle.close),
          ],
        })) ?? [],
    },
  ];

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={candleSeries}
          options={{
            chart: {
              type: "candlestick",
              height: 350,
              toolbar: { show: false },
              background: "transparent",
            },
            theme: { mode: isDark ? "dark" : "light" },
            grid: { show: false },
            xaxis: {
              type: "datetime",
              labels: { datetimeUTC: false },
            },
            yaxis: {
              tooltip: { enabled: true },
            },
            tooltip: {
              x: { format: "yyyy-MM-dd HH:mm" },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
