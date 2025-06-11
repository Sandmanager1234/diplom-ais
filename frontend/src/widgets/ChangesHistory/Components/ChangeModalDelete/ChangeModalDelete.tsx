import styles from './ChangeModalDelete.module.css'
import { createPortal } from 'react-dom'

interface IChangeModalDelete {
  deleteHandler: (
    deleteId: string | null,
    setActive: (value: string | null) => void
  ) => void
  deleteId: string | null
  setDeleteId: (value: string | null) => void
}

export const ChangeModalDelete = (props: IChangeModalDelete) => {
  const { deleteId, setDeleteId, deleteHandler } = props
  if (!deleteId) {
    return null
  }
  return (
    <>
      {createPortal(
        <div className={styles.modal}>
          <div className={styles.wrap}>
            <div className={styles.title}>Удалить комментарий?</div>
            <div className={styles.subTitle}>
              Вы уверены, что хотите удалить комментарий? Все данные будут
              утеряны.
            </div>
            <div className={styles.btnWrap}>
              <button
                className={styles.btnCancel}
                onClick={() => setDeleteId(null)}
              >
                Нет
              </button>
              <button
                className={styles.btnSave}
                onClick={() => deleteHandler(deleteId, setDeleteId)}
              >
                Да
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
