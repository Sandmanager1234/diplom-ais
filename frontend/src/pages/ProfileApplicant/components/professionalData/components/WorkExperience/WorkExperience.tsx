import { FC } from 'react'

import { getExperience } from 'utils/getExperience'
import { getDescSortedExperiences } from 'utils/getSortedExperience'

import { ExperienceItem } from 'pages/ProfileApplicant/components/experienceItem/ExperienceItem'
import type { Experiences } from 'services/resumesApi/models'

import styles from './WorkExperience.module.css'

type Props = {
  summaryExperience: number
  experiences: Experiences
}

const WorkExperience: FC<Props> = ({ summaryExperience, experiences }) => {
  return (
    <>
      {!!summaryExperience && (
        <div className={styles.summaryExperience}>
          Опыт работы
          <span>{" " + getExperience(summaryExperience)}</span>
        </div>
      )}
      {experiences[0] && (
        <div className={styles.fieldExperiences}>
          <div className={styles.fieldExperience}></div>
          {getDescSortedExperiences(experiences).map((experience) => (
            <ExperienceItem {...experience} key={experience.id} />
          ))}
        </div>
      )}
    </>
  )
}
export default WorkExperience
