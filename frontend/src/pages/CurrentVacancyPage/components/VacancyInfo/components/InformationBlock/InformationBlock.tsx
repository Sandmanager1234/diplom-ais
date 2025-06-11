import { FC, ReactNode } from 'react'

import { MainInfo, MainInfoProps } from './components/MainInfo'
import { LocationInfo, LocationInfoProps } from './components/LocationInfo'
import { Description, DescriptionProps } from './components/Description'
import {
  AboutVacancyInfo,
  AboutVacancyInfoProps,
} from './components/AboutVacancyInfo'

import style from './InformationBlock.module.css'

type Props = {
  children: ReactNode
}

type Composition = {
  MainInfo: FC<MainInfoProps>
  LocationInfo: FC<LocationInfoProps>
  Description: FC<DescriptionProps>
  AboutVacancyInfo: FC<AboutVacancyInfoProps>
}

const InformationBlock: FC<Props> & Composition = ({ children }) => (
  <div className={style.informationBlock}>{children}</div>
)

InformationBlock.MainInfo = MainInfo
InformationBlock.LocationInfo = LocationInfo
InformationBlock.Description = Description
InformationBlock.AboutVacancyInfo = AboutVacancyInfo

export default InformationBlock
