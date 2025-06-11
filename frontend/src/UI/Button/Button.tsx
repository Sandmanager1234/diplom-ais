import React, {ReactElement} from 'react';
import classNames from "classnames";
import styles from './Button.module.css'

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
    classname: string
    width?: string
    text?: string
    image?: ReactElement
}

export const Button: React.FC<IButtonProps> = (props) => {

    const {width = 100, text, image, classname} = props

    const buttonWidth = {
        width: `${width}%`
    }

    const buttonWrap = classNames({
        [styles[classname]]: true,
    })

    return (
        <button className={buttonWrap} style={buttonWidth}>{image}{text}</button>
    );
};
