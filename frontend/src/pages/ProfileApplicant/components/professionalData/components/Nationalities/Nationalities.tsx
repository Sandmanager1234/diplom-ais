import { FC } from 'react'

import { Nationality } from 'services/models'
import { Glossary } from 'types'

import { getNationality } from 'utils/getNationality'

import styles from './Nationalities.module.css'

type Props = {
  nationalities: Nationality[]
  workPermit: boolean
  glossary: Glossary
}

const Nationalities: FC<Props> = ({ nationalities, workPermit, glossary }) => {
  return (
    <>
      {!!nationalities.length && (
        <div className={styles.fieldInfo}>
          <div>
            <span className={styles.titleInfo}>Гражданство</span>
            <p className={styles.infoCountry}>
              {nationalities
                .map((nationality: { nationality: string }) =>
                  getNationality(nationality, glossary)
                )
                .join(', ')}
            </p>
          </div>
          <div>
            <span className={styles.titleInfo}>Разрешение на работу</span>
            <p className={styles.workPermitInfo}>
              {workPermit
                ? 'Есть разрешение на работу'
                : 'Нет разрешения на работу'}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default Nationalities
