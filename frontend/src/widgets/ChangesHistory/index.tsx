import React, { FormEvent, SetStateAction, useEffect, useState } from 'react'

import { ChangeModalDelete } from './Components'
import styles from './ChangesHistory.module.css'
import { ListItem } from '../../types'
import { IUser } from '../../types/user'

export interface IChangesHistory {
  id: string
  listChange: ListItem[]
  setListChange: (listChange: ListItem[]) => void
  dictionaryComments: NonNullable<unknown>
  setDictionaryComments: (value: SetStateAction<NonNullable<unknown>>) => void
  addNewComment: (id: string, comment: string) => void
  profile: IUser | null
  deleteHandler: (
    deleteId: string | null,
    setActive: (value: string | null) => void
  ) => void
  deleteId: string | null
  setDeleteId: (value: string | null) => void
  editHandler: (
    e: FormEvent<HTMLFormElement>,
    currentEdit: string,
    setCurrentEdit: (value: string) => void,
    comment: string,
    setComment: (value: string) => void
  ) => void
}

export const ChangesHistory = ({
  id,
  listChange,
  addNewComment,
  profile,
  deleteHandler,
  editHandler,
  deleteId,
  setDeleteId,
}: IChangesHistory) => {
  const [comment, setComment] = useState<string>('')

  const open = () => deleteId

  const [currentEdit, setCurrentEdit] = useState<string>('')
  const [errorComment, setErrorComment] = useState(false)
  const [isFocusArea, setFocusArea] = useState(false)
  const [editComment, setEditComment] = useState<string>('')
  const [isFocusedEditArea, setFocusedEditArea] = useState(false)

  useEffect(() => {
    setCurrentEdit('')
    setComment('')
    setFocusArea(false)
    setDeleteId(null)
  }, [listChange])

  const createComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (profile) {
      addNewComment(id, comment)
      setComment('')
      setDeleteId(null)
      setErrorComment(false)
      setFocusArea(false)
    }
  }
  const validateForm = (e: React.FormEvent) => {
    e.preventDefault()
    if (comment.length > 500) {
      setErrorComment(true)
    } else if (!comment.trim().length) {
      setErrorComment(true)
    } else {
      createComment(e)
    }
  }
  return (
    <div className={styles.modalHistory}>
      <div className={styles.titleChange}>История изменений</div>
      <div className={styles.listChangeWrapper}>
        <div className={styles.listChange}>
          {!!listChange.length &&
            listChange.map(
              (item) =>
                item && (
                  <div className={styles.listChangeItem} key={item.id}>
                    <div className={styles.listItemFio}>{item.system ? 'Системное уведомление' : item.fio}</div>
                    <div className={styles.listItemComment}>{item.comment.replace(/^['"](.*)['"]$/, '$1')}</div>
                    <div className={styles.listItemDate}>
                      {new Date(item.timeCreate).toLocaleDateString()}
                    </div>
                    {!item.system && currentEdit !== item.id && (
                      <div className={styles.btnWrapComment}>
                        <button
                          className={styles.btnComment}
                          disabled={currentEdit === item.id}
                          onClick={() => {
                            setCurrentEdit(item.id)
                            setEditComment(item.comment)
                          }}
                        >
                          Редактировать
                        </button>
                        <button
                          className={styles.btnComment}
                          disabled={currentEdit === item.id}
                          onClick={() => {
                            setDeleteId(item.id)
                            open()
                          }}
                        >
                          Удалить
                        </button>
                      </div>
                    )}
                    {!item.system && currentEdit === item.id && (
                      <form
                        className={styles.formComment}
                        onSubmit={(e) => {
                          editHandler(
                            e,
                            currentEdit,
                            setCurrentEdit,
                            editComment,
                            setEditComment
                          )
                        }}
                      >
                        <textarea
                          className={
                            isFocusedEditArea && !editComment.trim().length
                              ? styles.inputTextError
                              : styles.inputText
                          }
                          value={editComment}
                          minLength={1}
                          required
                          onBlur={() => setFocusedEditArea(true)}
                          onChange={(e) => setEditComment(e.target.value)}
                          placeholder='Комментарий'
                        />
                        {isFocusedEditArea && !editComment.trim().length && (
                          <div className={styles.error}>
                            Введено недопустимое значение поля "Комментарий"
                          </div>
                        )}
                        <div className={styles.buttonsAddChange}>
                          <button
                            className={styles.closeForm}
                            type='button'
                            onClick={(e) => {
                              e.preventDefault()
                              setCurrentEdit('')
                              setEditComment('')
                            }}
                          >
                            Отмена
                          </button>
                          <button className={styles.submitForm} type='submit'>
                            Сохранить
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )
            )}
        </div>
        <ChangeModalDelete
          deleteId={deleteId}
          setDeleteId={setDeleteId}
          deleteHandler={deleteHandler}
        />
      </div>
      <div className={styles.addChange}>
        <form className={styles.formNewComment}>
          <div className={styles.inputWrapper}>
            <input
              className={
                isFocusArea && !comment.trim().length
                  ? styles.inputTextError
                  : styles.inputText
              }
              value={comment}
              maxLength={250}
              onBlur={() => setFocusArea(true)}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Комментарий'
            />
            {isFocusArea && !comment.trim().length && (
              <div className={styles.error}>
                Введено недопустимое значение поля "Комментарий"
              </div>
            )}
          </div>
          <button
            className={styles.submitForm}
            type='submit'
            onClick={validateForm}
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  )
}
