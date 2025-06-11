import { Dayjs } from 'dayjs'

import { SECONDS_IN_WORKING_DAY } from '../data/constants'

export const getTopPosition = (startDate: Dayjs, day: Dayjs) =>
  ((+startDate.format('X') - +day.clone().startOf('day').hour(8).format('X')) /
    SECONDS_IN_WORKING_DAY) *
  100
