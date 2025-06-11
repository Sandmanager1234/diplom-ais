import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'store'
import { BtnSaveResume, Input } from 'UI'

import {
  setEmail,
  setGit,
  setHabr,
  setLinkedIn,
  setMobilePhone,
  setTelegram,
  setVk,
  setWhatApp,
} from '../../../../store/slices/createResumeSlice'
import { phoneFormat } from '../../../../utils/phoneFormat'
import { CreateResumeStep } from '../../data/models'
import styles from './Contacts.module.css'

interface IContacts {
  activeStep: CreateResumeStep[]
  setActiveStep: React.Dispatch<CreateResumeStep[]>
  currentRef: any
  isEdit: boolean
}

export const Contacts: React.FC<IContacts> = (props) => {
  const { activeStep, setActiveStep, currentRef, isEdit } = props
  const { fields } = useAppSelector((state) => state.createResume)

  const [isValid, setValid] = useState<boolean>(
    currentRef.current?.checkValidity()
  )

  const dispatch = useAppDispatch()
  const { id } = useParams()
  const [focusedPhone, setFocusedPhone] = useState(isEdit)

  useEffect(() => {
    setValid(currentRef.current?.checkValidity())
  }, [activeStep, fields])

  useEffect(() => {
    if (fields.contacts[0]?.value !== undefined) {
      dispatch(
        setMobilePhone({
          type: 'mobile_phone',
          value: phoneFormat(fields.contacts[0]?.value),
        })
      )
    }
  }, [])

  return (
    <form
      className={styles.formStyle}
      ref={currentRef}
      onSubmit={(e: React.KeyboardEvent<HTMLFormElement>) => {
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0)
        e.key !== 'Enter' &&
          setActiveStep(
            activeStep.map((item) =>
              item.id === 2
                ? {
                    ...item,
                    isActive: true,
                    isVisited: true,
                  }
                : { ...item, isActive: false }
            )
          )
      }}
    >
      <div className={styles.wrapContacts}>
        <div className={styles.title}>Контакты</div>
          <div className={styles.inputWrap}>
            <div className={styles.subTitle}>Мобильный телефон *</div>
            <input
              type='text'
              value={
                fields.contacts[0].value !== undefined
                  ? fields.contacts[0].value
                  : ''
              }
              onChange={(e) =>
                e.target.value !== ''
                  ? dispatch(
                      setMobilePhone({
                        type: 'mobile_phone',
                        value: phoneFormat(e.target.value),
                      })
                    )
                  : dispatch(setMobilePhone({}))
              }
              focused={focusedPhone.toString()}
              onBlur={() => setFocusedPhone(true)}
              pattern={'^\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$'}
              onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
              minLength={18}
              maxLength={18}
              placeholder='+7'
              className={styles.phoneInput}
              required={
                !(
                  fields.contacts[0].value !== undefined ||
                  fields.contacts[1].value !== undefined ||
                  fields.contacts[2].value !== undefined
                )
              }
            />
            <span className={styles.error}>
              {fields.contacts[0]?.value === '' ||
              fields.contacts[0]?.value == undefined
                ? `Поле обязательно для заполнения, если не заполнено поле "E-mail" или "Telegram".`
                : 'Введено недопустимое значение поля "Мобильный телефон".'}
            </span>
          </div>
          <Input
            isFocus={isEdit}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.value !== ''
                ? dispatch(setEmail({ type: 'e_mail', value: e.target.value }))
                : dispatch(setEmail({}))
            }
            name='e_mail'
            defaultValue={fields.contacts[1]?.value}
            inputType='defaultInput'
            pattern={
              '^[a-zA-Z0-9]+([_.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*.[a-zA-Z]{2,}$'
            }
            title='E-mail'
            type='text'
            isError={
              fields?.contacts[1]?.value !== undefined
                ? !/[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(
                    fields?.contacts[1]?.value
                  )
                : false
            }
            required={
              !(
                fields.contacts[0]?.value !== undefined ||
                fields.contacts[1].value !== undefined ||
                fields.contacts[2].value !== undefined
              )
            }
            error={
              fields.contacts[1]?.value === '' ||
              fields.contacts[1]?.value === undefined
                ? 'Поле обязательно для заполнения, если не заполнено поле "Мобильный телефон" или "Telegram".'
                : 'Введено недопустимое значение поля "E-mail".'
            }
          />
          <Input
            isFocus={isEdit}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.value !== ''
                ? dispatch(
                    setTelegram({ type: 'telegram', value: e.target.value })
                  )
                : dispatch(setTelegram({}))
            }
            name='telegram'
            defaultValue={fields.contacts[2]?.value}
            inputType='defaultInput'
            title='Telegram'
            placeholder='@tgname'
            pattern={'.*\\B@(?=\\w{5,32}\\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*'}
            required={
              !(
                fields.contacts[0].value !== undefined ||
                fields.contacts[1].value !== undefined ||
                fields.contacts[2].value !== undefined
              )
            }
            error={
              fields.contacts[2]?.value === '' ||
              fields.contacts[2]?.value == undefined
                ? 'Поле обязательно для заполнения, если не заполнено поле "Мобильный телефон" или "E-mail".'
                : 'Введено недопустимое значение поля "Telegram".'
            }
          />
        <Input
          isFocus={isEdit}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            e.target.value !== ''
              ? dispatch(
                  setWhatApp({
                    type: 'whats_app',
                    value: phoneFormat(e.target.value),
                  })
                )
              : dispatch(setWhatApp({}))
          }
          name='whats_app'
          value={fields.contacts[3]?.value || ''}
          placeholder='+7'
          inputType='defaultInput'
          title='WhatsApp'
          minLength={18}
          maxLength={18}
          pattern={
            '^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$'
          }
          error='Введено недопустимое значение поля "WhatsApp".'
        />
        <Input
          isFocus={isEdit}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            e.target.value !== ''
              ? dispatch(setVk({ type: 'vk', value: e.target.value }))
              : dispatch(setVk({}))
          }
          name='vk'
          defaultValue={fields.contacts[4]?.value}
          inputType='defaultInput'
          title='VK'
          maxLength={100}
          placeholder='https://vk.com/'
          pattern={'^(https:\\/\\/vk\\.com\\/.{3,})$'}
          error='Введено недопустимое значение поля "VK".'
        />
        <Input
          isFocus={isEdit}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            e.target.value !== ''
              ? dispatch(setHabr({ type: 'habr', value: e.target.value }))
              : dispatch(setHabr({}))
          }
          name='habr'
          defaultValue={fields.contacts[5]?.value}
          inputType='defaultInput'
          title='Habr'
          placeholder='https://habr.com/ru/users/'
          pattern={'^(https:\\/\\/habr\\.com\\/ru\\/users\\/.{3,})$'}
          error='Введено недопустимое значение поля "Habr".'
        />
        <Input
          isFocus={isEdit}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            e.target.value !== ''
              ? dispatch(
                  setLinkedIn({ type: 'linked_in', value: e.target.value })
                )
              : dispatch(setLinkedIn({}))
          }
          name='linked_in'
          placeholder='https://www.linkedin.com/in/'
          defaultValue={fields.contacts[6]?.value}
          inputType='defaultInput'
          title='LinkedIn'
          pattern={'^(https:\\/\\/www\\.linkedin\\.com\\/in\\/.*)$'}
          minLength={3}
          maxLength={100}
          error='Введено недопустимое значение поля "LinkedIn".'
        />
        <Input
          isFocus={isEdit}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            e.target.value !== ''
              ? dispatch(setGit({ type: 'git', value: e.target.value }))
              : dispatch(setGit({}))
          }
          name='git'
          defaultValue={fields.contacts[7]?.value}
          inputType='defaultInput'
          title='Git'
          placeholder='https://github.com/'
          pattern={'^https:\\/\\/github\\.com\\/.{3,}$'}
          error='Введено недопустимое значение поля "Git".'
        />
        <div className={styles.wrapBtn}>
          <div>
            <button
              className={styles.btnBack}
              type={isValid ? 'button' : 'submit'}
              disabled={
                fields?.contacts[1]?.value !== undefined
                  ? !/[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(
                      fields?.contacts[1]?.value
                    )
                  : false
              }
              onClick={() => {
                setActiveStep(
                  activeStep.map((item) =>
                    item.id === 0
                      ? {
                          ...item,
                          isActive: true,
                          isVisited: true,
                        }
                      : { ...item, isActive: false }
                  )
                )
              }}
            >
              Назад
            </button>
            <button
              type='submit'
              className={styles.btnContinue}
              disabled={
                fields?.contacts[1]?.value !== undefined
                  ? !/[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(
                      fields?.contacts[1]?.value
                    )
                  : false
              }
            >
              Продолжить
            </button>
          </div>
          <BtnSaveResume
            disabled={
              !currentRef.current?.checkValidity() ||
              !!activeStep.filter((item) => item.isError).length ||
              (fields?.contacts[1]?.value !== undefined
                ? !/[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(
                    fields?.contacts[1]?.value
                  )
                : false)
            }
          />
        </div>
      </div>
    </form>
  )
}
