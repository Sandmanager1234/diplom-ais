import { ChangeEvent, useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

import { meetingApi } from 'services/meetingApi/meetingApi'

import {
  fetchMeetings,
  setSelectedApplicant,
  setSelectedRecipients,
} from 'store/slices/meetingSlice'
import {
  selectApplicants,
  selectResipients,
} from 'store/selectors/participentsSelector'
import {
  clearApplicants,
  clearRecipients,
  fetchApplicants,
  fetchRecipients,
} from 'store/slices/participentsSlice'

import { useAppDispatch, useAppSelector } from 'store'
import { Icon, Loader } from 'UI/index'

import { INPUT_NAME } from './data/models'

import { DateRangeContainer, Header, InputInline, TextArea } from './Components'

import styles from './CreateEventModal.module.css'
import {
  DIRECTORY_TYPES,
  IMeeting,
  ISuggestionsDTO,
} from '../../../../services/models'
import { resumesApi } from '../../../../services/resumesApi/resumesApi'

interface IProps {
  closeModal: () => void
  setExitConfirmation: (exitConfirmation: boolean) => void
  redactingMeeting?: IMeeting
  startDate?: Dayjs
}

export const CreateEventModal = ({
  closeModal,
  setExitConfirmation,
  redactingMeeting,
  startDate,
}: IProps) => {
  const { selectedRecipients, selectedApplicant } = useAppSelector(
    (state) => state.meetings
  )

  const [isLoading, setIsLoading] = useState(false)

  const recipients = useAppSelector(selectResipients)
  const applicants = useAppSelector(selectApplicants)

  const [title, setTitle] = useState(redactingMeeting?.name || '')
  const [searchRecipients, setSearchRecipients] = useState('')
  const [searchApplicant, setSearchApplicant] = useState('')
  const [place, setPlace] = useState(redactingMeeting?.place || '')
  const [comment, setComment] = useState(redactingMeeting?.comment || '')

  const [date, setDate] = useState<Dayjs>(
    redactingMeeting
      ? dayjs(redactingMeeting.startDate, 'YYYY-MM-DD HH:mm')
      : startDate
      ? startDate
      : dayjs()
  )

  const [startTime, setStartTime] = useState<Dayjs>(
    redactingMeeting
      ? dayjs(redactingMeeting.startDate, 'YYYY-MM-DD HH:mm')
      : date.startOf('day').add(9, 'hours')
  )
  const [endTime, setEndTime] = useState<Dayjs>(
    redactingMeeting
      ? dayjs(redactingMeeting.endDate, 'YYYY-MM-DD HH:mm')
      : date.startOf('day').add(18, 'hours')
  )
  const [minTime, setMinTime] = useState<Dayjs>(date)

  const [isValidTime, setIsValidTime] = useState(true)
  const [isFullDay, setIsFullDay] = useState(
    redactingMeeting ? redactingMeeting.isFullDay : false
  )
  const [isOnline, setIsOnline] = useState(
    redactingMeeting ? redactingMeeting.isOnline : false
  )

  const checkTime = () => {
    if (
      endTime.diff(startTime) <= 0 ||
      startTime.diff(dayjs()) < 0 ||
      startTime.hour() < 9 ||
      endTime.hour() > 18 ||
      (endTime.hour() == 18 && endTime.minute() != 0)
    ) {
      setIsValidTime(false)
    } else setIsValidTime(true)
  }

  useEffect(() => {
    checkTime()
  }, [endTime, startTime])

  useEffect(() => {
    let min: Dayjs
    if (date.date() == dayjs().date() && date.hour() > 9) {
      min = date.add(1, 'minute')
    } else {
      min = date.startOf('day').add(9, 'hours')
    }

    setMinTime(min)
    setStartTime(min)
    setEndTime(min.startOf('day').add(18, 'hours'))
  }, [date])

  useEffect(() => {
    if (selectedApplicant.length > 0 || selectedRecipients.length > 0)
      setExitConfirmation(true)
    else setExitConfirmation(false)
  }, [selectedApplicant, selectedRecipients])

  useEffect(() => {
    const conditionalForOpenExitConfirmation =
      title.length > 0 || place.length > 0 || comment.length > 0
    if (conditionalForOpenExitConfirmation) setExitConfirmation(true)
    else setExitConfirmation(false)
  }, [title, place, comment])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    switch (name) {
      case INPUT_NAME.APPLICAMTS:
        setSearchApplicant(value)
        break
      case INPUT_NAME.RECIPIENTS:
        setSearchRecipients(value)
        break
      case INPUT_NAME.PLACE:
      case INPUT_NAME.LINK:
        setPlace(value)
        break
      default:
        setTitle(value)
        break
    }
  }

  const textAreaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  useEffect(() => {
    if (searchRecipients.length > 2) {
      dispatch(fetchRecipients(searchRecipients))
    }
  }, [searchRecipients])

  useEffect(() => {
    if (searchApplicant.length > 2) {
      dispatch(fetchApplicants(searchApplicant))
    }
  }, [searchApplicant])

  const dispatch = useAppDispatch()

  const startDay = dayjs().startOf('month').startOf('week')

  const endDay = dayjs().endOf('month').endOf('week')

  const handleSubmitForm = (evt: React.FormEvent<HTMLFormElement>) => {
    if (!redactingMeeting) {
      evt.preventDefault()
      setIsLoading(true)
      meetingApi
        .create({
          name: title,
          startDate: startTime.format('YYYY-MM-DD HH:mm'),
          endDate: endTime.format('YYYY-MM-DD HH:mm'),
          emailAuthor: '',
          authorFio: '',
          place: place,
          comment: comment,
          isFullDay: isFullDay,
          isOnline: isOnline,
          eventOutlook: false,
          applicantId: selectedApplicant[0].valueId,
          applicantFio: selectedApplicant[0].value,
          recipient: selectedRecipients?.map((item) => ({
            emailRecipient: item.code,
            isViewMeeting: true,
            isStartMeeting: true,
          })),
        })
        .then(() => {
          dispatch(
            fetchMeetings({
              params: `&from=${startDay
                .subtract(13, 'hours')
                .add(1, 'day')
                .toISOString()}&to=${endDay
                .subtract(2, 'hours')
                .toISOString()}`,
            })
          )
        })
        .finally(() => {
          setIsLoading(false)
          closeModal()
        })
    } else {
      evt.preventDefault()
      setIsLoading(true)
      meetingApi
        .updateMeeting({
          id: redactingMeeting.id,
          name: title,
          startDate: startTime.format('YYYY-MM-DD HH:mm'),
          endDate: endTime.format('YYYY-MM-DD HH:mm'),
          emailAuthor: '',
          authorFio: '',
          place: place,
          comment: comment,
          isFullDay: isFullDay,
          isOnline: isOnline,
          eventOutlook: false,
          applicantId: selectedApplicant[0].valueId,
          applicantFio: selectedApplicant[0].value,
          recipient: selectedRecipients?.map((item) => ({
            id: item.valueId,
            idMeeting: redactingMeeting.id,
            fullNameRecipient: item.value,
            emailRecipient: item.code,
            isViewMeeting: true,
            isStartMeeting: true,
          })),
        })
        .then(() => {
          dispatch(
            fetchMeetings({
              params: `&from=${startDay
                .subtract(13, 'hours')
                .add(1, 'day')
                .toISOString()}&to=${endDay
                .subtract(2, 'hours')
                .toISOString()}`,
            })
          )
        })
        .finally(() => {
          setIsLoading(false)
          closeModal()
        })
    }
  }

  const resetInputValue = (name: INPUT_NAME) => {
    switch (name) {
      case INPUT_NAME.RECIPIENTS:
        setSearchRecipients('')
        dispatch(clearRecipients)
        break
      default:
        setSearchApplicant('')
        dispatch(clearApplicants)
        break
    }
  }

  const checkedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case INPUT_NAME.IS_ONLINE:
        setPlace('')
        if (e.target.checked) {
          setIsOnline(true)
        } else setIsOnline(false)
        break
      default:
        if (e.target.checked) {
          setStartTime((prev) => prev.startOf('day').add(9, 'hours'))
          setIsFullDay(true)
        } else setIsFullDay(false)
        break
    }
  }

  const validDate = startTime.isValid() && endTime.isValid()

  const setRedactingData = async () => {
    if (redactingMeeting) {
      const transformedRecipients: ISuggestionsDTO[] =
        redactingMeeting.recipient?.map((item) => ({
          code: item.emailRecipient,
          directoryType: DIRECTORY_TYPES.APPLICANT,
          entityFields: null,
          value: item.fullNameRecipient,
          valueId: item.id,
        }))

      const app = await resumesApi.getApplicant(redactingMeeting.applicantId)
      const transformedApplicant: ISuggestionsDTO = {
        code: '',
        directoryType: DIRECTORY_TYPES.APPLICANT,
        entityFields: null,
        value: app.surname + ' ' + app.name,
        valueId: app.id,
      }
      dispatch(setSelectedApplicant(transformedApplicant))
      dispatch(setSelectedRecipients(transformedRecipients))
    }
  }

  useEffect(() => {
    setRedactingData()
  }, [])

  return (
    <div className={styles.createEventWrapper}>
      {isLoading && <Loader />}
      <Header />
      <form className={styles.form} onSubmit={(evt) => handleSubmitForm(evt)}>
        <InputInline
          name={INPUT_NAME.TITLE}
          onChange={handleChange}
          value={title}
          placeholder={'Название*'}
          inputType={'big'}
        />
        <InputInline
          name={INPUT_NAME.RECIPIENTS}
          participants={recipients}
          placeholder={selectedRecipients.length ? '' : 'Пригласить участников'}
          inputType={'image'}
          image={<Icon.MailLightGrey />}
          onChange={handleChange}
          resetInputValue={resetInputValue}
          value={searchRecipients}
        />
        <InputInline
          name={INPUT_NAME.APPLICAMTS}
          participants={applicants}
          onChange={handleChange}
          resetInputValue={resetInputValue}
          value={searchApplicant}
          placeholder={selectedApplicant.length ? '' : 'Соискатель*'}
          inputType={'image'}
          image={<Icon.UserChecked />}
        />
        <InputInline
          name={isOnline ? INPUT_NAME.LINK : INPUT_NAME.PLACE}
          onChange={handleChange}
          value={place}
          placeholder={isOnline ? 'Ссылка*' : 'Место*'}
          inputType={'image'}
          image={isOnline ? <Icon.Link /> : <Icon.MapPin />}
        />
        <label className={styles.checkboxContainer}>
          <input
            name={INPUT_NAME.IS_ONLINE}
            readOnly={true}
            className={styles.inputCheckbox}
            onChange={checkedHandler}
            type='checkbox'
            checked={isOnline}
          />
          <span className={styles.checkboxIndicator}></span>
          Онлайн
        </label>
        <TextArea value={comment} handleCahnge={textAreaChangeHandler} />
        <DateRangeContainer
          date={date}
          setDate={setDate}
          isFullDay={isFullDay}
          startTime={startTime}
          endTime={endTime}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          minTime={minTime}
        />
        <div className={styles.checkboxWrap}>
          <label className={styles.checkboxContainer}>
            <input
              name={INPUT_NAME.IS_FULL_DAY}
              readOnly={true}
              className={styles.inputCheckbox}
              onChange={checkedHandler}
              type='checkbox'
            />
            <span className={styles.checkboxIndicator}></span>
            Весь день
          </label>
          <label className={styles.checkboxContainer}>
            <input
              readOnly={true}
              className={styles.inputCheckbox}
              type='checkbox'
              disabled={true}
            />
            <span className={styles.checkboxIndicator}></span>
            Создать событие в Outlook
          </label>
        </div>
        <button
          disabled={
            !title ||
            !place ||
            !selectedApplicant.length ||
            isLoading ||
            !validDate ||
            !isValidTime
          }
          className={styles.btnSave}
          type={'submit'}
        >
          Сохранить
        </button>
      </form>
    </div>
  )
}
