import { useEffect, useLayoutEffect, useState } from 'react'

import { Icon, LoaderDots } from 'UI'
import { useAppDispatch, useAppSelector } from 'store'

import { loadMoreResumes } from 'store/slices/resumeSlice'
import { LoadingStatus } from 'store/data/models'
import { ApplicantCard } from 'services/resumesApi/models'
import { useScrollVisibility } from 'hooks/useScrollVisibility'
import { getSortedCards } from 'utils/getSortedCards'
import SortCardsCheckbox from 'UI/SortCardsCheckbox'

import { EmptyList } from '../EmptyList'
import ResumeCard from '../ResumeCard'

import styles from './ResumesList.module.css'

export const ResumesList = () => {
  const resumeData = useAppSelector((state) => state.resumes.resumes)
  const { loadingStatus } = useAppSelector((state) => state.resumes)
  const dispatch = useAppDispatch()

  const [showBtn, setShowBtn] = useState(false)
  const [isSortedByDateAddedAsc, setIsSortedByDateAddedAsc] = useState(true)

  const scrollTop = () => window.scrollTo({ top: 0 })

  useLayoutEffect(() => {
    scrollTop()
  }, [])

  useEffect(() => useScrollVisibility(setShowBtn), [])

  const scrollHandler = () => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      dispatch(loadMoreResumes())
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => document.removeEventListener('scroll', scrollHandler)
  }, [])

  if (resumeData.length === 0 && loadingStatus === LoadingStatus.PENDING) {
    return (
      <div>
        <LoaderDots />
      </div>
    )
  }
  const sortedResumeData = getSortedCards<ApplicantCard>(
    resumeData,
    isSortedByDateAddedAsc
  )
  return (
    <>
      {sortedResumeData.length !== 0 ? (
        <div className={styles.resumesList}>
          <SortCardsCheckbox
            checked={isSortedByDateAddedAsc}
            setChecked={setIsSortedByDateAddedAsc}
          />
          {sortedResumeData.map((applicant, index) => (
            <ResumeCard key={index} applicant={applicant} />
          ))}
          {loadingStatus === LoadingStatus.PENDING && (
            <div className={styles.loader}>
              <LoaderDots />
            </div>
          )}
          {showBtn && (
            <button className={styles.btnContentUp} onClick={scrollTop}>
              <Icon.ContentUp />
            </button>
          )}
        </div>
      ) : (
        <EmptyList />
      )}
    </>
  )
}
