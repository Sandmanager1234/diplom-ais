import { Dispatch, FC, SetStateAction } from 'react'
import classNames from 'classnames'

import { Checkbox } from '@mui/material'

import styles from './SortCardsCheckbox.module.css'

type Props = {
  checked: boolean
  setChecked: Dispatch<SetStateAction<boolean>>
}

const SortCardsCheckbox: FC<Props> = ({ checked, setChecked }) => {
  const checkboxColor = classNames({
    [styles.checkboxActive]: checked,
    [styles.checkbox]: !checked,
  })

  return (
    <div className={styles.container}>
      <Checkbox
        className={checkboxColor}
        checked={checked}
        classes={styles}
        onClick={() => setChecked((prev) => !prev)}
      />
      <span className={styles.label}>Сначала новые</span>
    </div>
  )
}

export default SortCardsCheckbox
