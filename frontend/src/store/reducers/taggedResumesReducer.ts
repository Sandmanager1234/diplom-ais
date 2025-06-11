import { createSlice } from '@reduxjs/toolkit'

import {
  ApplicantCard,
  ApplicantGridCard,
} from '../../services/resumesApi/models'
import { ResumeStatus } from '../../types'
import { resumesApi } from '../../services/resumesApi/resumesApi'
import { SORT_RESUME_STATUS } from '../../data/personalDataConstants'
import { HR } from '../../services/models'

type State = {
  taggedNew: ApplicantGridCard[]
  taggedCommunication: ApplicantGridCard[]
  taggedScreening: ApplicantGridCard[]
  taggedInterview: ApplicantGridCard[]
  taggedCustomerInterview: ApplicantGridCard[]
  taggedCheckSecurity: ApplicantGridCard[]
  taggedSendOffer: ApplicantGridCard[]

  previewApplicantGridCard?: ApplicantGridCard
  cardsToDownload: number
  alreadyLoaded: number
}

const initialState: State = {
  taggedNew: [],
  taggedCommunication: [],
  taggedScreening: [],
  taggedInterview: [],
  taggedCustomerInterview: [],
  taggedCheckSecurity: [],
  taggedSendOffer: [],

  cardsToDownload: 0,
  alreadyLoaded: 0,
}

const containCheck = (
  listOfGridCards: ApplicantGridCard[],
  applicantCardToCheck: ApplicantCard,
  vacancyCheckId: number
) => {
  return !listOfGridCards.find(
    (card) =>
      card.applicant.id === applicantCardToCheck.id &&
      card.vacancyNumber === vacancyCheckId
  )
}

