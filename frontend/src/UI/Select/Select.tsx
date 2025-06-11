import React, {ReactElement, useState} from 'react';

import { useAppDispatch, useAppSelector } from 'store'

import {setSorting} from "store/slices/resumeSlice";

import styles from './Select.module.css'

interface ISelectProps{
    options: ISelectItem[]
    id: number
    setState: React.Dispatch<object>
    state: object
    titleSort: string
    name:string
}

interface ISelectItem {
    id: number
    title: string
    image: ReactElement
}

export const Select:React.FC<ISelectProps> = (props) => {

    const {options, state, setState, name, titleSort, id} = props
    const dispatch = useAppDispatch();
    const { sorting } = useAppSelector(state => state.resumes);
    const [activeSorting, setActiveSorting] = useState({activeSort: -1})

    const selectSort = (id: number, title: string) => {
            setState({sortType: titleSort, isActive: -1})
            setActiveSorting({activeSort: id})
        if (['По возрастанию', 'Стаж по возрастанию', 'Сортировка от А до Я'].includes(title)) {
            if (titleSort === 'Имя') {
                dispatch(setSorting({...sorting, [name]:'asc&sort=surname,asc'}))
            } else {
                dispatch(setSorting({...sorting, [name]:'asc'}))
            }
        }else if(['По убыванию', 'Стаж по убыванию', 'Сортировка от Я до А'].includes(title)){
            if (titleSort === 'Имя') {
                dispatch(setSorting({...sorting, [name]:'desc&sort=surname,desc'}))
            } else {
                dispatch(setSorting({...sorting, [name]:'desc'}))
            }
        }else{
            dispatch(setSorting({...sorting, [name]:''}))
        }
    }

    return (
        <div className={state.isActive === id ? styles.select : styles.hidden}>
            {options.map((item) => (
                <div
                    onClick={() => selectSort(item.id, item.title)}
                    className={activeSorting.activeSort === item.id && !item.title.includes('умолчанию') ? styles.selectItemActive : styles.selectItem}
                    key={item.id + Math.random()}
                >
                    {item.image}{item.title}
                </div>
            ))}
        </div>
    );
};
