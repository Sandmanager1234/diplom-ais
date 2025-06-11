import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import styles from './DiagramVacancies.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface DataItem {
  state: string;
  value: number;
}

interface DiagramVacancies {
  result: DataItem[];
}

interface DiagramVacanciesProps {
  result: DiagramVacancies;
  title: string;
}

export const DiagramVacancies: React.FC<DiagramVacanciesProps> = ({ result, title }) => {
  const states = result.result.map(item => {
    switch (item.state) {
      case 'new':
        return 'Стакан резюме';
      case 'communication':
        return 'Теплый контакт';
      case 'screening':
        return 'Скрининг';
      case 'interview':
        return 'Интервью ТН';
      case 'customer_interview':
        return 'Интервью с заказчиком';
      case 'check_security':
        return 'Проверка СБ';
      case 'send_offer':
        return 'Оффер';
      default:
        return item.state;
    }
  });
  const values = result.result.map(item => item.value);

  const chartData = {
    labels: states,
    datasets: [
      {
        label: 'Количество',
        data: values,
        backgroundColor: [
          '#FFDD29',
          '#FF9029',
          '#FF2929',
          '#98E718',
          '#31D516',
          '#16D590',
          '#16B8D5',
          '#1672D5',
        ],
        borderColor: [
          '#FFDD29',
          '#FF9029',
          '#FF2929',
          '#98E718',
          '#31D516',
          '#16D590',
          '#16B8D5',
          '#1672D5',
        ],
        hoverBackgroundColor:  [
          '#FFEA7A',
          '#ffb46d',
          '#ff6565',
          '#c6f47c',
          '#8ae87b',
          '#76e3bc',
          '#9cddea',
          '#8bb5e1',
        ],
        borderWidth: 2,
        borderRadius: 6,
        barPercentage: 0.99,
        categoryPercentage: 0.99,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        titleAlign: 'center',
        bodyAlign: 'center',
        enabled: true,
        backgroundColor: '#ffffff',
        bodyColor: '#2969FF',
        borderRadius: 12,
        padding: 16,
        caretSize: 0,
        bodyFont: {
          size: 26,
          family: 'Roboto',
          weight: 'bold',
        },
        displayColors: false,
        callbacks: {
          label: (context: any) => {
            const value = context.dataset.data[context.dataIndex];
            return `${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        suggestedMax: 10,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Среднее количество дней',
          color: '#656263',
          padding: 30,
          font: {
            size: 16,
            family: 'Roboto',
          },
        },
        ticks: {
          padding: 10,
          color: '#656263',
          font: {
            size: 16,
            family: 'Roboto',
          },
        },
        grid: {
          drawOnChartArea: true,
        },
      },
      x: {
        offset: true,
        suggestedMax: 9,
        grid: {
          display: false,
        },
        ticks: {
          padding: 10,
          color: '#656263',
          font: {
            size: 12,
            family: 'Roboto',
          },
        },
      },
    },
  };

  return (
    <>
      <div className={styles.diagramTitle}>
        {title}
      </div>
      <Bar
        className={styles.diagramAverageDays}
        data={chartData}
        options={options}
      />
    </>
  );
};