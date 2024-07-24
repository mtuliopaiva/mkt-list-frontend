import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Vendas',
    },
  },
};

const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const data = {
  labels,
  datasets: [
    {
      label: 'Vendas 2024',
      data: [120, 150, 180, 170, 220, 200, 240, 260, 230, 210, 190, 250],
      borderColor: '#B2F6E8',
      backgroundColor: '#fff',
    },

  ],
};

const LineGraphComponent: React.FC = () => {
  return <Line options={options} data={data} />;
};

export default LineGraphComponent;
