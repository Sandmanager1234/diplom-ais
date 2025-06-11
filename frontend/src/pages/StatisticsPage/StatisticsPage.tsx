import styles from '../StatisticsPage/StatisticsPage.module.css'
import { Header } from './components/Header'
import { DiagramVacancies } from './components/DiagramVacancies'
import { ChartClosedVacancies } from './components/ChartClosedVacancies'
import React, { useEffect, useState } from 'react'
import { ButtonStatistics } from '../../UI/ButtonStatistics'
import { Icon } from '../../UI'
import {LoaderDotsStat} from './components/LoaderDots'
import { statisticsApi } from '../../services/statisticsApi/StatisticsApi'

type AverageDayItem = {
  state: string;
  value: number;
};

type ClosedVacanciesItem = {
  year: string;
  data: any[];
};

export const StatisticsPage = () => {
  const [statBy, setStatBy] = useState('Статистика по времени')
  const [period, setPeriod] = useState('six-month')
  const [loadingAverageDays, setLoadingAverageDays] = useState(false)
  const [loadingClosedVacancies, setLoadingClosedVacancies] = useState(false)
  const [year, setYear] = useState(2025)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(event.target.value)
  }

  const [averageDaysData, setAverageDaysData] = useState<{ result: AverageDayItem[] }>({
    result: [],
  });

  const [closedVacanciesData, setClosedVacanciesData] = useState<ClosedVacanciesItem>({
    year: '',
    data: [],
  })

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2018 + 1 }, (_, i) => currentYear - i);

  useEffect(() => {
    setLoadingAverageDays(true);

    statisticsApi
        .getAverageDays(`${period}`)
        .then((res) => {
          const ALL_STATES = [
            'new',
            'communication',
            'screening',
            'interview',
            'customer_interview',
            'check_security',
            'send_offer',
          ];

          const dataMap = Object.fromEntries(res.data.result.map(item => [item.state.toLowerCase(), item.value]));

          const normalizedData = {
            result: ALL_STATES.map(state => ({
              state,
              value: dataMap[state] ?? 0,
            })),
          };

          setAverageDaysData(normalizedData);
        })
        .finally(() => setLoadingAverageDays(false));
  }, [period]);

  useEffect(() => {
    setLoadingClosedVacancies(true)

    statisticsApi
        .getClosedVacancies(year)
        .then((res) => {
          const allMonths = Array.from({ length: 12 }, (_, i) => i + 1)

          const monthMap = Object.fromEntries(
              res.data.data.map((item: { month: number; days: number }) => [item.month, item.days])
          )

          const normalizedData = {
            year: res.data.year,
            data: allMonths.map((month) => ({
              month: month,
              days: monthMap[month] ?? 0,
            })),
          }

          setClosedVacanciesData(normalizedData)
        })
        .finally(() => setLoadingClosedVacancies(false))
  }, [year])


  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Header subCurrentPageName='Аналитика' currentPageName={statBy} />

      <div className={styles['buttonsContainer']}>
        <ButtonStatistics
          classname={
            statBy === 'Статистика по количеству резюме'
              ? 'btnActive'
              : 'btnInactive'
          }
          text='Статистика по количеству резюме'
          onClick={() => {
            setStatBy('Статистика по количеству резюме')
          }}
        />
        <ButtonStatistics
          classname={
            statBy === 'Статистика по времени' ? 'btnActive' : 'btnInactive'
          }
          text='Статистика по времени'
          onClick={() => {
            setStatBy('Статистика по времени')
          }}
        />
        <ButtonStatistics
          classname={
            statBy === 'Статистика по импорту' ? 'btnActive' : 'btnInactive'
          }
          text='Статистика по импорту'
          onClick={() => {
            setStatBy('Статистика по импорту')
          }}
        />
      </div>

      <div className={styles.filterContainer}>
        <div className={styles.innerFilterContainer}>
          <div className={styles['filter']}>
            <Icon.Filter />
            <p>Фильтры</p>
          </div>
          <ButtonStatistics
            classname={period === 'week' ? 'btnActiveFill' : 'btnInactive'}
            text='Неделя'
            onClick={() => {
              setPeriod('week')
            }}
          />
          <ButtonStatistics
            classname={period === 'month' ? 'btnActiveFill' : 'btnInactive'}
            text='Месяц'
            onClick={() => {
              setPeriod('month')
            }}
          />
          <ButtonStatistics
            classname={period === 'six-month' ? 'btnActiveFill' : 'btnInactive'}
            text='6 месяцев'
            onClick={() => {
              setPeriod('six-month')
            }}
          />
          <ButtonStatistics
            classname={period === 'year' ? 'btnActiveFill' : 'btnInactive'}
            text='Год'
            onClick={() => {
              setPeriod('year')
            }}
          />
        </div>

        <select
            className={styles.selectYear}
            id='dropdown'
            value={year}
            onChange={handleChange}
        >
          {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
          ))}
        </select>
      </div>

      <div className={styles['diagramsContainer']}>

        {loadingAverageDays && !averageDaysData?.result?.length ? (
          <div className={styles['loader']}>
            <LoaderDotsStat />
          </div>
        ) : (
          <div className={averageDaysData?.result?.length ? '' : styles.hidden}>
            <DiagramVacancies
              result={averageDaysData}
              title={
                'Среднее количество дней расположения резюме на разных статусах'
              }
            />
          </div>
        )}

        {loadingClosedVacancies && !closedVacanciesData?.data?.length ? (
          <div className={styles['loader']}>
            <LoaderDotsStat />
          </div>
        ) : (
          <div
            className={closedVacanciesData?.data?.length ? '' : styles.hidden}
          >
            <ChartClosedVacancies
              data={closedVacanciesData}
              title={'Среднее время закрытия вакансии'}
            />
          </div>
        )}
      </div>
    </div>
  )
}
