import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Checkbox } from '@mui/material'
import { Card, Icon, ResumeStatus } from 'UI'

import { favouriteApi } from 'services/favouriteApi/favouriteApi'
import { getExperience } from 'utils/getExperience'
import { getPeriod } from 'utils/getPeriod'
import { getAge } from 'utils/getAge'
import { phoneFormat } from 'utils/phoneFormat'
import { ApplicantCard, ContactType } from 'services/resumesApi/models'
import styles from './ResumeCard.module.css'

type Props = {
  applicant: ApplicantCard
}

const ResumeCard = (props: Props) => {
  const { applicant } = props
  const [favourite, setFavourite] = useState(applicant.favourite)
  const onClick = () =>
    favouriteApi
      .editFavoriteApplicant(applicant.id, !favourite)
      .then(() => setFavourite((prev) => !prev))

  const conditionForRenderingExperience =
    applicant.experience && !!applicant.generalExperience

  const mobilePhoneContact = applicant.contacts.find(
    (contact) => contact.type === ContactType.mobilePhone
  )
  const hasMobilePhone = !!mobilePhoneContact
  const firstVacancy = useMemo(
    () => applicant.vacancies[0],
    [applicant.vacancies]
  )
  const remainingVacanciesLength = useMemo(
    () => applicant.vacancies.length - 1,
    [applicant.vacancies]
  )
  const [alertModalContent, setAlertModalContent] = useState<
    | 'screeningFileAlert'
    | 'screeningFileComplete'
    | 'screeningFileSkipped'
    | 'sendOfferFileAlert'
    | 'sendOfferFileComplete'
    | 'sendOfferFileSkipped'
    | ''
  >('')
  const openAlertModalHandler = (string: 'sendOffer' | 'screening') => {
    setAlertModalContent(`${string}FileAlert`)
  }
  const [chosenOption, setChosenOption] = useState<'screening' | 'sendOffer'>(
    'screening'
  )
  return (
    <Card>
      <div className={styles.nameBlock}>
        <Link
          to={`/applicant/${applicant.id}`}
          className={styles.avatar}
        >{`${applicant?.name?.[0]}${applicant?.surname?.[0]}`}</Link>
        <div>
          <Link to={`/applicant/${applicant.id}`} className={styles.nameText}>
            {`${applicant.name || ''} ${applicant.surname || ''}`}
          </Link>
          <span className={styles.ageText}>
            {applicant.age !== null && <span>{getAge(applicant.age)}</span>}
            {applicant.city && (
              <span>{`${applicant.age !== null ? ', ' : ''}${
                applicant.city
              }`}</span>
            )}
          </span>
          <span className={styles.phoneNumber}>
            {hasMobilePhone && phoneFormat(mobilePhoneContact.value)}
          </span>
        </div>
      </div>
      {conditionForRenderingExperience ? (
        <div className={styles.experienceBlock}>
          <div className={styles.experienceData}>
            {applicant.experience?.position && (
              <span className={styles.experiencePosition}>
                {applicant.experience?.position}
              </span>
            )}
            {!!(
              applicant.experience?.companyName ||
              applicant.experience?.description
            ) && (
              <span className={styles.experienceDescriptions}>
                {`${applicant.experience?.companyName}`}
              </span>
            )}
            {applicant.experience?.startDate && (
              <span className={styles.experienceDate}>
                {getPeriod(
                  applicant.experience?.startDate,
                  applicant.experience?.endDate
                )}
              </span>
            )}
          </div>
          {applicant.generalExperience && (
            <div className={styles.allExperience}>
              <span className={styles.lengthOfServiceText}>Стаж</span>
              <span className={styles.lengthOfService}>
                {getExperience(applicant.generalExperience)}
              </span>
            </div>
          )}
        </div>
      ) : (
        <span className={styles.noExperience}>Опыт отсутствует</span>
      )}
      {firstVacancy ? (
        <div className={styles.vacancy}>
          <span className={styles.jobTitle}>{firstVacancy.name}</span>
          <span className={styles.company}>{firstVacancy?.position?.positionName}</span>
          <span className={styles.grade}>Middle</span>
          <div className={styles.statusBlock}>
            <ResumeStatus
              id={firstVacancy.vacancyApplicantId}
              resumeId={applicant.id}
              option={firstVacancy?.state}
              openAlertModal={openAlertModalHandler}
              setChosenOption={setChosenOption}
            />
          </div>
          {applicant.vacancies.length > 1 && (
            <div className={styles.vacanciesLength}>
              <span>+{remainingVacanciesLength}</span>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.vacancy}>Вакансий пока нет</div>
      )}
      <div className={styles.iconBlock}>
        <Checkbox
          className={styles.checkbox}
          classes={styles}
          checked={favourite}
          onClick={onClick}
          icon={<Icon.Bookmark />}
          checkedIcon={<Icon.BookmarkChecked />}
        />
      </div>
    </Card>
  )
}

export default ResumeCard
