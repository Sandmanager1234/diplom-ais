import { FC } from 'react'
import ReactMarkDown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { useAppSelector } from 'store'

import { getPeriod } from '../../../../utils/getPeriod'
import { getExperience } from '../../../../utils/getExperience'
import { getMonthsOfPeriod } from '../../../../utils/getMonthsOfPeriod'
import { getSplittedActivity } from 'utils/getSplittedActivity'

import { ExperienceActivity } from 'services/resumesApi/models'

import styles from './ExperienceItem.module.css'

type Props = {
  id: string
  position: string
  companyName: string
  startDate: string
  endDate: string
  site: string
  description: string
  activity: ExperienceActivity
}

export const ExperienceItem: FC<Props> = (props) => {
  const {
    position,
    companyName,
    startDate,
    endDate,
    site,
    description,
    activity,
  } = props

  const { glossary } = useAppSelector((state) => state.directories)

  return (
    <section className={styles.item}>
      <div className={styles.timePeriod}>
        <p className={styles.dates}>{getPeriod(startDate, endDate)}</p>
        <p className={styles.fullPeriod}>
          {getExperience(getMonthsOfPeriod(startDate, endDate))}
        </p>
      </div>
      <div className={styles.info}>
        <h3 className={styles.companyName}>{companyName}</h3>
        <p className={styles.site}>
          <a href={`//${site}`} target='_blank' rel='noreferrer'>
            {site}
          </a>
        </p>
        <ReactMarkDown remarkPlugins={[remarkGfm]} className={styles.activity}>
          {description}
        </ReactMarkDown>
        <div className={styles.position}>
          {glossary['position'][position]
            ? glossary['position'][position]
            : position}
        </div>
        {!!activity?.details?.length &&
          getSplittedActivity(activity?.details[0]).map((item) => (
            <>
              <ReactMarkDown
                remarkPlugins={[remarkGfm]}
                className={styles.description}
              >
                {item}
              </ReactMarkDown>
              <div className={styles.hiddenBlock}></div>
            </>
          ))}
      </div>
    </section>
  )
}
