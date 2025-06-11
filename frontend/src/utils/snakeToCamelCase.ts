import memoize from 'lodash/memoize'

export const snakeToCamelCase = memoize((str) =>
  str.replace(/([_][a-z])/g, (group: string) =>
    group.toUpperCase().replace('_', '')
  )
)
