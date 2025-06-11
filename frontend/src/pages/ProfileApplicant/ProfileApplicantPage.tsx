import { FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { LoaderDots } from 'UI'
import { useAppDispatch, useAppSelector } from 'store'

import { resumesApi } from 'services/resumesApi/resumesApi'
import { LoadingStatus } from 'store/data/models'
import { fetchApplicant, viewApplicant } from 'store/reducers/applicantReducer'
import { addApplicant, updateApplicant } from 'store/slices/resumeSlice'

import {
  AddDocumentsModal,
  Header,
  Modal,
  PersonalData,
  ProfessionalData,
} from './components'

import { directoryApi } from '../../services/directoryApi/directoryApi'
import { userApi } from '../../services/userApi/userApi'
import { addDictionary } from '../../store/slices/dictionariesSlice'
import { ListItem } from '../../types'
import { IUser } from '../../types/user'
import { ChangesHistory } from '../../widgets/ChangesHistory'
import styles from './ProfileApplicantPage.module.css'

export const ProfileApplicantPage = () => {
  const dispatch = useAppDispatch()
  const [selectedTab, setSelectedTab] = useState<string>('PersonalData')
  const [isActiveDocumentsModal, setIsActiveDocumentsModal] = useState(false)
  const [listChange, setListChange] = useState<ListItem[]>([])
  const [dictionaryComments, setDictionaryComments] = useState({})
  const [profile, setProfile] = useState<IUser | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>('')

  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>() as { id: string }

  const { applicant, loadingStatus } = useAppSelector(
    (state) => state.applicant
  )
  const allApplicantCards = useAppSelector((state) => state.resumes.resumes)

  const handleChangeTab = (_, value) => {
    setSelectedTab(value)
  }

  useEffect(() => {
    dispatch(fetchApplicant(id))
      .catch(() => navigate('/'))
      .then(() => dispatch(viewApplicant(id)))
    userApi.getUser().then((res) => {
      setProfile(res)
    })
  }, [])

  useEffect(() => {
    if (selectedTab === 'History') {
      directoryApi.getDirectory('comment').then((res) => {
        setDictionaryComments(
          Object.fromEntries(
            res.map((n: { value: string; description: string }) => [
              n.description,
              n.description,
            ])
          )
        )
        dispatch(
          addDictionary({
            name: 'comment',
            value: res.map((item) => ({
              value: item.description,
              description: item.description,
            })),
          })
        )
      })
      resumesApi.getInteractionsApplicant(id).then((res) => {
        setListChange(res)
      })
    }
  }, [selectedTab])

  useEffect(() => {
    resumesApi
      .getApplicant(id)
      .then((res) => {
        const sameApplicant = allApplicantCards.find((a) => a.id === id)

        dispatch(
          sameApplicant
            ? dispatch(updateApplicant({ newApplicant: res, id }))
            : addApplicant(res)
        )
      })
      .catch(() => navigate('/'))
      .then(() => resumesApi.setApplicantToViewed(id))
  }, [applicant])

  if (loadingStatus === LoadingStatus.PENDING) {
    return <LoaderDots />
  }

  const addNewComment = (id: any, comment: any) => {
    resumesApi.addInteractionsApplicant(id, profile?.email, comment).then(() =>
      resumesApi.getInteractionsApplicant(id).then((res) => {
        setListChange(res)
      })
    )
  }

  const editHandler = (
    e: FormEvent<HTMLFormElement>,
    currentEdit: string,
    setCurrentEdit: (value: string) => void,
    editComment: string,
    setEditComment: (value: string) => void
  ) => {
    e.preventDefault()
    resumesApi.editInteractionsApplicant(currentEdit, editComment).then(() =>
      resumesApi.getInteractionsApplicant(id).then((res) => {
        setListChange(res)
        setCurrentEdit('')
        setEditComment('')
      })
    )
  }

  const deleteHandler = (
    deleteId: string | null,
    setDeleteId: (value: string | null) => void
  ) => {
    if (deleteId === null) {
      return null
    }
    resumesApi.deleteInteractionsApplicant(deleteId).then(() => {
      resumesApi.getInteractionsApplicant(id).then((res) => {
        setListChange(res)
      })
      setDeleteId(null)
    })
  }
  return (
    <>
      <div className={styles.resumeItem}>
        <Header status={applicant?.state ?? ''} />
        <div>
          <div className={styles.content}>
            {applicant && (
              <PersonalData
                activeDocumentsModal={isActiveDocumentsModal}
                setActiveDocumentsModal={setIsActiveDocumentsModal}
                applicant={applicant}
              />
            )}
            <div>
              {selectedTab === 'PersonalData' && (
                <ProfessionalData applicant={applicant} />
              )}
              {selectedTab === 'History' && (
                <ChangesHistory
                  id={id}
                  listChange={listChange}
                  setListChange={setListChange}
                  dictionaryComments={dictionaryComments}
                  setDictionaryComments={setDictionaryComments}
                  addNewComment={addNewComment}
                  profile={profile}
                  deleteHandler={deleteHandler}
                  deleteId={deleteId}
                  setDeleteId={setDeleteId}
                  editHandler={editHandler}
                />
              )}
            </div>
          </div>
        </div>
        <Modal
          active={isActiveDocumentsModal}
          setActive={setIsActiveDocumentsModal}
        >
          <AddDocumentsModal
            active={isActiveDocumentsModal}
            setActive={setIsActiveDocumentsModal}
          />
        </Modal>
      </div>
    </>
  )
}
