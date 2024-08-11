import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ transactions }) => {
  const income = transactions.filter(item => item.type === 'income').reduce((acc, item) => acc + item.amount, 0);
  const expense = transactions.filter(item => item.type === 'expense').reduce((acc, item) => acc + item.amount, 0);

  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384']
      }
    ]
  };

  return (
    <div>
      <h2>Income vs Expense</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
