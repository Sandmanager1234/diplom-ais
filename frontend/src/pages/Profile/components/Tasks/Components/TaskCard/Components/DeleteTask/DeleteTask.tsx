import { Dispatch, FC } from 'react';

import { useAppDispatch, useAppSelector } from 'store'

import {setContent, setPagination} from "../../../../../../../../store/slices/taskSlice";
import {taskApi} from "../../../../../../../../services/taskApi/taskApi";

import styles from './DeleteTask.module.css'

interface IDeleteTask {
    setActive: Dispatch<boolean>
    id: string
}

export const DeleteTask: FC<IDeleteTask> = (props) => {

    const {setActive, id} = props
    const dispatch = useAppDispatch()
    const {pagination, activeFilterTask, sortTask} = useAppSelector(state => state.tasks);

    return (
        <div className={styles.wrap}>
            <div className={styles.title}>Удалить задачу?</div>
            <div className={styles.subTitle}>Вы уверены, что хотите удалить задачу? Отменить удаление будет невозможно
            </div>
            <div className={styles.wrapBtn}>
                <button className={styles.btnCancel} onClick={() => setActive(false)}>Отмена</button>
                <button className={styles.btnDelete} onClick={() => {
                    taskApi.deleteTask(id).finally(() =>
                        taskApi.getTasks(`page=${pagination?.number}&size=${pagination?.size || 10}&status=${activeFilterTask}${sortTask}`).then(res => {
                            const {content, totalPages, totalElements, size, number} = res
                            dispatch(setContent(content))
                            dispatch(setPagination({totalPages, totalElements, size, number}))
                        }).then(() => setActive(false)))
                }}>Удалить
                </button>
            </div>
        </div>
    );
};
