import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Icon } from 'UI'
import { authorizationApi } from '../../services/authorizationApi/authorizationApi'

import FigureUp from '../../assets/images/figure_up.svg'
import FigureDown from '../../assets/images/figure_down.svg'

import styles from './LoginPage.module.css'

export const LoginPage = () => {
  const [showPass, setShowPass] = useState(false)
  const [focusedPass, setFocusedPass] = useState(false)
  const [authData, setAuthData] = useState({
    login: '',
    password: '',
  })
  const ref = useRef(null)
  const [isLoading, setLoading] = useState(false)
  const [isValid, setValid] = useState(true)

  const navigate = useNavigate()

  return (
    <form
      className={styles.wrap}
      onSubmit={(e) => {
        ref.current.disable = true
        e.preventDefault()
        setLoading(true)
        authorizationApi
          .logIn(authData.login, authData.password)
          .then((res) => {
            setValid(true)
            setLoading(false)
            sessionStorage.setItem('accessToken', res.data.access_token)
            sessionStorage.setItem('refreshToken', res.data.refresh_token)
            navigate('/')
          })
          .catch(() => {
            ref.current.disable = false
            setValid(false)
            setLoading(false)
          })
      }}
    >
      <div className={styles.authWrap}>
        <div className={styles.authBlock}>
          <div className={styles.title}>Добро пожаловать</div>
          <div className={styles.subTitle}>
            Войдите, чтобы продолжить работу на сайте
          </div>
          <div className={styles.loginWrap}>
            <div className={styles.passwordBlock}>
              <span className={styles.passTitle}>Логин</span>
              <div className={styles.passInput}>
                <input
                  className={isValid ? styles.inputStyle : styles.inputError}
                  pattern={'^\\S*$'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAuthData({
                      ...authData,
                      login: e.target.value,
                    })
                  }
                  type={'text'}
                />
              </div>
            </div>
            <div className={styles.passwordBlock}>
              <span className={styles.passTitle}>Пароль</span>
              <div className={styles.passInput}>
                <input
                  className={isValid ? styles.inputStyle : styles.inputError}
                  onBlur={() => setFocusedPass(true)}
                  focused={focusedPass.toString()}
                  pattern={'^\\S*$'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAuthData({
                      ...authData,
                      password: e.target.value,
                    })
                  }
                  type={showPass ? 'text' : 'password'}
                />
                <button
                  className={styles.btnShowPass}
                  type={'button'}
                  onClick={() => setShowPass((prevState) => !prevState)}
                >
                  {showPass ? <Icon.EyeOn /> : <Icon.EyeOff />}{' '}
                </button>
              </div>
              {!isValid && (
                <div className={styles.error}>
                  Неверно введён логин или пароль. Попробуйте войти ещё раз
                </div>
              )}
            </div>
          </div>
          <button
            ref={ref}
            disabled={authData.login === '' || authData.password === ''}
            className={styles.btnEnter}
            type={'submit'}
          >
            {!isLoading ? (
              'Войти'
            ) : (
              <div className={styles.box}>
                <div className={styles.container}>
                  <span className={styles.circle}></span>
                  <span className={styles.circle}></span>
                  <span className={styles.circle}></span>
                  <span className={styles.circle}></span>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
      <div className={styles.svgWrap}>
        <FigureUp className={styles.figureUp} />
        <FigureDown className={styles.figureDown} />
      </div>
    </form>
  )
}
