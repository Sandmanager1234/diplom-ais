import { Dispatch, FC, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import { BtnSaveResume } from "UI";

import { useAppDispatch, useAppSelector } from 'store';

import { setBusinessTrips, setEmployments, setRelocations, setSchedules } from "../../../../store/slices/createResumeSlice";
import { dictionariesSlice } from "../../../../store/slices/dictionariesSlice";

import { directoryApi } from "../../../../services/directoryApi/directoryApi";

import { CreateResumeStep } from '../../data/models';

import styles from './AnotherInfo.module.css';

interface IAnotherInfo {
    activeStep: CreateResumeStep;
    setActiveStep: Dispatch<CreateResumeStep[]>;
}

export const AnotherInfo: FC<IAnotherInfo> = (props) => {

    const {activeStep, setActiveStep} = props

    const {mas} = useAppSelector(state => state.directories);
    const {fields} = useAppSelector(state => state.createResume);
    const {id} = useParams()

    const dispatch = useAppDispatch();
    const {addDictionary} = dictionariesSlice.actions;

    const [employment, setEmployment] = useState<{ value: string, description: string, isActive: boolean }[]>([])

    const [relocation, setRelocation] = useState([
        {
            id: 0,
            name: 'Невозможен',
            json: 'impossible',
            isActive: false
        },
        {
            id: 1,
            name: 'Возможен',
            json: 'available',
            isActive: false
        },
        {
            id: 2,
            name: 'Желателен',
            json: 'desirable',
            isActive: false
        }
    ])

    const [businessTrip, setBusinessTrip] = useState<{ id: number, name: string, json: string, isActive: boolean }[]>([
        {id: 0, name: 'Никогда', json: 'never', isActive: false},
        {id: 1, name: 'Готов', json: 'ready', isActive: false},
        {id: 2, name: 'Иногда', json: 'sometimes', isActive: false}
    ])

    const employments = fields.employments.map(item => item.employmentType)

    const [schedule, setSchedule] = useState([
        {
            id: 0,
            description: 'Полный рабочий день',
            value: 'full_day',
            isActive: false
        },
        {
            id: 1,
            description: 'Сменный график',
            value: 'shift_schedule',
            isActive: false
        },
        {
            id: 2,
            description: 'Гибкий график',
            value: 'flexible_schedule',
            isActive: false
        },
        {
            id: 3,
            description: 'Удаленная работа',
            value: 'remote_work',
            isActive: false
        },
        {
            id: 4,
            description: 'Вахтовый метод',
            value: 'shift_method',
            isActive: false
        }
    ])

    useEffect(() => {
        if (!mas['employment-type']) {
            directoryApi.getDirectory("employment-type").then(res => {
                dispatch(addDictionary({name: 'employment-type', value: res}))
                setEmployment(res.map((item: { value: string, description: string, isActive: boolean }, index: number) => !employments.includes(item.value) ? {
                    ...item,
                    id: index,
                    isActive: false
                } : {
                    ...item,
                    id: index,
                    isActive: true
                }))
            });
        } else {
            setEmployment(mas['employment-type'].map((item, index) => !employments.includes(item.value) ? {
                ...item,
                id: index,
                isActive: false
            } : {
                ...item,
                id: index,
                isActive: true
            }))
        }
        if (fields.schedules.length) {
            console.log(fields.schedules)
            setSchedule(schedule.map(item => 
                fields.schedules.findIndex(el => el.scheduleType === item.value) !== -1 ? {...item, isActive: true} : item
            ))
        }
        if (fields.relocation !== '') {
            setRelocation(relocation.map(item => item.json === fields.relocation ? {...item, isActive: true} : item))
        }
        if (fields.isBusinessTrip !== '') {
            setBusinessTrip(businessTrip.map(item => item.json === fields.isBusinessTrip ? {
                ...item,
                isActive: true
            } : item))
        }
    }, [])

    useEffect(() => {  
        const relocationActive = relocation.filter((item) => item.isActive)
        if (relocationActive.length)
            dispatch(setRelocations(relocationActive[0].json))
        else
            dispatch(setRelocations(''))

    }, [relocation])


    useEffect(() => {  
        const businessTripActive = businessTrip.filter((item) => item.isActive)
        if (businessTripActive.length)
            dispatch(setBusinessTrips(businessTripActive[0].json))
        else
            dispatch(setBusinessTrips(''))

    }, [businessTrip])

    useEffect(() => {  
        const employmentActive = employment.filter(item => item.isActive)
      
        if (employmentActive.length)
            dispatch(setEmployments(employmentActive.map((item) => item && {employmentType: item.value})))
        else
            dispatch(setEmployments([]))

    }, [employment])


    useEffect(() => {  
        const schedulesActive = schedule.filter(item => item.isActive)
        if (schedulesActive.length)
            dispatch(setSchedules(schedulesActive.map((item) => item && {scheduleType: item.value})))
        else
            dispatch(setSchedules([]))

    }, [schedule])


    return (
        <div>
            <div className={styles.title}>Другая информация</div>
            <div className={styles.wrap}>
                <div className={styles.wrapChoice}>
                    <div className={styles.subTitle}>Переезд</div>
                    {relocation.map((item: { id: number, name: string, isActive: boolean }) => (
                        <div key={item.id} id={String(item.id)} className={styles.choiceItem}>
                            <label onClick={(e: { target: { id: number } }) => {
                                setRelocation(relocation.map((item) => item.id == e.target.id ? {
                                    ...item,
                                    isActive: !item.isActive
                                } : {...item, isActive: false}))
                            }} className={styles.inputContainer} id={String(item.id)}>
                                <input readOnly={true} id={String(item.id)} onClick={(e) => e.stopPropagation()}
                                       className={styles.inputRadio} checked={item.isActive} type="radio"/>
                                <span id={String(item.id)} className={styles.radioIndicator}></span>
                                {item.name}
                            </label>
                        </div>
                    ))}
                </div>
                <div className={styles.wrapChoice}>
                    <div className={styles.subTitle}>Занятость</div>
                    {employment && employment.map((item) => (
                        <div key={item.id} id={String(item.id)} className={styles.choiceItem}>
                            <label onClick={(e: { target: { id: string } }) => {
                                setEmployment(employment.map((employment) => employment.id === Number(e.target.id) ? {
                                    ...employment,
                                    isActive: !employment.isActive
                                } : employment))
                            }
                            } className={styles.checkboxContainer} id={String(item.id)}>
                                <input readOnly={true} id={String(item.id)} className={styles.inputCheckbox}
                                       onClick={(e) => e.stopPropagation()}
                                       checked={item.isActive} type="checkbox"/>
                                <span id={String(item.id)} className={styles.checkboxIndicator}></span>
                                {item.description}
                            </label>
                        </div>
                    ))}
                </div>

                 <div className={styles.wrapChoice}>
                    <div className={styles.subTitle}>График работы</div>
                    {schedule.map((item) => <div key={item.id} id={String(item.id)} className={styles.choiceItem}>
                        <label
                         onClick={(e: { target: { id: string } }) => {
                                setSchedule(schedule.map((schedule) => schedule.id === Number(e.target.id) ? {
                                    ...schedule,
                                    isActive: !schedule.isActive
                                } : schedule))
                            }
                            }
                             className={styles.checkboxContainer} id={String(item.id)}>
                                <input readOnly={true} id={String(item.id)} className={styles.inputCheckbox}
                                       onClick={(e) => e.stopPropagation()}
                                       checked={item.isActive} type="checkbox"/>
                                <span id={String(item.id)} className={styles.checkboxIndicator}></span>
                                {item.description}
                            </label>
                        </div>)}
                </div> 

                <div className={styles.wrapChoice}>
                    <div className={styles.subTitle}>Готовность к командировкам</div>
                    {businessTrip.map((item: { id: number, name: string, isActive: boolean }) => (
                        <div key={item.id} id={String(item.id)} className={styles.choiceItem}
                        >
                            <label onClick={(e: { target: { id: string } }) =>
                                setBusinessTrip(businessTrip.map((trip) => trip.id == e.target.id ? {
                                    ...item,
                                    isActive: !trip.isActive
                                } : {...trip, isActive: false}))} id={String(item.id)}
                                   className={styles.inputContainer}>
                                <input readOnly={true} id={String(item.id)} className={styles.inputRadio}
                                       onClick={(e) => e.stopPropagation()} checked={item.isActive} type="radio"/>
                                <span id={String(item.id)} className={styles.radioIndicator}></span>
                                {item.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.wrapBtn}>
                <div>
                    <button className={styles.btnBack}
                            onClick={() => setActiveStep(activeStep.map((item) => item.id === 5 ? {
                                ...item,
                                isActive: true,
                                isVisited: true
                            } : {...item, isActive: false}))}>Назад
                    </button>
                    <button className={styles.btnContinue}
                            onClick={() => setActiveStep(activeStep.map((item) => item.id === 7 ? {
                                ...item,
                                isActive: true,
                                isVisited: true
                            } : {...item, isActive: false}))}>Продолжить
                    </button>
                </div>
                <BtnSaveResume
                  disabled={!!activeStep.filter(item => item.isError).length} />
            </div>
        </div>
    );
};
