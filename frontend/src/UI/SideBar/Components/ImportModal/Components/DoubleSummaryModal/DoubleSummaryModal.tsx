import { FC, Dispatch } from 'react'

import { useAppDispatch } from 'store'

import { setResumes } from 'store/slices/resumeSlice'
import { importResumeApi } from 'services/importResumeApi/importResumeApi'
import { resumesApi } from 'services/resumesApi/resumesApi'

import styles from '../../../../../../pages/Profile/components/Tasks/Components/TaskCard/Components/DeleteTask/DeleteTask.module.css'

interface IDoubleSummaryModalProps {
  setDoubleSummary: Dispatch<boolean>
  isDoubleSummary: boolean
  document: any
  setMainActive: Dispatch<boolean>
}

export const DoubleSummaryModal: FC<IDoubleSummaryModalProps> = (props) => {
  const { setDoubleSummary, isDoubleSummary, document, setMainActive } = props

  const dispatch = useAppDispatch()

  const clickCancel = () => {
    setDoubleSummary(false)
    setMainActive(false)
  }

  const clickDelete = () => {
    const formData = new FormData()
    for (let i = 0; i < document.length; i++) {
      if (
        document
          .at(i)
          .name.substring(document.at(i).name.lastIndexOf('.') + 1) === 'docx'
      ) {
        formData.append('document', document.at(i))
      }
    }
    importResumeApi
      .importApplicant('CV_HEAD_HUNTER', formData, false)
      .then(() => {
        resumesApi.getApplicants(`page=0&size=10`).then(({data}) => {
          dispatch(setResumes(data.content))
          setDoubleSummary(false)
          setMainActive(false)
        })
      })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Импортировать резюме</div>
      <div className={styles.subTitle}>
        Импортируемая карточка ранее была загружена в систему. Вы уверены, что
        хотите продолжить сохранение?
      </div>
      <div className={styles.wrapBtn}>
        <button
          className={styles.btnCancel}
          type={'button'}
          onClick={clickCancel}
        >
          Отмена
        </button>
        <button
          className={styles.btnDelete}
          type={'button'}
          onClick={clickDelete}
        >
          Да
        </button>
      </div>
    </div>
  )
}
