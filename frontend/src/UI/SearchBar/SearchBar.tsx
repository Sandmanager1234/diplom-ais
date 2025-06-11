import React, { useState } from 'react'
import { Button, Icon } from 'UI'

import styles from './SearchBar.module.css'

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className={styles.wrap}>
      <h1>Список резюме</h1>
      <div className={styles.search}>
        <div className={styles.searchBar}>
          <label>
            <input
              placeholder='Поиск'
              type='text'
              required={true}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className={styles.reset} onClick={() => setSearchValue('')}>
              <Icon.Close />
            </button>
            <Button classname='primary' text='Найти' width='11.528' />
          </label>
        </div>
        <Button
          classname='grey'
          text='Фильтры'
          width='8.415'
          image={<Icon.SettingsSlider />}
        />
      </div>
      <div className={styles.btnFilters}>
        <button className={styles.fastFilter}>
          Java-разработчик <div>56</div>
        </button>
        <button className={styles.fastFilter}>
          Системный аналитик <div>38</div>
        </button>
        <button className={styles.fastFilter}>
          QA-инженер <div>29</div>
        </button>
        <button className={styles.fastFilter}>
          UI дизайнер <div>11</div>
        </button>
      </div>
    </div>
  )
}
