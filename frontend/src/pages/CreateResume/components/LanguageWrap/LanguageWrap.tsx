import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'

import {BtnSaveResume} from 'UI'
import { useAppDispatch, useAppSelector } from 'store'

import {addFieldLanguage} from 'store/slices/createResumeSlice'
import {dictionariesSlice} from 'store/slices/dictionariesSlice'
import {Language} from './Language'
import {directoryApi} from "../../../../services/directoryApi/directoryApi";

import { CreateResumeStep } from '../../data/models';

import styles from './LanguageWrap.module.css'

interface ILanguage {
    activeStep: CreateResumeStep[]
    setActiveStep: React.Dispatch<CreateResumeStep[]>
    currentRef: any
}

export const LanguageWrap: React.FC<ILanguage> = (props) => {
    const {activeStep, setActiveStep, currentRef} = props

    const {mas} = useAppSelector((state) => state.directories)
    const {id} = useParams()
    const {fields} = useAppSelector((state) => state.createResume)

    const dispatch = useAppDispatch()
    const {addDictionary} = dictionariesSlice.actions


    useEffect(() => {
        directoryApi.getDirectory('language-level').then((res) => {
            dispatch(addDictionary({name: 'language-level', value: res}))
        })
    }, [])

    return (
        <form className={styles.wrap} ref={currentRef} onSubmit={() => {
            setTimeout(() => window.scrollTo({top: 0, behavior: 'smooth'}), 0)
            setActiveStep(
                activeStep.map((item) =>
                    item.id === 6
                        ? {
                            ...item,
                            isActive: true,
                            isVisited: true,
                        }
                        : {...item, isActive: false},
                ),
            )
        }}>
            <div className={styles.title}>Владения языками</div>
            <div className={styles.wrapLanguage}>
                {fields.languages.map((language, index) =>
                    (
                        <Language key={index} id={language.id} languageState={language.language}
                                  levelState={language.level}/>
                    ))
                }
            </div>
            <button
                disabled={fields.languages.filter(lang => lang.language == '').length > 0}
                className={fields.languages.length === 5 ? styles.hidden : styles.btnAddField} type={'button'}
                onClick={() => {
                    dispatch(addFieldLanguage([...fields.languages, {
                        id: fields.languages.length !== 0 ? fields.languages[fields.languages.length - 1].id + 1 : 0,
                        language: '',
                        level: '',
                    }]))
                }}>Указать ещё один язык
            </button>
            <div className={styles.wrapBtn}>
                <div>
                    <button
                        className={styles.btnBack}
                        onClick={() =>
                            setActiveStep(
                                activeStep.map((item) =>
                                    item.id === 4
                                        ? {
                                            ...item,
                                            isActive: true,
                                            isVisited: true,
                                        }
                                        : {...item, isActive: false},
                                ),
                            )
                        }
                    >
                        Назад
                    </button>
                    <button className={styles.btnContinue} type={'submit'}>
                        Продолжить
                    </button>
                </div>
                <BtnSaveResume
                    disabled={!(currentRef.current?.checkValidity()) || !!activeStep.filter(item => item.isError).length}/>
            </div>
        </form>
    )
}
