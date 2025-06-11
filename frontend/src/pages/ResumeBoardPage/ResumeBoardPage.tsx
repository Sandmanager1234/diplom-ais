import React from 'react'

import { SearchBar } from '../Resumes/components/SearchBar'
import ResumeBoardGrid from './Components/ResumeBoardGrid'
import { Header } from '../Profile/components/Header'

const ResumeBoardPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Header currentPageName='Доска резюме' />
      <SearchBar isResumeTable />
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          height: '100%',
          paddingTop: '20px',
        }}
      >
        <div
          style={{
            width: '91%',
            display: 'flex',
            justifyItems: 'center',
            height: '100%',
          }}
        >
          <ResumeBoardGrid />
        </div>
      </div>
    </div>
  )
}

export default ResumeBoardPage
