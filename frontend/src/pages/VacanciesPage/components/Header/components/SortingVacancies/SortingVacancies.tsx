
import styles from "./SortingVacancies.module.css"

const SortingVacancies = () => {
  return (
    <div className={styles.sortingBlock}>
      <div style={{width: "376px"}}>
        <span className={styles.text}>Название вакансии</span>
      </div>
      <div style={{width: "386px"}}>
        <span className={styles.text}>Локация поиска кандидата</span>
      </div>
      <div style={{width: "366px"}}>
        <span className={styles.text}>Грейд</span>
      </div>
      <div style={{width: "356px"}}>
        <span className={styles.text}>Статус</span>
      </div>
    </div>
  )
}

export default SortingVacancies
