import { useEffect, useRef, useState } from 'react'
import { Icon } from 'UI'
import { useClickOutside, useDebounce } from 'hooks'
import { useAppDispatch, useAppSelector } from 'store'
import {
  setResumes,
  loadMoreResumes,
  setCurrentPage,
  setTotalCount,
} from 'store/slices/resumeSlice'

import Ellipse from '../../../../assets/images/ellipse.svg'
import { directoryApi } from 'services/directoryApi/directoryApi'
import { resumesApi } from 'services/resumesApi/resumesApi'
import styles from './ShortSearchBar.module.css'
import { useParams } from 'react-router-dom'
import { vacanciesApi } from '../../../../services/vacanciesApi/vacanciesApi'
import { fetchVacancyById } from '../../../../store/reducers/currentVacancyReducer'
import { ISuggestionsDTO } from '../../../../services/models'

interface IProps {
  setOpenModal: (value: boolean) => void
}

const ShortSearchBar = (props: IProps) => {
  const { setOpenModal } = props
  const dispatch = useAppDispatch()
  const { currentResume, isModalWindowDelete, tabRequests } = useAppSelector(
    (state) => state.resumes
  )
  const { id } = useParams()
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [directory, setDirectory] = useState([])
  const [listSuggest, setListSuggest] = useState<ISuggestionsDTO[]>([])
  const searchBar = useRef<HTMLFormElement>(null)
  useClickOutside(searchBar, () => setShowSearchBar(false))

  const debouncedSearchValue = useDebounce(searchValue)
  const handleSubmit = () => {
    if (id) {
      vacanciesApi
        .addApplicantToVacancy(id, listSuggest[0].valueId)
        .then(() => {
          dispatch(fetchVacancyById(id))
          setOpenModal(false)
        })
    }
  }

  const clickOnItemSuggest = (value: ISuggestionsDTO) => {
    setListSuggest(
      !listSuggest.map((item) => item.valueId).includes(value.valueId)
        ? [...listSuggest, value]
        : listSuggest
    )
    setSearchValue('')
  }

  useEffect(() => {
    dispatch(setCurrentPage(0))
    dispatch(setTotalCount(1))
  }, [dispatch])

  useEffect(() => {
    dispatch(loadMoreResumes())
  }, [tabRequests])

  useEffect(() => {
    if (currentResume.id !== '' && !isModalWindowDelete) {
      resumesApi.getApplicants({ ids: currentResume.id }).then(({ data }) => {
        dispatch(setResumes(data.content))
      })
    }
  }, [currentResume.id, isModalWindowDelete, dispatch])

  useEffect(() => {
    if (
      debouncedSearchValue?.length >= 3 &&
      searchValue.length >= 3 &&
      debouncedSearchValue.indexOf(' ') !== 0
    ) {
      directoryApi
        .getSuggest(`${searchValue.toLowerCase()}`)
        .then((data: any) => {
          setDirectory(
            data?.POSITION?.concat(data?.SKILL).concat(data?.APPLICANT)
          )
        })
    } else if (debouncedSearchValue === '') {
      setDirectory([])
    }
  }, [searchValue, listSuggest, debouncedSearchValue])

  return (
    <>
      <div className={styles.title}>
        <h2>Добавить кандидата</h2>
        <button
          className={styles.closeModal}
          onClick={() => {
            setOpenModal(false)
          }}
        >
          <Icon.Cross />
        </button>
      </div>
      <div className={styles.wrap}>
        <div className={styles.search}>
          <form
            className={styles.searchBar}
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            ref={searchBar}
          >
            {listSuggest && (
              <div className={styles.suggests}>
                {listSuggest.map((sug: ISuggestionsDTO) => (
                  <div key={sug.valueId} className={styles.sug}>
                    <div>{sug.value}</div>
                  </div>
                ))}
              </div>
            )}
            <div className={styles.inputWrapper}>
              <input
                disabled={!!listSuggest.length}
                type='text'
                maxLength={75}
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value)
                  setShowSearchBar(true)
                }}
              />
              {searchValue && (
                <button
                  className={styles.reset}
                  onClick={() => {
                    setSearchValue('')
                    setListSuggest([])
                  }}
                >
                  <Icon.Close />
                </button>
              )}
            </div>
            <div
              className={
                showSearchBar && directory?.length
                  ? styles.suggest
                  : styles.hidden
              }
            >
              {directory?.map((item: ISuggestionsDTO) => (
                <button
                  key={item.valueId}
                  onClick={() => clickOnItemSuggest(item)}
                  className={styles.suggestItem}
                  type='button'
                >
                  {item.value}
                  <div className={styles.entityFields}>
                    {item?.entityFields?.mobile_phone && (
                      <span>{item.entityFields.mobile_phone}</span>
                    )}
                    {item?.entityFields?.position && (
                      <>
                        <Ellipse classname={styles.ellipse} />
                        <span className={styles.directoryType}>
                          {item.directoryType === 'POSITION'
                            ? 'Должность'
                            : item.directoryType === 'SKILL'
                            ? 'Навык'
                            : item.entityFields?.position}
                        </span>
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <button type='submit' className={styles.submitBtn}>
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
export default ShortSearchBar
