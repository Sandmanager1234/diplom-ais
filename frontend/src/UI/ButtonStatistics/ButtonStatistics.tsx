import React, {ReactElement} from 'react';
import classNames from "classnames";
import styles from './ButtonStatistics.module.css'

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
    classname: string
    width?: string
    text?: string
    onClick: () => void;
}

export const ButtonStatistics: React.FC<IButtonProps> = (props) => {

    const {text, classname, onClick} = props

    const buttonWrap = classNames({
        [styles[classname]]: true,
    })

    return (
        <button className={buttonWrap}  onClick={onClick}>{text}</button>
    );
};
