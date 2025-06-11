import { useEffect, useState, FC, Dispatch, useRef } from 'react'
import classNames from 'classnames'

import { useAppSelector } from 'store'
import { Icon } from 'UI'
import { useClickOutside } from 'hooks'

import { Multiselect } from './Components/Multiselect'

import styles from './Dropdown.module.css'

interface IDropItems {
  id?: string
  value: string
  description: string
}

interface IDropdown {
  isFocus?: boolean
  title: string
  dropItems: Array<IDropItems>
  defaultValue?: string | string[]
  style: 'defaultDropdown' | 'mediumDropdown' | 'currencyDropdown'
  returnId?: boolean
  name?: string
  onChange?: Dispatch<string> | Dispatch<string[]> | Dispatch<any>
  state?: any
  id?: number
  multiselect?: boolean
  error?: string
  required?: boolean
  maxHeight?: number
  isNowError?: boolean
}

export const Dropdown: FC<IDropdown> = ({
  title,
  dropItems,
  defaultValue,
  style,
  name,
  onChange,
  state,
  id,
  multiselect = false,
  returnId = false,
  error,
  required = false,
  maxHeight = 490,
  isFocus = false,
  isNowError = false,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const [showDropDown, setShowDropDown] = useState(false)

  const hideDropDown = () => setShowDropDown(false)

  useClickOutside(ref, hideDropDown)

  const { mas } = useAppSelector((state) => state.directories)
  const objectValues =
    dropItems &&
    Object.fromEntries(dropItems?.map((n) => [n.value, n.description]))
  const [activeStatus, setActiveStatus] = useState('Не выбрано')
  const { glossary } = useAppSelector((state) => state.directories)
  const [activeItems, setActiveItems] = useState<
    {
      value: string
      description: string
      isActive: boolean
      id: number
    }[]
  >()
  const [isError, setError] = useState(isFocus)

  useEffect(() => {
    if (name !== 'languages' || dropItems == mas['language-level']) {
      if (
        defaultValue &&
        defaultValue !== 'Не выбрано' &&
        defaultValue !== '' &&
        objectValues
      ) {
        setActiveStatus(objectValues[defaultValue])
      } else {
        setActiveStatus('Не выбрано')
      }
    } else if (
      name == 'languages' &&
      defaultValue !== 'Не выбрано' &&
      defaultValue !== '' &&
      glossary['language']
    ) {
      setActiveStatus(glossary['language'][defaultValue])
    }
    if (dropItems && returnId) {
      setActiveItems(
        dropItems?.map((item) =>
          item.value === defaultValue
            ? {
                ...item,
                id: item.id,
                isActive: true,
              }
            : { ...item, id: item.id, isActive: false }
        )
      )
    } else if (dropItems) {
      setActiveItems(
        dropItems?.map((item, index) =>
          item.value === defaultValue
            ? {
                ...item,
                id: index,
                isActive: true,
              }
            : { ...item, id: index, isActive: false }
        )
      )
    }
    if (
      (activeStatus === '' || activeStatus === 'Не выбрано') &&
      (defaultValue === '' || defaultValue == null)
    ) {
      setError(true)
    } else {
      setError(false)
    }
  }, [dropItems, defaultValue])

  const wrapStyleDropdown = classNames({
    [styles[style]]: true,
  })

  function sortDropValues(arr: any) {
    if (arr) {
      return arr.sort((a, b) => {
        if (a.value > b.value) {
          return 1
        }
        if (a.value < b.value) {
          return -1
        }
        return 0
      })
    }
  }

  const { fields } = useAppSelector((state) => state.createResume)
  return (
    <div className={wrapStyleDropdown} ref={ref}>
      {!multiselect ? (
        <div>
          <span className={styles.title}>{title}</span>
          <button
            disabled={
              title === 'Язык' &&
              fields.languages.filter((language) => language.level).length === 5
            }
            type={'button'}
            className={
              isNowError
                ? styles.dropdownActiveError
                : required
                ? isError
                  ? styles.dropdownActiveError
                  : styles.dropdownActive
                : styles.dropdownActive
            }
            onClick={() => setShowDropDown((prevState: boolean) => !prevState)}
          >
            {required ? (
              <input
                type='text'
                required={true}
                placeholder={'Не выбрано'}
                value={activeStatus !== 'Не выбрано' ? activeStatus : ''}
              />
            ) : (
              <div className={styles.text}>{activeStatus}</div> || <div></div>
            )}
            <div className={styles.images}>
              {activeStatus !== 'Не выбрано' &&
                [
                  'country',
                  'grade',
                  'educationType',
                  'position',
                  'employmentType',
                  'languages',
                  'language',
                  'languageLevel',
                  'status',
                  'experiences',
                  'monthFrom',
                  'monthTo',
                ].includes(name) && (
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveStatus('Не выбрано')
                      setActiveItems(
                        dropItems?.map((item) =>
                          item.value === defaultValue
                            ? {
                                ...item,
                                id: item.id,
                                isActive: false,
                              }
                            : { ...item, id: item.id, isActive: false }
                        )
                      )
                      if (returnId) {
                        onChange({ id: '', value: '' })
                      } else if (state) {
                        onChange({ ...state, [name]: '' })
                      } else {
                        onChange('')
                      }
                    }}
                    className={styles.cross}
                  >
                    <Icon.CrossOption />
                  </button>
                )}
              <div className={showDropDown ? styles.arrowDown : styles.arrowUp}>
                <Icon.ArrowChewronRight />
              </div>
            </div>
          </button>
          {dropItems?.length !== 0 && (
            <div
              style={
                document.documentElement.clientHeight -
                  ref?.current?.getBoundingClientRect().y <
                490 + ref?.current?.getBoundingClientRect().height
                  ? { maxHeight: maxHeight, bottom: 55 }
                  : { maxHeight: maxHeight, top: 73 }
              }
              className={showDropDown ? styles.dropdownList : styles.hidden}
            >
              {activeItems &&
                sortDropValues(activeItems).map(
                  (item: {
                    description: string
                    id: string | number
                    isActive: boolean
                    value: string
                  }) => (
                    <div
                      role={'button'}
                      tabIndex={0}
                      onClick={(e: { target: { id: string } }) => {
                        if (state) {
                          onChange({ ...state, [name]: item.value })
                        } else if (returnId) {
                          onChange(
                            item.value !== defaultValue
                              ? {
                                  id: item.id,
                                  value: item.value,
                                }
                              : { id: '', value: '' }
                          )
                        } else {
                          onChange(item.value)
                        }
                        setActiveItems(
                          activeItems.map((item) =>
                            item.id === Number(e.target.id)
                              ? {
                                  ...item,
                                  isActive: true,
                                }
                              : { ...item, isActive: false }
                          )
                        )
                        setActiveStatus(item.description)
                        setShowDropDown(false)
                      }}
                      id={String(item.id)}
                      className={styles.dropdownItem}
                      key={item.id}
                    >
                      <label
                        className={
                          item.isActive
                            ? styles.inputActiveContainer
                            : styles.inputContainer
                        }
                        id={String(item.id)}
                      >
                        <input
                          readOnly={true}
                          id={String(item.id)}
                          onClick={(e) => e.stopPropagation()}
                          className={styles.inputRadio}
                          checked={item.isActive}
                          type='radio'
                        />
                        <span
                          id={String(item.id)}
                          className={styles.radioIndicator}
                        ></span>
                        {item.description}
                      </label>
                    </div>
                  )
                )}
            </div>
          )}
        </div>
      ) : (
        <Multiselect
          defaultValue={defaultValue}
          title={title}
          dropItems={dropItems}
          onChange={onChange}
          maxHeight={maxHeight}
        />
      )}
      <span
        className={
          (isError && required) || isNowError
            ? styles.errorActive
            : styles.errorDisable
        }
      >
        {error}
      </span>
    </div>
  )
}
