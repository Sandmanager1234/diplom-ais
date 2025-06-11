import { APIWithTokenStat } from '../api'

export const statisticsApi = {
  async getAverageDays(period: string) {
    return await APIWithTokenStat.get(
      `/v1/analytics/states/averageDays?period=${period}`
    ).then((res) => res)
  },

  async getClosedVacancies(year: number) {
    return await APIWithTokenStat.get(
      `/v1/analytics/closedVacancies?year=${year}`
    ).then((res) => res)
  },
}
