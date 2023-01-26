import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { faker } from "@faker-js/faker";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({
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
        backgroundColor: "rgb(255, 99, 132)",
        stack: "Stack 0",
      },
      {
        label: "Dataset 2",
        data: labels.map(() =>
          faker.datatype.number({ min: 0, max: 1000 })
        ),
        backgroundColor: "rgb(75, 192, 192)",
        stack: "Stack 0",
      },
      {
        label: "Dataset 3",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        backgroundColor: "rgb(53, 162, 235)",
        stack: "Stack 1",
      },
    ],
  },
}) => {
  return (
    <>
      <div className="bg-white border rounded shadow">
        <div className="p-3 border-b">
          <h5 className="font-bold text-gray-600 uppercase">{title}</h5>
        </div>
        <div className="p-5">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              interaction: {
                mode: "index",
                intersect: false,
              },
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default BarChart;
