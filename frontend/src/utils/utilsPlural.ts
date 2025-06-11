export const utilPluralText = (count?: number, ...words: string[]): string => {
  const temp = Number(count)
  if (Number.isNaN(temp)) return ''

  const cases = [2, 0, 1, 1, 1, 2]
  const index =
    temp % 100 > 4 && temp % 100 < 20 ? 2 : cases[Math.min(temp % 10, 5)]
  const text = words[index] || words[1]

  return text
}
