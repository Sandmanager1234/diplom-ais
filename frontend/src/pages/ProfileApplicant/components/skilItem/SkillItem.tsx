import React from 'react';
import styles from './SkillItem.module.css';

export const SkillItem = (props) => {
    const {value} = props
    return (
        <div className={styles.item}>
            {value}
        </div>
    );
};

