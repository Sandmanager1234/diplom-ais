import { useClickOutside } from 'hooks'
import React, { useEffect, useRef, useState } from 'react'
import styles from './Autocomplete.module.css'

interface IAutocomplete {
  isFocus?: boolean
  title: string
  onChange: React.Dispatch<string>
  isAutoClean: boolean
  dictionary: { id?: string; description: string; value: string }[]
  isUniqueValue?: boolean
  required?: boolean
  defaultValue?: string
  returnId?: boolean
  reset?: boolean
  setReset?: React.Dispatch<boolean>
  isOnlyDictionaryValue?: boolean
  errorField?: string
}

export const Autocomplete: React.FC<IAutocomplete> = (props) => {
  const {
    isFocus = false,
    title,
    onChange,
    isAutoClean,
    dictionary,
    isUniqueValue = true,
    required = false,
    returnId = false,
    defaultValue,
    reset = false,
    setReset,
    isOnlyDictionaryValue = false,
    errorField = '',
  } = props

  const masData = []

  const dictionaryObject = dictionary
    ? Object.fromEntries(
        dictionary?.map((n: { value: string; description: string }) => [
          n.description,
          n.value,
        ])
      )
    : []
  const dictionaryIdObject = dictionary
    ? Object.fromEntries(
        dictionary?.map(
          (n: { id: string; value: string; description: string }) => [
            n.description,
            n.id,
          ]
        )
      )
    : []

  if (dictionary) dictionary?.map((skill) => masData.push(skill.description))

  const [filterSKills, setFilterSkills] = useState([])

  const [isActive,setIsActive] = useState(false)

  const ref=useRef<HTMLDivElement>(null)

  useClickOutside(ref,()=>setIsActive(false))

  const [value, setValue] = useState<string>(defaultValue || '')

  const [focused, setFocused] = useState(isFocus)
  useEffect(() => {
    if (reset) {
      setValue('')
      setReset(false)
    }
    setIsActive(true)
    if (dictionary) {
      const filterMas = dictionary?.map((skill) =>
        skill.description.toLowerCase().indexOf(value.toLowerCase()) >= 0
          ? { ...skill }
          : false
      )
      setFilterSkills(filterMas.filter((item) => item !== false))
    }
    if (masData.includes(value) && dictionary.length !== 0 && returnId) {
      onChange({
        id: dictionaryIdObject[value],
        value: dictionaryObject[value],
      })
      setIsActive(false)
      // }
      // else if (!isUniqueValue && !isAutoClean && !returnId) {
      //   onChange(value)
      //   setIsActive(false)
    } else if (masData.includes(value) && dictionary.length !== 0) {
      onChange(dictionaryObject[value])
      setIsActive(false)
    } 
    if (value === '' && returnId) {
      onChange({ id: '', value: '' })
    } else if (value === '') {
      onChange('')
    }
    if (!isUniqueValue && !isAutoClean && !returnId) {
      onChange(value)
    }
    // if (title === "Регион" && !isUniqueValue) {
    //   onChange(value);
    // }
    if (
      !isActive &&
      !masData.includes(value) &&
      value !== '' &&
      isOnlyDictionaryValue
    ) {
      setValue('')
    }
  }, [value, reset, isActive])

  return (
    <div ref={ref} className={styles.autocompleteWrap}>
      <div className={styles.title}>{title}</div>
      <input
        className={styles.inputStyle}
        required={required}
        autoComplete={'off'}
        onFocus={() => setIsActive(true)}
        focused={focused.toString()}
        onBlur={() => setFocused(true)}
        maxLength={250}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            if (isUniqueValue && filterSKills && returnId) {
              setValue(filterSKills[0].description)
              onChange({ id: filterSKills[0].id, value: filterSKills[0].value })
            } else if (isUniqueValue && filterSKills) {
              setValue(filterSKills[0].description)
              onChange(filterSKills[0].value)
            } else {
              onChange(value)
            }
            isAutoClean && setValue('')
            // isAutoClean && onChange('')
          }
        }}
        value={value}
        type='text'
      />
      {required && focused && value === '' ? (
        <div className={styles.error}>
          Поле "{errorField}" обязательно для заполнения
        </div>
      ) : isOnlyDictionaryValue &&
        focused &&
        !masData.includes(value) &&
        value !== '' ? (
        <div className={styles.error}>
          Введено недопустимое значение поля "{errorField}"
        </div>
      ) : null}
      <div
        style={
          document.documentElement.clientHeight -
            ref?.current?.getBoundingClientRect().y <
          filterSKills?.length * 50 +
            ref?.current?.getBoundingClientRect().height
            ? { bottom: 55 }
            : { top: 73 }
        }
        className={
          value !== '' && filterSKills.length && isActive
            ? styles.skillsWrap
            : styles.hidden
        }
      >
        {filterSKills &&
          filterSKills.map(
            (
              skill: { id?: string; value: string; description: string },
              index: number
            ) => (
              <button
                key={index}
                className={styles.skillItem}
                type={'button'}
                onClick={() => {
                  setIsActive(false)
                  setValue(skill.description)
                  if (returnId) {
                    onChange({ id: skill.id, value: skill.value })
                  } else {
                    onChange(skill.value)
                  }
                  isAutoClean && setValue('')
                }}
              >
                {skill.description}
              </button>
            )
          )}
      </div>
    </div>
  )
}
