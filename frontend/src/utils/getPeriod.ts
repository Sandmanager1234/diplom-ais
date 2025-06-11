import dayjs from 'dayjs'

export const getPeriod = (startDate: any, endDate: any) => {
  return `${dayjs(startDate).format('MMMM YYYY')} — ${
    endDate ? dayjs(endDate).format('MMMM YYYY') : 'По настоящее время'
  }`
}
