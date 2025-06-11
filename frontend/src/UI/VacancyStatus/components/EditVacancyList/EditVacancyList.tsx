import { FC, useRef, useState, MouseEvent } from "react"
import styles from './EditVacancyList.module.css'
import { useClickOutside } from "hooks"
import { Icon } from "UI/Icon"
import classNames from "classnames"

const EditVacancyList: FC = () => {
  const onChangeIsOpenEditVacancy = (event: MouseEvent) => {
    event.stopPropagation()
    setShowEditVacancy(true)
  }
  const [showEditVacancy, setShowEditVacancy] = useState(false)

  const clickRef = useRef(null)

  const onClose = () => setShowEditVacancy(false)
  useClickOutside(clickRef, onClose)

  const editVacancyStyle = classNames({
    [styles.editVacancyList]: showEditVacancy,
    [styles.hidden]: !showEditVacancy
  })

  return (
    <div className={styles.editVacancyField}>
      <button className={styles.button} onClick={onChangeIsOpenEditVacancy}>
        <Icon.MoreVertical />
      </button>
      <div className={editVacancyStyle} ref={clickRef}>
        <div className={styles.editVacancyChoice}><Icon.Edit />Редактировать вакансию</div>
        <div className={styles.editVacancyChoice}><Icon.Trash />Удалить вакансию</div>
      </div>
    </div>
  )
}

export default EditVacancyList