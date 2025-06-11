import { useRef, useState } from 'react'
import { Icon } from 'UI'

import { Applicants } from 'services/resumesApi/models'

import styles from './Candidates.module.css'
import NewLinkModal from '../NewLinkModal/NewLinkModal'
import { useClickOutside } from '../../../../hooks'
import { Candidate } from '../Candidate'

type IProps = {
  candidates: Applicants
}

const Candidates = (props: IProps) => {
  const { candidates } = props
  const [openModal, setOpenModal] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const handler = () => {
    setOpenModal(false)
  }
  useClickOutside(ref, handler, 'mousedown')

  return (
    <div className={styles.candidatesContainer}>
      <div className={styles.candidatesWrapper}>
        <h3 className={styles.candidatesHeader}>Кандидаты</h3>
        <button onClick={() => setOpenModal(true)}>
          <Icon.PlusMini />
        </button>
      </div>
      <div className={styles.candidatesList}>
        {candidates.map((item) => {
          return <Candidate candidate={item} key={item.id} />
        })}
      </div>
      {openModal && (
        <NewLinkModal
          setOpenModal={setOpenModal}
          ref={ref}
          openModal={openModal}
        />
      )}
    </div>
  )
}

export default Candidates
