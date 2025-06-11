import { useEffect, useRef, useState, MouseEvent } from 'react'
import { Icon, Tabs } from 'UI'
import { useClickOutside, useDebounce } from 'hooks'
import { useAppDispatch, useAppSelector } from 'store'

import {
  searchResumesThunk,
  setResumes,
  setTabRequestsCondition,
  loadMoreResumes,
  loadMoreTaggedResumes,
  resetLoadedData,
} from 'store/slices/resumeSlice'
import {
  setPage,
  setPosition,
  setSize,
  SetSkill,
  setIsActiveFilters, SetViewResume,
} from 'store/slices/filterResumeSlice'
import { Condition, conditions } from './constants/conditions'
import { directoryApi } from 'services/directoryApi/directoryApi'
import { resumesApi } from 'services/resumesApi/resumesApi'
import { LoadingStatus } from 'store/data/models'
import { Filters } from '../Filters'
import Buttons from './Components/Buttons'
import styles from './SearchBar.module.css'
import { resetData } from '../../../../store/reducers/taggedResumesReducer'

interface IProps {
  isResumeTable?: boolean
}

export const SearchBar = ({ isResumeTable }: IProps) => {
  const dispatch = useAppDispatch()
  const { filteringFields } = useAppSelector((state) => state.filterResume)
  const {
    currentResume,
    isModalWindowDelete,
    tabRequests,
    loadingStatus,
    activeTab,
  } = useAppSelector((state) => state.resumes)

  const [showFilters, setShowFilters] = useState(false)

  const [showSearchBar, setShowSearchBar] = useState(false)

  const filters = useRef<HTMLDivElement>(null)
  const searchBar = useRef<HTMLFormElement>(null)

  const onChangeVisibilityOfFilters = () => {
    setShowFilters((prev) => !prev)
    dispatch(setIsActiveFilters(true))
  }

  const onCloseFilters = () => {
    setShowFilters(false)
    // dispatch(setIsActiveFilters(false))
  }

  const onHideSearchBar = () => setShowSearchBar(false)

  useClickOutside(filters, ()=>{
    onCloseFilters })
  useClickOutside(searchBar, onHideSearchBar)

  const [searchValue, setSearchValue] = useState('')
  const [fastFilteringData, setFastFilteringData] = useState([])
  const [fastFilterIndex, setFastFilterIndex] = useState({ activeFilter: -1 })
  const [directory, setDirectory] = useState([])
  const [listSuggest, setListSuggest] = useState([])
  const {isActiveFilters } = useAppSelector(
    (state) => state.filterResume
  )

  const activeFastFilter = (fastFilter: string, index: number) => {
    if (
      fastFilterIndex.activeFilter !== index &&
      fastFilter != filteringFields.position
    ) {
      setFastFilterIndex({ activeFilter: index })
      dispatch(setPosition(fastFilter))
      dispatch(setPage(0))
    } else {
      dispatch(setPosition(''))
      dispatch(setSize(''))
      setFastFilterIndex({ activeFilter: -1 })
    }
  }

  useEffect(() => {
    changeTabValue(Condition.ALL)
  }, [dispatch])

  const clearTables = () => {
    dispatch(resetData())
    dispatch(resetLoadedData())
  }

  const loadResumes = () => {
    if (isResumeTable) dispatch(loadMoreTaggedResumes())
    else dispatch(loadMoreResumes())
  }

  useEffect(() => {
    clearTables()
    loadResumes()
  }, [tabRequests])

  const clickOnItemSuggest = (value: never) => {
    setListSuggest(
      !listSuggest.map((item: any) => item.valueId).includes(value.valueId)
        ? [...listSuggest, value]
        : listSuggest
    )
    setSearchValue('')
  }

  const [func, setFunc] = useState(false)

  const [isFastFilterLoaded, setIsFastFilterLoaded] = useState<boolean>(false)

  const search = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (searchValue === 'ifelse') {
      setFunc(true)
      setTimeout(() => {
        setFunc(false)
      }, 1000)
    }
    e.preventDefault()
    clearTables()

    if (!!listSuggest.length) {
      dispatch(searchResumesThunk(listSuggest))
    } else {
      loadResumes()
    }
  }
  //todo скрыто до переработки
  //useEffect(() => {
  //  statsApi.getFastFiltersFavourites().then((res) => {
  //    setFastFilteringData([res.data])
  //    setTimeout(() => {
  //      setIsFastFilterLoaded(true)
  //    }, 1000)
  //  })
  //}, [])

  useEffect(() => {
    if (currentResume.id !== '' && !isModalWindowDelete) {
      resumesApi.getApplicants({ ids: currentResume.id }).then(({ data }) => {
        dispatch(setResumes(data.content))
      })
    }
    //todo скрыто до переработки
    //if (fastFilteringData.length == 0) {
    //  statsApi.getFastFilters().then((res) => {
    //    setFastFilteringData(res.data)
    //    setTimeout(() => {
    //      setIsFastFilterLoaded(true)
    //    }, 1000)
    //  })
    //}
  }, [
    filteringFields.position,
    filteringFields.skills,
    currentResume.id,
    filteringFields.page,
    filteringFields.size,
    fastFilterIndex,
  ])

  //todo скрыто до переработки
  //useEffect(() => {
  //  statsApi.getFastFilters().then((res) => {
  //    setFastFilteringData(res.data)
  //    setTimeout(() => {
  //      setIsFastFilterLoaded(true)
  //    }, 1000)
  //  })
  //}, [resumes])

  useEffect(() => {
    setFastFilteringData(
      fastFilteringData.filter((item: any) => item.name !== null)
    )
  }, [fastFilteringData.length])

  const debouncedSearchValue = useDebounce(searchValue)

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

  function applicantInfo(fields: {
    mobile_phone: string
    e_mail: string
    position: string
  }) {
    if ((fields.mobile_phone || fields.e_mail) && fields.position) {
      return (
        <div className={styles.applicantInfo}>
          {fields.mobile_phone || fields.e_mail}
          <div className={styles.circle}></div>
          {fields.position}
        </div>
      )
    } else if ((fields.mobile_phone || fields.e_mail) && !fields.position) {
      return fields.mobile_phone || fields.e_mail
    }
  }

  const changeTabValue = (newValue: Condition) => {
    dispatch(setTabRequestsCondition(newValue))
  }

  const onChangeTabs = (newValue: Condition) => {
    changeTabValue(newValue)
  }

  return (
    <div className={styles.wrap}>
      {func ? (
        <div className={styles.java}>
          <Icon.Java />
        </div>
      ) : null}
      <div className={styles.wrapPageName}>
        <h2 className={styles.pageName}>
          {isResumeTable ? 'Доска резюме' : 'Резюме'}
        </h2>
        <div className={styles.navLinks}>
          <Buttons />
        </div>
      </div>
      <Tabs
        tabsCondition={activeTab}
        handleChange={onChangeTabs}
        items={conditions}
        disabled={loadingStatus === LoadingStatus.PENDING}
      />
      <div className={styles.search}>
        <form className={styles.searchBar} ref={searchBar}>
          {listSuggest.length > 0 && (
            <div className={styles.suggests}>
              {listSuggest.map((sug: any, index) => (
                <div key={index} className={styles.sug}>
                  <div>{sug.value}</div>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      setListSuggest(listSuggest.filter((item) => item !== sug))
                    }}
                  >
                    <Icon.Close />
                  </button>
                </div>
              ))}
            </div>
          )}
          <input
            placeholder={
              !listSuggest.length ? 'Поиск' : 'Поиск возможен по одному тегу'
            }
            disabled={listSuggest.length > 0}
            type='text'
            maxLength={75}
            value={searchValue}
            onKeyDown={(e) =>
              ['.', ',', '+'].includes(e.key) ||
              ([' '].includes(e.key) &&
                searchValue.length < 2 &&
                e.preventDefault())
            }
            onChange={(e) => {
              setSearchValue(e.target.value)
              setShowSearchBar(true)
            }}
          />
          {searchValue.length > 0 && (
            <button
              className={styles.reset}
              onClick={() => {
                dispatch(setPosition(''))
                dispatch(SetSkill(''))
                setSearchValue('')
                setListSuggest([])
              }}
            >
              <Icon.Close />
            </button>
          )}
          <button
            type='submit'
            className={styles.submitBtn}
            onClick={(e) => search(e)}
          >
            Найти
          </button>
        </form>
        <div
          className={
            showSearchBar && directory?.length ? styles.suggest : styles.hidden
          }
        >
          {directory?.map((item: any, index) => (
            <button
              key={index}
              onClick={() => clickOnItemSuggest(item)}
              className={styles.suggestItem}
            >
              {item.value}
              <div className={styles.directoryType}>
                {item.directoryType == 'POSITION'
                  ? 'Должность'
                  : item.directoryType == 'SKILL'
                  ? 'Навык'
                  : applicantInfo(item?.entityFields)}
              </div>
            </button>
          ))}
        </div>
        <button onClick={onChangeVisibilityOfFilters} className={styles.grey}>
          <Icon.SettingsSlider />
          <div className={styles.titleFilter}>Фильтры</div>
        </button>
        <div style={{ position: 'absolute' }} ref={filters}>
          <Filters
            isActive={isActiveFilters}
            setFastFilterIndex={setFastFilterIndex}
          />
        </div>
      </div>
      {/*todo скрыто до переработки*/}
      {/*<div className={styles.btnFilters}>*/}
      {/*  {quickFilterButtons.length && isFastFilterLoaded ? (*/}
      {/*    quickFilterButtons.map((fastFilter: any, index) => (*/}
      {/*      <button*/}
      {/*        key={index}*/}
      {/*        onClick={() => activeFastFilter(fastFilter.name, index)}*/}
      {/*        className={*/}
      {/*          fastFilter.name == filteringFields.position*/}
      {/*            ? styles.activeFastFilter*/}
      {/*            : styles.fastFilter*/}
      {/*        }*/}
      {/*      >*/}
      {/*        <div className={styles.description}>*/}
      {/*          {fastFilter?.russianName}*/}
      {/*        </div>*/}
      {/*        <div>{fastFilter.count}</div>*/}
      {/*      </button>*/}
      {/*    ))*/}
      {/*  ) : isFastFilterLoaded && quickFilterButtons.length === 0 ? (*/}
      {/*    <div></div>*/}
      {/*  ) : (*/}
      {/*    <div style={{ display: 'flex', gap: '15px' }}>*/}
      {/*      <div className={styles.template}></div>*/}
      {/*      <div className={styles.template}></div>*/}
      {/*      <div className={styles.template}></div>*/}
      {/*      <div className={styles.template}></div>*/}
      {/*      <div className={styles.template}></div>*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</div>*/}
    </div>
  )
}
