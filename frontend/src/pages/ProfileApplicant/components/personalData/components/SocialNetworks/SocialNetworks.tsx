import classNames from 'classnames'
import {
  MAP_CONTACT_TYPE_TO_ICON,
  MAP_CONTACT_TYPE_TO_LINK,
} from 'data/personalDataConstants'
import { numberMask } from 'utils/numberMask'
import { Contacts } from 'services/resumesApi/models'
import { getSocialNetworks } from 'utils/getSocialNetworks'

import styles from './SocialNetworks.module.css'

type SocialNetworksProps = {
  contacts: Contacts
}

enum SocialNetworkEnum {
  VK = 'vk',
  TELEGRAM = 'telegram',
  WHATS_APP = 'whats_app',
  LINKED_IN = 'linked_in',
  GIT = 'git',
  HABR = 'habr',
}

const SOCIAL_NETWORKS = ['vk', 'git', 'habr', 'linked_in']

export const SocialNetworks = (props: SocialNetworksProps) => {
  const { contacts } = props

  const getMaskedLink = (type: SocialNetworkEnum, value: string): string => {
    if (SOCIAL_NETWORKS.includes(type)) {
      return value
    } else if (type === 'telegram') {
      return value.slice(1, value.length)
    }
    return value
      .replaceAll(' ', '')
      .replaceAll('-', '')
      .replaceAll('(', '')
      .replaceAll(')', '')
  }

  const socialNetworks = getSocialNetworks(contacts)

  const contactsStyles = classNames({
    [styles.socialNetworks]: socialNetworks.length,
    [styles.socialNetworksNone]: !socialNetworks.length,
  })

  return (
    <div className={styles.contacts}>
      {contacts.map(
        (contact) =>
          (contact.type === 'mobile_phone' && (
            <div className={styles.telephoneNumber} key={contact.id}>
              {MAP_CONTACT_TYPE_TO_ICON[contact.type]}
              {numberMask(contact.value)}
            </div>
          )) ||
          (contact.type === 'e_mail' && (
            <a
              href={`${MAP_CONTACT_TYPE_TO_LINK[contact.type]}${contact.value}`}
              className={styles.mail}
              key={contact.id}
            >
              <div>{MAP_CONTACT_TYPE_TO_ICON[contact.type]}</div>
              <span>{contact.value}</span>
            </a>
          ))
      )}
      <div className={contactsStyles}>
        {socialNetworks.map((contact) => (
          <a
            href={`${MAP_CONTACT_TYPE_TO_LINK[contact.type]}${getMaskedLink(
              contact.type,
              contact.value
            )}`}
            key={contact.id}
            target='_blank'
            rel='noreferrer'
          >
            <span>{MAP_CONTACT_TYPE_TO_ICON[contact.type]}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
