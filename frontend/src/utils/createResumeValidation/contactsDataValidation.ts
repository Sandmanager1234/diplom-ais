import { ApplicantCard } from 'services/resumesApi/models'

export const contactsDataValidation = (data: ApplicantCard) => {
  if ((data?.contacts[0]?.value != undefined && data?.contacts[0]?.value !== '' && data?.contacts[0]?.value.length > 10)
    || (data?.contacts[1]?.value != undefined && data?.contacts[1]?.value !== '' && /[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(data?.contacts[1]?.value))
    || (data?.contacts[2]?.value != undefined && data?.contacts[2]?.value !== '' && /.*\B@(?=\w{5,32}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*/.test(data?.contacts[2]?.value))) {
    if ((data?.contacts[0]?.value != undefined && data?.contacts[1]?.value !== '') ? !(data?.contacts[0]?.value.length > 10) : false) {
      return false
    }
    if ((data?.contacts[1]?.value != undefined && data?.contacts[1]?.value !== '') ? !/[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(data?.contacts[1]?.value) : false) {
      return false
    }
    if ((data?.contacts[2]?.value != undefined && data?.contacts[2]?.value !== '') ? !/.*\B@(?=\w{5,32}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*/.test(data?.contacts[2]?.value) : false) {
      return false
    }
    if ((data?.contacts[3]?.value != undefined && data?.contacts[3]?.value !== '') ? !(data?.contacts[3]?.value.length > 10) : false) {
      return false
    }
    if ((data?.contacts[4]?.value != undefined && data?.contacts[4]?.value !== '') ? !/^(https:\/\/vk\.com\/.{3,})$/.test(data?.contacts[4]?.value) : false) {
      return false
    }
    if ((data?.contacts[5]?.value != undefined && data?.contacts[5]?.value !== '') ? !/https:\/\/habr\.com\/ru\/users\/.{3,}/i.test(data?.contacts[5]?.value) : false) {
      return false
    }
    if ((data?.contacts[6]?.value != undefined && data?.contacts[6]?.value !== '') ? !/^(https:\/\/www\.linkedin\.com\/in\/.*)$/.test(data?.contacts[6]?.value) : false) {
      return false
    }
    if ((data?.contacts[7]?.value != undefined && data?.contacts[7]?.value !== '') ? !/https:\/\/github\.com\/.{3,}/i.test(data?.contacts[7]?.value) : false) {
      return false
    }
    return true
  }
  return false
}