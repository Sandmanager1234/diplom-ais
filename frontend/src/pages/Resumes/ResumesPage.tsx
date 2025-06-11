import { SearchBar } from './components/SearchBar'
// import { Sorting } from './components/Sorting'
import { ResumesList } from './components/ResumesList'
import styles from './ResumesPage.module.css'

export const ResumesPage = () => {
  return (
    <div className={styles.wrap}>
      <SearchBar />
      {/*todo скрыто до переработки*/}
      {/*<div ref={ref}>*/}
      {/*  <Sorting isActive={isActive} setActive={setActive} />*/}
      {/*</div>*/}
      <ResumesList />
    </div>
  )
}
