import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  PointElement,
} from "chart.js";
import { faker } from "@faker-js/faker";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({
  title = "Chart.js Bar Chart - Stacked",
  labels = ["January", "February", "March", "April", "May"],
  chartData = {
    labels: labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  },
}) => {
  return (
    <>
      <div className="space-x-2 bg-white border rounded shadow">
        <div className="p-3 border-b">
          <h5 className="font-bold text-gray-600 uppercase">{title}</h5>
        </div>
        <div className="p-5">
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Chart.js Line Chart",
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default LineChart;
