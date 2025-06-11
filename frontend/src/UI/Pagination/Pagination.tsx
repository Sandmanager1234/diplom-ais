import { useEffect, useRef, useState } from 'react'

import { useAppDispatch, useAppSelector } from 'store'
import { Icon } from 'UI'
import { setPage, setSize } from 'store/slices/filterResumeSlice'
import { setPagination as PaginationFavourites } from 'store/slices/favouritesSlice'
import { setPagination as PaginationTasks } from 'store/slices/taskSlice'
import { setPagination } from 'store/slices/notificationSlice'
import { setResumes } from 'store/slices/resumeSlice'

import { resumesApi } from 'services/resumesApi/resumesApi'

import { useClickOutside } from 'hooks'

import styles from './Pagination.module.css'

export const Pagination = (props: {
  currentPage: number
  totalPages: number
  totalElements: number
  size: number | string
  type: string
}) => {
  const { currentPage, totalPages, totalElements, size, type } = props

  const dispatch = useAppDispatch()
  const { pagination: paginationFavourites } = useAppSelector(
    (state) => state.favourites
  )
  const { pagination: paginationTasks } = useAppSelector((state) => state.tasks)
  const { pagination: paginationNotification } = useAppSelector(
    (state) => state.notifications
  )

  const [disableButtonsPagination, setDisableButtonsPagination] =
    useState(false)
  const [countResumesPerPage, setCountResumesPerPage] = useState(size)

  const ref = useRef<HTMLInputElement>(null)

  const [isActive, setIsActive] = useState(false)

  useClickOutside(ref, ()=>setIsActive(false))

  const prevPage = () => {
    type === 'ResumeList' && dispatch(setPage(currentPage - 1))
    type === 'FavouritesPage' &&
      dispatch(
        PaginationFavourites({
          ...paginationFavourites,
          number: currentPage - 1,
        })
      )
    type === 'Tasks' &&
      dispatch(PaginationTasks({ ...paginationTasks, number: currentPage - 1 }))
    type === 'Notification' &&
      dispatch(
        setPagination({ ...paginationNotification, number: currentPage - 1 })
      )
    resumesApi
      .getApplicants(`page=${currentPage - 1}&size=10`)
      .then(({data}) => {
        dispatch(setResumes(data.content))
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
  }

  const nextPage = () => {
    type === 'ResumeList' && dispatch(setPage(currentPage + 1))
    type === 'FavouritesPage' &&
      dispatch(
        PaginationFavourites({
          ...paginationFavourites,
          number: currentPage + 1,
        })
      )
    type === 'Tasks' &&
      dispatch(PaginationTasks({ ...paginationTasks, number: currentPage + 1 }))
    type === 'Notification' &&
      dispatch(
        setPagination({ ...paginationNotification, number: currentPage + 1 })
      )
    resumesApi
      .getApplicants(`page=${currentPage + 1}&size=10`)
      .then(({data}) => {
        dispatch(setResumes(data.content))
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
  }

  useEffect(() => {
    const count = countResumesPerPage
    count > 20 || !count
      ? setDisableButtonsPagination(true)
      : setDisableButtonsPagination(false)
    if (!isActive && !disableButtonsPagination && count != totalElements) {
      setCountResumesPerPage(count || 20)
      type === 'ResumeList' && dispatch(setSize(count || 20))
      type === 'FavouritesPage' &&
        dispatch(
          PaginationFavourites({ ...paginationFavourites, size: count || 20 })
        )
      type === 'Tasks' &&
        dispatch(PaginationTasks({ ...paginationTasks, size: count || 20 }))
      type === 'Notification' &&
        dispatch(
          setPagination({ ...paginationNotification, size: count || 20 })
        )
    }
    count > totalElements && setCountResumesPerPage(totalElements)
  }, [isActive, countResumesPerPage, disableButtonsPagination])

  return (
    <form className={styles.pagination} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.listPages}>
        <button
          disabled={currentPage < 1 || disableButtonsPagination}
          onClick={prevPage}
          className={styles.leftArrow}
        >
          <Icon.ArrowChewronRight />
        </button>
        <div className={styles.numPages}>
          <span>{currentPage + 1}</span> - {totalPages}
        </div>
        <button
          disabled={
            totalElements < countResumesPerPage ||
            currentPage + 1 >= totalPages ||
            disableButtonsPagination
          }
          onClick={nextPage}
          className={styles.rightArrow}
        >
          <Icon.ArrowChewronRight />
        </button>
      </div>
      <div className={styles.numCards}>
        <div>Количество карточек на странице</div>
        <input
          type='text'
          className={
            countResumesPerPage < 21 && countResumesPerPage !== ''
              ? styles.quantity
              : styles.quantityInvalid
          }
          ref={ref}
          required={true}
          value={countResumesPerPage}
          max={20}
          onKeyDown={(e) =>
            e.key == 'Enter' && !disableButtonsPagination && setIsActive(false)
          }
          onChange={(e) => {
            setIsActive(true)
            setCountResumesPerPage(
              e.target.value
                .replace(/\D/g, '')
                .replace(/^\s/, '')
                .replace(/^0/, '')
                .substr(0, 2)
            )
          }}
        />
        {disableButtonsPagination && (
          <div className={styles.error}>{`Введите значение от 1 до 20`}</div>
        )}
      </div>
    </form>
  )
}
