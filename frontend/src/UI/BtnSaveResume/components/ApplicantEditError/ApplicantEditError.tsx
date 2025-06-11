import { FC, Dispatch } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Icon } from 'UI/index'

import styles from './ApplicantEditError.module.css'

interface IApplicantEditErrorProps {
  active: boolean
  setActive: Dispatch<boolean>
}

export const ApplicantEditError: FC<IApplicantEditErrorProps> = (props) => {

  const { active, setActive } = props

  const { id } = useParams()

  const navigate = useNavigate()

  return (
    <div className={active ? styles.modalActive : styles.hidden} onClick={() => {
      navigate(`/applicant/${id}`)
      setActive(false)
    }}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeModal}
                onClick={() => {
                  navigate(`/applicant/${id}`)
                  setActive(false)
                }}
        ><Icon.Cross/></button>
        <div className={styles.wrap}>
          <div className={styles.title}>Ошибка</div>
          <div className={styles.subTitle}>В процессе редактирования Вами, карточка резюме была уже отредактирована другим
            пользователем. Проверьте внесенные изменения.
          </div>
          <button className={styles.btnDelete} type={'button'} onClick={() => {
            navigate(`/applicant/${id}`)
            setActive(false)
          }}>Ок
          </button>
        </div>
      </div>
    </div>

  )
}