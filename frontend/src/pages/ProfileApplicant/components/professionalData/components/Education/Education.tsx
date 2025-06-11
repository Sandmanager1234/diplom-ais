import { FC } from 'react'

import type { Education } from 'services/models'
import { Glossary } from 'types'
import { getTeachingMethod } from 'utils/getTeachingMethod'

import styles from './Education.module.css'

type Props = {
  education: Education[]
  glossary: Glossary
}

const EducationData: FC<Props> = ({ education, glossary }) => {
  return (
    <>
      {education.map((teaching, index) => (
        <section className={styles.fieldInfo} key={index}>
          <h3 className={styles.titleInfo}>
            {getTeachingMethod(teaching, glossary)}
          </h3>
          <section className={styles.infoEducation} key={teaching.id}>
            {teaching?.endYear && (
              <div className={styles.endYear}>{teaching.endYear}</div>
            )}
            {teaching?.universityName && (
              <div className={styles.universityName}>
                {teaching.universityName}
              </div>
            )}
            {teaching?.organization && (
              <div className={styles.organization}>{teaching.organization}</div>
            )}
            {teaching?.faculty && (
              <div className={styles.faculty}>{teaching.faculty}</div>
            )}
            {teaching?.specialization && (
              <div className={styles.specialization}>
                {teaching.specialization}
              </div>
            )}
          </section>
        </section>
      ))}
    </>
  )
}

export default EducationData
