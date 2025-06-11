import { Location } from 'services/vacanciesApi/models'

export const formatLocation = (location: Location) => {
  const city = !!location.candidateCity ? `г. ${location.candidateCity}, ` : ''
  const region = !!location.candidateRegion ? `${location.candidateRegion}, ` : ''
  const country = !!location.candidateCountry ? `${location.candidateCountry}` : ''

  return `${city}${region}${country}`
}
