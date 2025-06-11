import { ApplicantCard } from 'services/resumesApi/models'

export const experienceDataValidation = (data: ApplicantCard) => {
  if (data.experiences?.length) {
    return !data.experiences
      .map((item) => {
        if (
          item.companyName !== '' ||
          item.position !== '' ||
          item.startDate !== '' ||
          item.endDate !== ''
        ) {
          if (new Date(item.startDate) > new Date(item.endDate)) {
            return true
          }
          if (item.companyName?.trim() === '') {
            return true
          }
          if (
            item.site !== '' && item.site != null
              ? item.site?.trim() === ''
              : false
          ) {
            return true
          }
          return !(
            item.companyName !== '' &&
            item.position !== '' &&
            item.startDate !== '' &&
            item.endDate !== '' &&
            item.companyName != null &&
            item.position != null &&
            item.startDate != null &&
            item.endDate != null
          )
        } else {
          return false
        }
      })
      .includes(true)
  } else {
    return false
  }
}
