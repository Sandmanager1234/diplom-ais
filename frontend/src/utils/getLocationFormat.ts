import { Location } from '../types/vacancies'

export const getLocationFormat = (location: Location) => {
  const { candidateCountry, candidateRegion, candidateCity } = location

  return `${candidateCountry ? candidateCountry : ''}${
    !!candidateCountry && !!candidateRegion
      ? ', ' + candidateRegion
      : candidateRegion
      ? candidateRegion
      : ''
  }${
    (!!candidateCountry || !!candidateRegion) && !!candidateCity
      ? ', ' + candidateCity
      : candidateCity
      ? candidateCity
      : ''
  }`
}
