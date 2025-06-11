export const getExperience = (numberOfMonths: number) => {
  const years = Math.floor(numberOfMonths / 12)
  const months = numberOfMonths % 12

  const yearPart =
    years === 1
      ? '1 год'
      : years >= 2 && years <= 4
      ? `${years} года`
      : years >= 5
      ? `${years} лет`
      : ''

  const monthPart =
    months > 0
      ? months === 1
        ? '1 месяц'
        : months <= 4
        ? `${months} месяца`
        : `${months} месяцев`
      : ''

  return `${yearPart} ${monthPart}`.trim() || 'Нет опыта'
}