export const taggedResumesSlice = createSlice({
  name: 'taggedResumes',
  initialState: initialState,
  reducers: {
    addTaggedApplicantCard: (
      state,
      action: {
        payload: {
          card: ApplicantCard
        }
      }
    ) => {
      action.payload.card.vacancies.forEach((vacancy, index) => {
        switch (vacancy.state) {
          case ResumeStatus.New:
            if (containCheck(state.taggedNew, action.payload.card, index)) {
              state.taggedNew.push({
                applicant: action.payload.card,
                responsibleHR: null,
                vacancyNumber: index,
              })
              state.cardsToDownload++
            }
            break
          case ResumeStatus.Communication:
            if (
              containCheck(
                state.taggedCommunication,
                action.payload.card,
                index
              )
            ) {
              state.taggedCommunication.push({
                applicant: action.payload.card,
                responsibleHR: null,
                vacancyNumber: index,
              })
              state.cardsToDownload++
            }
            break
          case ResumeStatus.Screening:
            if (
              containCheck(state.taggedScreening, action.payload.card, index)
            ) {
              state.taggedScreening.push({
                applicant: action.payload.card,
                responsibleHR: null,
                vacancyNumber: index,
              })
              state.cardsToDownload++
            }
            break
          case ResumeStatus.Interview:
            if (
              containCheck(state.taggedInterview, action.payload.card, index)
            ) {
              state.taggedInterview.push({
                applicant: action.payload.card,
                responsibleHR: null,
                vacancyNumber: index,
              })
              state.cardsToDownload++
            }
            break
          case ResumeStatus.CustomerInterview:
            if (
              containCheck(
                state.taggedCustomerInterview,
                action.payload.card,
                index
              )
            ) {
              state.taggedCustomerInterview.push({
                applicant: action.payload.card,
                responsibleHR: null,
                vacancyNumber: index,
              })
              state.cardsToDownload++
            }
            break
          case ResumeStatus.CheckSecurity:
            if (
              containCheck(
                state.taggedCheckSecurity,
                action.payload.card,
                index
              )
            ) {
              state.taggedCheckSecurity.push({
                applicant: action.payload.card,
                responsibleHR: null,
                vacancyNumber: index,
              })
              state.cardsToDownload++
            }
            break
          case ResumeStatus.SendOffer:
            if (
              containCheck(state.taggedSendOffer, action.payload.card, index)
            ) {
              state.taggedSendOffer.push({
                applicant: action.payload.card,
                responsibleHR: null,
                vacancyNumber: index,
              })
              state.cardsToDownload++
            }
            break
        }
      })
    },

    setHrAndCreateDate: (
      state,
      action: {
        payload: {
          card: ApplicantCard
          hr: HR | null
          createDate: string
        }
      }
    ) => {
      action.payload.card.vacancies.forEach((vacancy) => {
        switch (vacancy.state) {
          case ResumeStatus.New:
            state.taggedNew.forEach((card, index) => {
              if (
                card.applicant.id === action.payload.card.id &&
                !card.responsibleHR
              ) {
                state.taggedNew[index] = {
                  ...card,
                  responsibleHR: action.payload.hr,
                  createData: action.payload.createDate,
                }
                state.cardsToDownload--
              }
            })
            break
          case ResumeStatus.Communication:
            state.taggedCommunication.forEach((card, index) => {
              if (
                card.applicant.id === action.payload.card.id &&
                !card.responsibleHR
              ) {
                state.taggedCommunication[index] = {
                  ...card,
                  responsibleHR: action.payload.hr,
                  createData: action.payload.createDate,
                }
                state.cardsToDownload--
              }
            })
            break
          case ResumeStatus.Screening:
            state.taggedScreening.forEach((card, index) => {
              if (
                card.applicant.id === action.payload.card.id &&
                !card.responsibleHR
              ) {
                state.taggedScreening[index] = {
                  ...card,
                  responsibleHR: action.payload.hr,
                  createData: action.payload.createDate,
                }
                state.cardsToDownload--
              }
            })
            break
          case ResumeStatus.Interview:
            state.taggedInterview.forEach((card, index) => {
              if (
                card.applicant.id === action.payload.card.id &&
                !card.responsibleHR
              ) {
                state.taggedInterview[index] = {
                  ...card,
                  responsibleHR: action.payload.hr,
                  createData: action.payload.createDate,
                }
                state.cardsToDownload--
              }
            })
            break
          case ResumeStatus.CustomerInterview:
            state.taggedCustomerInterview.forEach((card, index) => {
              if (
                card.applicant.id === action.payload.card.id &&
                !card.responsibleHR
              ) {
                state.taggedCustomerInterview[index] = {
                  ...card,
                  responsibleHR: action.payload.hr,
                  createData: action.payload.createDate,
                }
                state.cardsToDownload--
              }
            })
            break
          case ResumeStatus.CheckSecurity:
            state.taggedCheckSecurity.forEach((card, index) => {
              if (
                card.applicant.id === action.payload.card.id &&
                !card.responsibleHR
              ) {
                state.taggedCheckSecurity[index] = {
                  ...card,
                  responsibleHR: action.payload.hr,
                  createData: action.payload.createDate,
                }
                state.cardsToDownload--
              }
            })
            break
          case ResumeStatus.SendOffer:
            state.taggedSendOffer.forEach((card, index) => {
              if (
                card.applicant.id === action.payload.card.id &&
                !card.responsibleHR
              ) {
                state.taggedSendOffer[index] = {
                  ...card,
                  responsibleHR: action.payload.hr,
                  createData: action.payload.createDate,
                }
                state.cardsToDownload--
              }
            })
            break
        }
      })

      state.cardsToDownload =
        state.cardsToDownload >= 0 ? state.cardsToDownload : 0
    },

    changeApplicantCardTag: (
      state,
      action: {
        payload: {
          card: ApplicantGridCard
          newTag: ResumeStatus
        }
      }
    ) => {
      const applicantGridCard = action.payload.card
      if (
        applicantGridCard.applicant.vacancies[applicantGridCard.vacancyNumber]
          .state !== action.payload.newTag
      ) {
        const vacancy = {
          ...applicantGridCard.applicant.vacancies[
            applicantGridCard.vacancyNumber
          ],
          state: action.payload.newTag,
        }

        const applicant = {
          ...applicantGridCard.applicant,
          vacancies: [
            ...applicantGridCard.applicant.vacancies.slice(
              0,
              applicantGridCard.vacancyNumber
            ),
            vacancy,
            ...applicantGridCard.applicant.vacancies.slice(
              applicantGridCard.vacancyNumber + 1
            ),
          ],
        }

        const card = {
          ...action.payload.card,
          applicant: applicant,
        }
        switch (action.payload.newTag) {
          case ResumeStatus.New:
            state.taggedNew.push(card)
            break
          case ResumeStatus.Communication:
            state.taggedCommunication.push(card)
            break
          case ResumeStatus.Screening:
            state.taggedScreening.push(card)
            break
          case ResumeStatus.Interview:
            state.taggedInterview.push(card)
            break
          case ResumeStatus.CustomerInterview:
            state.taggedCustomerInterview.push(card)
            break
          case ResumeStatus.CheckSecurity:
            state.taggedCheckSecurity.push(card)
            break
          case ResumeStatus.SendOffer:
            state.taggedSendOffer.push(card)
            break
        }
        switch (
          action.payload.card.applicant.vacancies[
            action.payload.card.vacancyNumber
          ].state
        ) {
          case ResumeStatus.New:
            state.taggedNew = state.taggedNew.filter(
              (card) =>
                card.applicant.id !== action.payload.card.applicant.id ||
                card.vacancyNumber !== action.payload.card.vacancyNumber
            )
            break
          case ResumeStatus.Communication:
            state.taggedCommunication = state.taggedCommunication.filter(
              (card) =>
                card.applicant.id !== action.payload.card.applicant.id ||
                card.vacancyNumber !== action.payload.card.vacancyNumber
            )
            break
          case ResumeStatus.Screening:
            state.taggedScreening = state.taggedScreening.filter(
              (card) =>
                card.applicant.id !== action.payload.card.applicant.id ||
                card.vacancyNumber !== action.payload.card.vacancyNumber
            )
            break
          case ResumeStatus.Interview:
            state.taggedInterview = state.taggedInterview.filter(
              (card) =>
                card.applicant.id !== action.payload.card.applicant.id ||
                card.vacancyNumber !== action.payload.card.vacancyNumber
            )
            break
          case ResumeStatus.CustomerInterview:
            state.taggedCustomerInterview =
              state.taggedCustomerInterview.filter(
                (card) =>
                  card.applicant.id !== action.payload.card.applicant.id ||
                  card.vacancyNumber !== action.payload.card.vacancyNumber
              )
            break
          case ResumeStatus.CheckSecurity:
            state.taggedCheckSecurity = state.taggedCheckSecurity.filter(
              (card) =>
                card.applicant.id !== action.payload.card.applicant.id ||
                card.vacancyNumber !== action.payload.card.vacancyNumber
            )
            break
          case ResumeStatus.SendOffer:
            state.taggedSendOffer = state.taggedSendOffer.filter(
              (card) =>
                card.applicant.id !== action.payload.card.applicant.id ||
                card.vacancyNumber !== action.payload.card.vacancyNumber
            )
            break
        }

        const { name } = SORT_RESUME_STATUS.find(
          (s) => s.camelCaseName === action.payload.newTag
        ) as (typeof SORT_RESUME_STATUS)[number]

        resumesApi
          .editStatusApplicant(
            action.payload.card.applicant.vacancies[
              action.payload.card.vacancyNumber
            ].vacancyApplicantId,
            name
          )
          .then(() => {
            const vacancy = {
              ...action.payload.card.applicant.vacancies[
                action.payload.card.vacancyNumber
              ],
            }
            vacancy.state = action.payload.newTag
          })
      }
    },

    setAllTaggedApplicantCardsToUnloaded: (state) => {
      state.cardsToDownload = state.taggedNew.length
      state.cardsToDownload += state.taggedCommunication.length
      state.cardsToDownload += state.taggedScreening.length
      state.cardsToDownload += state.taggedInterview.length
      state.cardsToDownload += state.taggedCustomerInterview.length
      state.cardsToDownload += state.taggedCheckSecurity.length
      state.cardsToDownload += state.taggedSendOffer.length
    },

    setAlreadyLoadedCount: (state, action: { payload: { count: number } }) => {
      state.alreadyLoaded = action.payload.count
    },

    setPreviewApplicantId: (
      state,
      action: { payload: { applicantGridCard: ApplicantGridCard } }
    ) => {
      state.previewApplicantGridCard = action.payload.applicantGridCard
    },

    removePreviewApplicantId: (state) => {
      state.previewApplicantGridCard = undefined
    },

    setPreviewApplicantStatus: (
      state,
      action: { payload: { newTag: ResumeStatus } }
    ) => {
      switch (
        state.previewApplicantGridCard?.applicant.vacancies[
          state.previewApplicantGridCard?.vacancyNumber
        ].state
      ) {
        case ResumeStatus.New:
          state.taggedNew = state.taggedNew.filter(
            (card) =>
              card.applicant.id !==
                state.previewApplicantGridCard?.applicant.id ||
              card.vacancyNumber !==
                state.previewApplicantGridCard?.vacancyNumber
          )
          break
        case ResumeStatus.Communication:
          state.taggedCommunication = state.taggedCommunication.filter(
            (card) =>
              card.applicant.id !==
                state.previewApplicantGridCard?.applicant.id ||
              card.vacancyNumber !==
                state.previewApplicantGridCard?.vacancyNumber
          )
          break
        case ResumeStatus.Screening:
          state.taggedScreening = state.taggedScreening.filter(
            (card) =>
              card.applicant.id !==
                state.previewApplicantGridCard?.applicant.id ||
              card.vacancyNumber !==
                state.previewApplicantGridCard?.vacancyNumber
          )
          break
        case ResumeStatus.Interview:
          state.taggedInterview = state.taggedInterview.filter(
            (card) =>
              card.applicant.id !==
                state.previewApplicantGridCard?.applicant.id ||
              card.vacancyNumber !==
                state.previewApplicantGridCard?.vacancyNumber
          )
          break
        case ResumeStatus.CustomerInterview:
          state.taggedCustomerInterview = state.taggedCustomerInterview.filter(
            (card) =>
              card.applicant.id !==
                state.previewApplicantGridCard?.applicant.id ||
              card.vacancyNumber !==
                state.previewApplicantGridCard?.vacancyNumber
          )
          break
        case ResumeStatus.CheckSecurity:
          state.taggedCheckSecurity = state.taggedCheckSecurity.filter(
            (card) =>
              card.applicant.id !==
                state.previewApplicantGridCard?.applicant.id ||
              card.vacancyNumber !==
                state.previewApplicantGridCard?.vacancyNumber
          )
          break
        case ResumeStatus.SendOffer:
          state.taggedSendOffer = state.taggedSendOffer.filter(
            (card) =>
              card.applicant.id !==
                state.previewApplicantGridCard?.applicant.id ||
              card.vacancyNumber !==
                state.previewApplicantGridCard?.vacancyNumber
          )
          break
      }

      const { name } = SORT_RESUME_STATUS.find(
        (s) => s.camelCaseName === action.payload.newTag
      ) as (typeof SORT_RESUME_STATUS)[number]

      if (
        state.previewApplicantGridCard?.applicant.vacancies[
          state.previewApplicantGridCard?.vacancyNumber
        ].vacancyApplicantId
      )
        resumesApi.editStatusApplicant(
          state.previewApplicantGridCard?.applicant.vacancies[
            state.previewApplicantGridCard?.vacancyNumber
          ].vacancyApplicantId,
          name
        )
    },

    resetData: (state) => {
      state.alreadyLoaded = 0
      state.taggedNew = []
      state.taggedCommunication = []
      state.taggedScreening = []
      state.taggedInterview = []
      state.taggedCustomerInterview = []
      state.taggedCheckSecurity = []
      state.taggedSendOffer = []
      state.cardsToDownload = 0
      state.alreadyLoaded = 0
    },
  },
})

export const {
  addTaggedApplicantCard,
  setHrAndCreateDate,
  setAllTaggedApplicantCardsToUnloaded,
  changeApplicantCardTag,
  setAlreadyLoadedCount,
  setPreviewApplicantId,
  removePreviewApplicantId,
  setPreviewApplicantStatus,
  resetData,
} = taggedResumesSlice.actions

export default taggedResumesSlice.reducer
