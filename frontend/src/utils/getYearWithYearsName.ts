export const getYearWithYearsName = (years: number) => {
  let txt
  let count = years % 100
  if (count >= 5 && count <= 20) {
    txt = 'лет'
  } else {
    count = count % 10
    if (count == 1) {
      txt = 'год'
    } else if (count >= 2 && count <= 4) {
      txt = 'года'
    } else {
      txt = 'лет'
    }
  }
  return ' (' + years + ' ' + txt + ')'
}
