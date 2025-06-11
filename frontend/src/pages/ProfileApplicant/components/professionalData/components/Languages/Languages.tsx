import { FC } from 'react'

import { Language } from 'services/models'
import { Glossary } from 'types'

import styles from './Languages.module.css'

type Props = {
  languages: Language[]
  glossary: Glossary
}

const Languages: FC<Props> = ({ languages, glossary }) => {
  const checkLanguageLevelAndValue = (
    value: string,
    level: string
  ): boolean => {
    return !!value && !!level
  }

  return (
    <div className={styles.fieldInfo}>
      <h3 className={styles.titleInfo}>Знание языков</h3>
      {languages.map((language, index) => (
        <p key={index} className={styles.infoLanguages}>
          <span>
            {checkLanguageLevelAndValue(language.language, language.level) &&
            glossary['language'][language.language] != undefined
              ? glossary['language'][language.language]
              : language.language}
          </span>{' '}
          – {glossary['language-level'][language.level]}
        </p>
      ))}
    </div>
  )
}
export default Languages
