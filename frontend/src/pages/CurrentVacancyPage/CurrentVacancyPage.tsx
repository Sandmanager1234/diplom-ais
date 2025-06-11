import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Loader } from 'UI'
import { useAppDispatch, useAppSelector } from 'store'

import { fetchVacancyById } from 'store/reducers/currentVacancyReducer'
import { selectCurrentVacancy, selectLoadingSatusOfCurrentVacancy } from 'store/selectors/currentVacancySelector'
import { LoadingStatus } from 'store/data/models'

import { Header, VacancyInfo } from './components'

import style from './CurrentVacancyPage.module.css'
import { ListItem } from '../../types'
import { vacanciesApi } from '../../services/vacanciesApi/vacanciesApi'
import { userApi } from '../../services/userApi/userApi'
import { IUser } from '../../types/user'
import { InformationBlock } from './components/VacancyInfo/components'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const CurrentVacancyPage = () => {
  const loadingStatus = useAppSelector(selectLoadingSatusOfCurrentVacancy)
  const vacancy = useAppSelector(selectCurrentVacancy)
  const [listChange, setListChange] = useState<ListItem[]>([])
  const dispatch = useAppDispatch()
  const [profile, setProfile] = useState<IUser | null>(null)

  const { id } = useParams()

  useEffect(() => {
    userApi.getUser().then((res) => setProfile(res))
  }, [])

  useEffect(() => {
    vacanciesApi.getInteractionsVacancy(id).then((res) => {
      setListChange(res)
    })
  }, [id])

  useEffect(() => {
    if (id) {
      dispatch(fetchVacancyById(id))
    }
  }, [id])

  if (loadingStatus === LoadingStatus.PENDING) return <Loader />

  return (
    <div className={style.currentVacancyPageWrapper}>
      <Header />
      <div className={style.content}>
        <VacancyInfo />
        <div className={style.vacancyInformation}>
          <InformationBlock>
            <InformationBlock.Description>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className={style.description}
              >
                {vacancy?.description}
              </ReactMarkdown>
            </InformationBlock.Description>
          </InformationBlock>
        </div>
      </div>
    </div>
  )
}

export default CurrentVacancyPage
