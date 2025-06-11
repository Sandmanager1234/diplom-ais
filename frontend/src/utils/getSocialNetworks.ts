import { Contacts } from 'services/resumesApi/models'

const NOT_SOCIAL_NETWORKS = ['mobile_phone', 'e_mail']

export const getSocialNetworks = (contacts: Contacts) => {
  return contacts.filter(({ type }) => !NOT_SOCIAL_NETWORKS.includes(type))
}
