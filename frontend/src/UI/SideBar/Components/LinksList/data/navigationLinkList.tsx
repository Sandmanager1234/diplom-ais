import { Icon } from 'UI/Icon'

export type NavLink = {
  id: number
  src: string
  title: string
  img: JSX.Element
  countOfUnreadNotification?: number
}

export const getNavigationLinkList = (
  countOfUnreadNotification: number,
): Array<NavLink> => [
  {
    id: 0,
    src: '/profile/calendar',
    img: <Icon.UserDefault />,
    title: 'Профиль',
  },
  { id: 1, src: '/resumeBoard', img: <Icon.Board />, title: 'Доска резюме' },
  { id: 2, src: '/', img: <Icon.Stack />, title: 'Резюме' },
  {
    id: 3,
    src: '/vacancies',
    img: <Icon.VacancyPageIcon />,
    title: 'Вакансии',
  },
  {
    id: 4,
    src: '/calendar',
    img: <Icon.CalendarSideBar />,
    title: 'Календарь',
  },
  {
    id: 5,
    src: '/notification',
    img: <Icon.Mail />,
    title: 'Уведомления',
    countOfUnreadNotification: countOfUnreadNotification,
  },
  {
    id: 6,
    src: '/statistics',
    img: <Icon.Statistics />,
    title: 'Аналитика',
  },
]
