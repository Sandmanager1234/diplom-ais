import { useEffect, useRef, useState } from 'react'

import { useClickOutside } from 'hooks'

import { useAppDispatch, useAppSelector } from 'store'
import {
  setCityExcluded,
  setRegionExcluded,
} from 'store/slices/filterResumeSlice'

import { Icon } from 'UI'

import styles from './MultiSelectDropdown.module.css'

export const MultiSelectDropdown = (props: {
  title: string
  dropItems: any
  onChange: any
  defaultValue: string
}) => {
  const { title, dropItems, onChange, defaultValue, state } = props
  const { filteringFields } = useAppSelector((state) => state.filterResume)
  const dispatch = useAppDispatch()

  const ref = useRef<HTMLDivElement>(null)

  const [showDropDownList, setShowDropDownList] = useState(false)

  const onChangeVisibilityOfDropDownList = () => setShowDropDownList((prevState: boolean) => !prevState)

  const hideDropDownList = () => setShowDropDownList(false)

  useClickOutside(ref, hideDropDownList)

  const [dropItemActive, setDropItemActive] =
    useState<
      { value: string; id: number; isActive: boolean; description: string }[]
    >()
  const [activeItems, setActiveItems] = useState<string[]>(
    defaultValue ? defaultValue.split(',') : []
  )
  const [isExcluded, setIsExcluded] = useState(false)

  useEffect(() => {
    if (dropItems && defaultValue && activeItems.length) {
      setDropItemActive(
        dropItems.map((item) =>
          defaultValue.includes(item.value)
            ? {
                ...item,
                id: item.id,
                isActive: true,
              }
            : { ...item, id: item.id, isActive: false }
        )
      )
    } else if (dropItems) {
      setDropItemActive(
        dropItems.map(
          (item) => item && { ...item, id: item.id, isActive: false }
        )
      )
    }
  }, [dropItems])

  useEffect(() => {
    if (!activeItems.length) {
      onChange([])
    }
  }, [activeItems])

  useEffect(() => {
    if (
      (!filteringFields.cities && title == 'Город') ||
      (!filteringFields.regions && title == 'Регион')
    ) {
      setActiveItems([])
      dropItems &&
        setDropItemActive(
          dropItems.map((item: object) => item && { ...item, isActive: false })
        )
    }
  }, [defaultValue])

  return (
    <div className={styles.wrap} ref={ref}>
      <span className={styles.title}>{title}</span>
      <button
        disabled={
          (title == 'Регион' && !filteringFields.country) ||
          (title == 'Город' && !filteringFields.regions) ||
          !dropItems?.length
        }
        type={'button'}
        className={styles.dropdownActive}
        onClick={onChangeVisibilityOfDropDownList}
      >
        <div className={styles.activeItems}>
          {activeItems.length !== 0 ? defaultValue : 'Не выбрано'}
        </div>
        <div className={showDropDownList ? styles.arrowDown : styles.arrowUp}>
          <Icon.ArrowChewronRight />
        </div>
      </button>
      <div className={showDropDownList ? styles.dropdownList : styles.hidden} >
        {dropItemActive &&
          dropItemActive.map(
            (item: {
              value: string
              id: number
              isActive: boolean
              description: string
            }) => (
              <div
                id={String(item.id)}
                role={'button'}
                tabIndex={0}
                onClick={(e: { target: { id: number } }) => {
                  setDropItemActive(
                    dropItemActive?.map((item) =>
                      item.id == e.target.id
                        ? { ...item, isActive: !item.isActive }
                        : item
                    )
                  )
                  if (activeItems.includes(item.value)) {
                    setActiveItems(
                      activeItems.filter(
                        (activeItem) => item.value !== activeItem
                      )
                    )
                    onChange(
                      state.filter(
                        (itemState) => itemState.value !== item.value
                      )
                    )
                  } else {
                    setActiveItems([...activeItems, item.value])
                    onChange([
                      ...state,
                      {
                        id: title !== 'Город' ? `regionId=${item.id}` : item.id,
                        value: item.value,
                      },
                    ])
                  }
                }}
                className={styles.dropdownItem}
                key={item.id}
              >
                <label
                  className={
                    item.isActive
                      ? styles.checkboxContainerActive
                      : styles.checkboxContainer
                  }
                  id={String(item.id)}
                >
                  <input
                    readOnly={true}
                    id={String(item.id)}
                    className={styles.inputCheckbox}
                    onClick={(e) => e.stopPropagation()}
                    checked={item.isActive}
                    type='checkbox'
                  />
                  <span
                    id={String(item.id)}
                    className={styles.checkboxIndicator}
                  ></span>
                  {item.description}
                </label>
              </div>
            )
          )}
      </div>
      <div
        style={{
          top: dropItemActive?.length < 10 ? dropItemActive?.length * 50 : 489,
        }}
        className={showDropDownList ? styles.buttonExcludeAndApply : styles.hidden}
      >
        <label
          onClick={() =>
            title == 'Регион'
              ? dispatch(setRegionExcluded(!filteringFields.regionExcluded))
              : dispatch(setCityExcluded(!filteringFields.cityExcluded))
          }
          className={
            isExcluded
              ? styles.checkboxContainerActive
              : styles.checkboxContainer
          }
        >
          <input
            readOnly={true}
            className={styles.inputCheckbox}
            onClick={(e) => e.stopPropagation()}
            type='checkbox'
          />
          <span className={styles.checkboxIndicator}></span>
          Исключить
        </label>
        <button
          type={'button'}
          onClick={(e) => {
            e.preventDefault()
            setIsExcluded(!isExcluded)
            setShowDropDownList(false)
          }}
          className={styles.buttonApply}
        >
          Применить
        </button>
      </div>
    </div>
  )
}
