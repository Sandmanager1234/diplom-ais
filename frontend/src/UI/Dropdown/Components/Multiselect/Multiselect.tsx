import React, { useEffect, useRef, useState } from 'react'

import { useClickOutside } from 'hooks'

import { Icon } from 'UI'

import styles from './Multiselect.module.css'

interface IMultiselect {
  title: string
  dropItems: { value: string; description: string }[]
  onChange: React.Dispatch<string[]>
  defaultValue?: string[]
  maxHeight: number
}

export const Multiselect: React.FC<IMultiselect> = (props) => {
  const { title, dropItems, onChange, defaultValue, maxHeight } = props

  const ref = useRef<HTMLDivElement>(null)

  const [showDropDownList, setShowDropDownList] = useState(false)

  const onChangeVisibilityOfDropDownList = () => setShowDropDownList((prevState: boolean) => !prevState)

  const hideDropDownList = () => setShowDropDownList(false)

  useClickOutside(ref, hideDropDownList)

  const [dropItemActive, setDropItemActive] =
    useState<
      { value: string; id: number; isActive: boolean; description: string }[]
    >()

  const objectValues =
    dropItems &&
    Object.fromEntries(dropItems?.map((n) => [n.value, n.description]))
  const [activeItems, setActiveItems] = useState<string[]>([])

  useEffect(() => {
    if (dropItems && defaultValue) {
      setDropItemActive(
        dropItems.map((item, index) =>
          defaultValue.includes(item.value)
            ? {
                ...item,
                id: index,
                isActive: true,
              }
            : { ...item, id: index, isActive: false }
        )
      )
      setActiveItems(defaultValue)
    } else if (dropItems) {
      setDropItemActive(
        dropItems.map(
          (item, index) => item && { ...item, id: index, isActive: false }
        )
      )
    }
    const objectValues =
      dropItems &&
      Object.fromEntries(dropItems?.map((n) => [n.value, n.description]))
  }, [dropItems])

  return (
    <div ref={ref}>
      <span className={styles.title}>{title}</span>
      <button
        type={'button'}
        className={styles.dropdownActive}
        onClick={onChangeVisibilityOfDropDownList}
      >
        <div className={styles.activeItems}>
          {activeItems.length !== 0
            ? activeItems.map((item) => item && objectValues[item]).join(', ')
            : 'Не выбрано'}
        </div>
        <div className={showDropDownList ? styles.arrowDown : styles.arrowUp}>
          <Icon.ArrowChewronRight />
        </div>
      </button>
      <div
        style={
          document.documentElement.clientHeight -
            ref?.current?.getBoundingClientRect().y <
          dropItemActive?.length * 50 +
            ref?.current?.getBoundingClientRect().height
            ? { maxHeight: maxHeight, bottom: 55 }
            : { maxHeight: maxHeight, bottom: '0' }
        }
        className={showDropDownList ? styles.dropdownList : styles.hidden}
      >
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
                onClick={(e: { target: { id: string } }) => {
                  setDropItemActive(
                    dropItemActive.map((item) =>
                      Number(e.target.id) === item.id
                        ? {
                            ...item,
                            isActive: !item.isActive,
                          }
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
                      activeItems.filter(
                        (activeItem) => item.value !== activeItem
                      )
                    )
                  } else {
                    setActiveItems([...activeItems, item.value])
                    onChange([...activeItems, item.value])
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
    </div>
  )
}
