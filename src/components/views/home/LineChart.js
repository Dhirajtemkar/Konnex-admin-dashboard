import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['Co-creation', 'Search', 'chatbot', 'project'],
  datasets: [
    {
      label: 'Feedback Form',
      data: [25, 21, 30, 28],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const LineChart = () => (
  <div style={{width: "50%"}}>
    <Line data={data} options={options} />
  </div>
);

export default LineChart;