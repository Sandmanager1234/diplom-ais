import React from 'react';
import {Link} from "react-router-dom";
import styles from './EmptyList.module.css'

export const EmptyList = () => {
    return (
        <div className={styles.emptyList}>
            <div className={styles.title}>Список резюме пуст</div>
            <div className={styles.subTitle}>
                Для отклика на вакансии и получения приглашений
                <br/>
                на интервью необходимо {''}
                 <Link to='/new-resume'>создать резюме</Link>.
            </div>
        </div>
    );
};
