import { useAppSelector } from 'store'

import { Icon } from 'UI'

import styles from './About.module.css'

type AboutProps = {
  name: string
  surname: string
  patronym: string
  gender: string
  dateOfBirth: string
  city: string
  country: string
  region: string
}

export const About = (props: AboutProps) => {
  const {
    name,
    surname,
    patronym,
    gender,
    dateOfBirth,
    city,
    country,
    region,
  } = props

  const { glossary } = useAppSelector((state) => state.directories)

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }

  const formatterDate = new Intl.DateTimeFormat('ru', dateOptions)
  const formatterYear = new Intl.NumberFormat('ru', {
    style: 'unit',
    unit: 'year',
    unitDisplay: 'long',
  })

  const getBirthDate = (date: string) => {
    const age =
      ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) |
      0
    return `${formatterDate
      .format(new Date(date))
      .slice(0, -3)}, ${formatterYear.format(age)}`
  }

  return (
    <>
      <div className={styles.initials}>
        <p>{surname}</p>
        <p>{`${name} ${patronym !== null ? patronym : ''}`}</p>
      </div>
      {(gender || dateOfBirth || city) && (
        <div className={styles.info}>
          {gender && (
            <div className={styles.gender}>
              <div>{<Icon.UserDefault />}</div>
              <div>{gender === 'male' ? 'Мужчина' : 'Женщина'}</div>
            </div>
          )}
          {dateOfBirth && (
            <div className={styles.dateBirth}>
              <div>{<Icon.Calendar />}</div>
              <div>{getBirthDate(dateOfBirth)}</div>
            </div>
          )}
          {(city != undefined ||
            country != undefined ||
            region != undefined) && (
            <div className={styles.address}>
              <div>
                <Icon.Building />
              </div>
              <div>
                {city && `г. ${city}`}
                {city && (region || country) && ', '}
                {region && region}
                {region && glossary['country'] && country && ', '}
                {country && glossary['country'] && glossary['country'][country]
                  ? ` ${glossary['country'][country]}`
                  : country
                  ? ` ${country}`
                  : null}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
