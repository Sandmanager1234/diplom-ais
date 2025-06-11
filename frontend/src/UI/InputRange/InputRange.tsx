import React from 'react';
import {useDispatch} from "react-redux";

import {useAppSelector} from "store";
import {SetCurrency} from "store/slices/filterResumeSlice";

import styles from './InputRange.module.css'

interface IInputRange {
    title: string
    fieldFrom: string
    fieldTo: string
    dispatchFrom: React.Dispatch<never>
    dispatchTo: React.Dispatch<never>
    minFrom: number
    minTo: string | number
    max: number
    directory?: []
}
export const InputRange: React.FC<IInputRange> = (props) => {

    const {title, fieldFrom, fieldTo, dispatchFrom, dispatchTo, minFrom, minTo, max, directory} = props
    const {filteringFields} = useAppSelector(state => state.filterResume);
    const dispatch = useDispatch()

    function valueInput(value: string | number) {
        if (value !== '') {
            return title === 'Опыт работы, лет' ? Number(value) / 12 : value
        } else {
            return ''
        }
    }

    return (
        <div className={styles.wrapInputs}>
            {title}
            <div>
                <span className={styles.from}>от</span>
                <input
                    type="number"
                    min={minFrom}
                    max={max}
                    onKeyDown={(e) => ['.', ',', '-', 'e', '+'].includes(e.key) && e.preventDefault()}
                    value={valueInput(fieldFrom) || ''}
                    onChange={(e) => title === 'Опыт работы, лет' ? dispatch(dispatchFrom(Number(e.target.value) * 12)) : dispatch(dispatchFrom(e.target.value))}
                />
                <span className={styles.to}>до</span>
                <input
                    type="number"
                    min={minTo}
                    max={max}
                    onKeyDown={(e) => ['.', ',', '-', 'e', '+'].includes(e.key) && e.preventDefault()}
                    value={valueInput(fieldTo) || ''}
                    onChange={(e) => title === 'Опыт работы, лет' ? dispatch(dispatchTo(Number(e.target.value) * 12)) : dispatch(dispatchTo(e.target.value))}
                />
            </div>
            {title === 'Зарплата' &&
                <div className={styles.wrapSelects}>
                    {directory?.map((currency: { value: string }, index: number) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.preventDefault()
                                dispatch(SetCurrency(currency.value !== filteringFields.currency ? currency.value : ''))
                            }}
                                className={filteringFields.currency === currency.value ? styles.selectCurrencyActive : styles.selectCurrency}
                        >
                            {currency.value}
                        </button>
                    ))}
                </div>
            }
        </div>
    );
};