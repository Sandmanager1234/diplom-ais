import React, { useRef } from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LineElement,
} from 'chart.js';
import styles from './ChartClosedVacancies.module.css';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, CategoryScale, LineElement);

interface MonthData {
  month: number;
  days: number;
}

interface ChartClosedVacancies {
  year: string;
  data: MonthData[];
}

interface ChartClosedVacanciesProps {
  data: ChartClosedVacancies;
  title: string;
}

export const ChartClosedVacancies: React.FC<ChartClosedVacanciesProps> = ({
                                                                            data,
                                                                            title,
                                                                          }) => {
  const chartRef = useRef(null);

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
  ];

  const getGradient = (ctx: CanvasRenderingContext2D, chartArea: any) => {
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, 'rgba(41, 105, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(41, 105, 255, 0)');
    return gradient;
  };

  const chartData = {
    labels: monthNames,
    datasets: [
      {
        data: data.data.map((item) => ({
          x: monthNames[item.month - 1],
          y: item.days,
        })),
        showLine: true,
        fill: 'start',
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return 'rgba(41, 105, 255, 0.5)';
          return getGradient(ctx, chartArea);
        },
        borderColor: '#2969FF',
        borderWidth: 2,
        hoverBorderColor: '#FFFFFF',
        hoverBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 10,
        pointBackgroundColor: '#2969FF', // Оставляем точки без градиента
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        ticks: {
          color: '#656263',
          padding: 10,
          font: { size: 12, family: 'Roboto' },
        },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Среднее количество дней',
          color: '#656263',
          padding: 30,
          font: { size: 16, family: 'Roboto' },
        },
        ticks: {
          color: '#656263',
          padding: 10,
          stepSize: 1,
          font: { size: 16, family: 'Roboto' },
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        titleAlign: 'center',
        bodyAlign: 'center',
        enabled: true,
        backgroundColor: '#ffffff',
        bodyColor: '#2969FF',
        borderRadius: 12,
        padding: 16,
        caretSize: 0,
        bodyFont: { size: 26, family: 'Roboto', weight: 'bold' },
        displayColors: false,
        callbacks: {
          label: (context: any) => `${context.raw.y}`,
        },
      },
    },
  };


  return (
    <div>
      <div className={styles.chartTitle}>{title}</div>
      <Scatter
        ref={chartRef}
        className={styles.chartClosedVacancies}
        data={chartData}
        options={options}
      />
    </div>
  );
};
