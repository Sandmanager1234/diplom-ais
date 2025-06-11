import { FC } from 'react'

import { Icon } from 'UI'

import { Location } from 'services/vacanciesApi/models'

import { InfoWithImage } from '../InfoWithImage'

import { formatLocation } from './services/formatLocation'


export type LocationInfoProps = {
  customer: string
  location: Location[]
}

const LocationInfo: FC<LocationInfoProps> = ({ customer, location }) => {
  return (
    <>
      {location.map((item) => (
        <InfoWithImage image={<Icon.Building />} text={formatLocation(item)} />
      ))}
    </>
  )
}

export default LocationInfo
