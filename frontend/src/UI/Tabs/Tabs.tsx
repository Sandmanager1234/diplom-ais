import {FC, SyntheticEvent, useState} from 'react'

import Box from '@mui/material/Box'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'

import { Condition } from '../../pages/Resumes/components/SearchBar/constants/conditions'

type TabsCondition = {
  value: string
  label: string
}

type TabsConditions = Array<TabsCondition>

type Props = {
  handleChange: (newValue: Condition) => void
  items: TabsConditions
  disabled: boolean
  tabsCondition: Condition
}

const Tabs: FC<Props> = (props) => {
  const { handleChange, items, disabled, tabsCondition } = props
  const onChange = (event: SyntheticEvent, newValue: Condition) => {
    handleChange(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabsCondition}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={onChange} aria-label='lab API tabs example'>
            {items.map((item, index) => (
              <Tab key={index} label={item.label} value={item.value} disabled={disabled}/>
            ))}
          </TabList>
        </Box>
      </TabContext>
    </Box>
  )
}

export default Tabs
