import { useEffect, useState, FC } from 'react'

import {Dropdown, Icon} from "UI";
import { useAppDispatch, useAppSelector } from 'store'

import { addFieldLanguage, setLanguages } from '../../../../../store/slices/createResumeSlice'


import styles from './Language.module.css'

interface ILanguage {
  id: number
  languageState: string
  levelState: string
}

export const Language: FC<ILanguage> = ({ id, levelState, languageState }) => {

  const { mas } = useAppSelector((state) => state.directories)
  const { fields } = useAppSelector((state) => state.createResume)
  const [languageDrop, setLanguageDrop] = useState(languageState || '')
  const [levelDrop, setLevelDrop] = useState(levelState || '')

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (languageDrop === '') {
      dispatch(setLanguages(fields.languages.map((language) => language.id === id ?
        {
          ...language, language: '', level: '',
        } :
        language,
      )))
    } else {
      dispatch(setLanguages(fields.languages.map((language) => language.id === id ?
        {
          ...language, language: languageDrop, level: levelDrop,
        } :
        language,
      )))
    }
  }, [languageDrop, levelDrop])


  function namesOfLanguages() {
    let languageArray = mas['language']
    for (const lang in fields.languages.map(item => item.language)) {
      languageArray = mas['language'] && languageArray.filter(item => item.value !== fields.languages.map(item => item.language)[lang])
    }
    return languageArray
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.wrapLanguage}>
        <Dropdown
          onChange={setLanguageDrop}
          title={'Язык'}
          dropItems={namesOfLanguages()}
          style={'mediumDropdown'}
          name={'languages'}
          defaultValue={languageDrop}
          required={fields.languages[id]?.level !== ''}
        />
        {languageDrop && (
          <Dropdown
            onChange={setLevelDrop}
            title={'Уровень'}
            dropItems={mas['language-level']}
            style={'mediumDropdown'}
            name={'languages'}
            defaultValue={levelDrop}
            required={fields.languages[id]?.language !== ''}
            error={'Поле "Уровень" обязательно для заполнения, если  заполнено поле "Язык"'}
          />
        )}
      </div>
      <button
        className={fields.languages[fields.languages.length - 1].id == id && fields.languages.length !== 1 ? styles.btnDelete : styles.hidden}
        onClick={() => dispatch(addFieldLanguage(fields.languages.filter(language => language.id !== id)))}
      >
        <Icon.Close />
      </button>
    </div>
  )
}
