import { Glossary } from 'types'

export const getNationality = (
  nationality: { nationality: string },
  glossary: Glossary
): string => {
  return glossary['country'][nationality.nationality] != undefined
    ? glossary['country'][nationality.nationality]
    : nationality.nationality
}
