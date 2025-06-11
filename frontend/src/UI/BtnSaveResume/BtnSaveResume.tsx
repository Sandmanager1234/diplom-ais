import { useRef, useState, FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'store'

import { getApplicantEdit } from '../../utils/getApplicantEdit'
import { clearFields } from '../../store/slices/createResumeSlice'
import ApplicantEditError from './components/ApplicantEditError'
import { resumesApi } from '../../services/resumesApi/resumesApi'

import styles from './BtnSaveResume.module.css'

interface IBtnSaveResume {
  disabled: boolean
}

export const BtnSaveResume: FC<IBtnSaveResume> = ({ disabled }) => {
  const { fields } = useAppSelector((state) => state.createResume)
  const mas = { ...fields }

  const [isModalError, setModalError] = useState(false)

  const navigate = useNavigate()
  const btnRef = useRef()
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const handleCreateResume = () => {
    btnRef.current.disabled = true
    const postBody = getApplicantEdit(mas)
    if (id != undefined) {
      resumesApi
        .editApplicant({
          id: id,
          ...postBody,
          favouriteListIds: fields.favouriteListIds,
        })
        .then((res) => {
          fields.state === 'draft' && resumesApi.editStatusApplicant(id, 'new')
          dispatch(clearFields())
          if (res.ok) {
            dispatch(clearFields())
            navigate(`/applicant/${id}`)
          }
          if (res.status === 422) {
            setModalError(true)
          } else if (!res.ok) {
            dispatch(clearFields())
            navigate(`/applicant/${id}`)
            throw new Error(
              `Could not fetch https://ais.reliab.tech/api/applicants, received ${res.status}`
            )
          }
          dispatch(clearFields())
          btnRef.current.disabled = false
        })
        .finally(() => {
          dispatch(clearFields())
          // dispatch(setEdit(false))
        })
    } else {
      resumesApi
        .createApplicant(postBody)
        .then(() => navigate('/'))
        .finally(() => {
          dispatch(clearFields())
          btnRef.current.disabled = false
          navigate('/')
        })
    }
  }

  return (
    <button
      ref={btnRef}
      disabled={disabled}
      type={'button'}
      className={styles.btnSaveResume}
      onClick={() => handleCreateResume()}
    >
      Сохранить
      <ApplicantEditError active={isModalError} setActive={setModalError} />
    </button>
  )
}
