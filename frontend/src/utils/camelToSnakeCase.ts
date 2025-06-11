import memoize from 'lodash/memoize'

export const camelToSnakeCase = memoize((field) =>
  field
    .split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase()
)
