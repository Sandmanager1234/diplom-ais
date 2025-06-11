import { Dayjs } from "dayjs"

export const isInSameWeek = (
  dayA: Dayjs,
  dayB: Dayjs | null | undefined
) => {
  if (dayB == null) {
    return false
  }

  return dayA.isSame(dayB, 'week')
}
