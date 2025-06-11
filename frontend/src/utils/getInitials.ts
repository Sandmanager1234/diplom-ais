export function getInitials(fio: string) {
  const fioArr = fio.split(' ')

  fioArr.length > 2 && fioArr.pop()

  return fioArr.reduce((prev, item) => {
    prev += item.charAt(0).toUpperCase()
    return prev
  }, '')
}
