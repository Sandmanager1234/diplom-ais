import { Dayjs } from "dayjs";

import { SECONDS_IN_WORKING_DAY } from "../../../data/constants";

export const getHeight = (startDate: Dayjs, endDate: Dayjs) =>
  ((+endDate.format('X') - +startDate.format('X')) / SECONDS_IN_WORKING_DAY) * 100
