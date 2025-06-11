import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import { useAppDispatch, useAppSelector } from 'store'
import { setResumes } from "store/slices/resumeSlice";

import {resumesApi} from "services/resumesApi/resumesApi";

import {removeEmptyValues} from "utils/removeEmptyValues";

import styles from './DeleteModal.module.css';

interface IDeleteModal {
    setActive: React.Dispatch<boolean>
    id:string
}

const DeleteModal: React.FC<IDeleteModal> = ({setActive, id}) => {

    const location = useLocation()

    const [isCanDelete, setCanDelete] = useState<boolean>()

    const dispatch = useAppDispatch();
    const {fields} = useAppSelector(state => state.filterResume);
    const navigate = useNavigate()

    useEffect(() => {
        resumesApi.getApplicant(id).then((res) => setCanDelete(res.actions.canDelete))
    }, [])

    const filterParams = Object.entries(removeEmptyValues({...fields}))
        .map(filterParam => `${filterParam[0]}=${filterParam[1]}&`).join('')
    const {sorting} = useAppSelector(state => state.resumes);
    const descOrAsc = Object.entries(removeEmptyValues({...sorting})).map(item => `sort=${item[0]},${item[1]}&`).join('')
    return (
        <>
            {
                isCanDelete ?
                    <div className={styles.deleteModal}>
                        <div className={styles.titleDelete}>Удалить резюме?</div>
                        <div className={styles.contentDelete}>Вы уверены, что хотите удалить резюме? Все данные будут
                            утеряны.
                        </div>
                        <div className={styles.btns}>
                            <button className={styles.btnYes}
                                    onClick={() => {
                                        resumesApi.deleteApplicant(id).then(() =>
                                            resumesApi.getApplicants(`${filterParams}&${descOrAsc}`).then(({data}) => {
                                                dispatch(setResumes(data.content))
                                                setActive(false)
                                                if (location.pathname !== '/') {
                                                    navigate('/')
                                                }
                                            })
                                        ).finally(() => {
                                            setActive(false)
                                        })
                                    }}>Да
                            </button>
                            <button className={styles.btnNo} onClick={() => setActive(false)}>Нет</button>
                        </div>
                    </div> :
                    <div  className={styles.deleteModal}>
                        <div className={styles.titleDelete}>Удаление невозможно(</div>
                        <div className={styles.contentDelete}>Данное резюме невозможно удалить. Переведите Аппликата в другой статус чтобы его удалить.</div>
                        <div className={styles.btns}>
                            <button className={styles.btnNo} onClick={() => setActive(false)}>Ок</button>
                        </div>
                    </div>
            }

        </>
    );
};

export default DeleteModal;