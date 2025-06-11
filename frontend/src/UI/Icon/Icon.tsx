import { Suspense, lazy, FC, PropsWithChildren } from 'react'

import { LoaderDots } from 'UI'
import CalendarWithSquare from './Components/CalendarWithSquare'

const ArrowChewronRight = lazy(() => import('./Components/ArrowChewronRight'))
const ArrowChewronRightBlack = lazy(() => import('./Components/ArrowChewronRightBlack'))
const ArrowChewronDown = lazy(() => import('./Components/ArrowChewronDown'))
const ArrowChewronUp = lazy(() => import('./Components/ArrowChewronUp'))
const ArrowExport = lazy(() => import('./Components/ArrowExport'))
const ArrowLogIn = lazy(() => import('./Components/ArrowLogIn'))
const ArrowOfTime = lazy(() => import('./Components/ArrowOfTime'))
const ArrowOpenMiniCalendar = lazy(
  () => import('./Components/ArrowOpenMiniCalendar')
)
const ArrowRight = lazy(() => import('./Components/ArrowRight'))
const ArrowSwitchCalendar = lazy(
  () => import('./Components/ArrowSwitchCalendar')
)
const Bell = lazy(() => import('./Components/Bell'))
const BellPlus = lazy(() => import('./Components/BellPlus'))
const Board = lazy(() => import('./Components/Board'))
const Bookmark = lazy(() => import('./Components/Bookmark'))
const BookmarkChecked = lazy(() => import('./Components/BookmarkChecked'))
const Building = lazy(() => import('./Components/Building'))
const Calendar = lazy(() => import('./Components/Calendar'))
const CalendarSideBar = lazy(() => import('./Components/CalendarSideBar'))
const CheckMark = lazy(() => import('./Components/CheckMark'))
const Clock = lazy(() => import('./Components/Clock'))
const ClockNotification = lazy(() => import('./Components/ClockNotification'))
const Close = lazy(() => import('./Components/Close'))
const ContentUp = lazy(() => import('./Components/ContentUp'))
const Cross = lazy(() => import('./Components/Cross'))
const CrossOption = lazy(() => import('./Components/CrossOption'))
const CrossParticipantOfEvent = lazy(
  () => import('./Components/CrossParticipantOfEvent')
)
const Edit = lazy(() => import('./Components/Edit'))
const EventPlace = lazy(() => import('./Components/EventPlace'))
const EventTime = lazy(() => import('./Components/EventTime'))
const EyeOff = lazy(() => import('./Components/EyeOff'))
const EyeOn = lazy(() => import('./Components/EyeOn'))
const File = lazy(() => import('./Components/File'))
const Filter = lazy(() => import('./Components/Filter'))
const FilePlus = lazy(() => import('./Components/FilePlus'))
const FileProfile = lazy(() => import('./Components/FileProfile'))
const GitHub = lazy(() => import('./Components/GitHub'))
const HeadHunter = lazy(() => import('./Components/HeadHunter'))
const Java = lazy(() => import('./Components/Java'))
const Link = lazy(() => import('./Components/Link'))
const LinkedIn = lazy(() => import('./Components/LinkedIn'))
const Lock = lazy(() => import('./Components/Lock'))
const Logo = lazy(() => import('./Components/Logo'))
const LogoTitled = lazy(() => import('./Components/LogoTitled'))
const Mail = lazy(() => import('./Components/Mail'))
const MailLightGrey = lazy(() => import('./Components/MailLightGrey'))
const MailOpen = lazy(() => import('./Components/MailOpen'))
const MapPin = lazy(() => import('./Components/MapPin'))
const MoreVertical = lazy(() => import('./Components/MoreVertical'))
const Phone = lazy(() => import('./Components/Phone'))
const Plus = lazy(() => import('./Components/Plus'))
const PlusMini = lazy(() => import('./Components/PlusMini'))
const Recipients = lazy(() => import('./Components/Recipients'))
const ResponsibleHr = lazy(() => import('./Components/ResponsibleHr'))
const SettingsSlider = lazy(() => import('./Components/SettingsSlider'))
const SortAscending = lazy(() => import('./Components/SortAscending'))
const SortBy = lazy(() => import('./Components/SortBy'))
const SortDescending = lazy(() => import('./Components/SortDescending'))
const Stack = lazy(() => import('./Components/Stack'))
const Statistics = lazy(() => import('./Components/Statistics/Statistics'))
const Success = lazy(() => import('./Components/Success'))
const Telegram = lazy(() => import('./Components/Telegram'))
const Trash = lazy(() => import('./Components/Trash'))
const UserChecked = lazy(() => import('./Components/UserChecked'))
const UserDefault = lazy(() => import('./Components/UserDefault'))
const UserPlus = lazy(() => import('./Components/UserPlus'))
const Vk = lazy(() => import('./Components/Vk'))
const WhatsApp = lazy(() => import('./Components/WhatsApp'))
const XMarkCircle = lazy(() => import('./Components/XMarkCircle'))
const VacancyPageIcon = lazy(() => import('./Components/VacancyPageIcon'))
const ArrowLogOut = lazy(() => import('./Components/ArrowLogOut'))
const AddVacancy = lazy(() => import('./Components/AddVacancy'))

const IconWrapper: FC<PropsWithChildren<unknown>> = (props) => (
  <Suspense fallback={<LoaderDots />}>{props.children}</Suspense>
)

const Icon = {
  ArrowChewronRight: () => (
    <IconWrapper>
      <ArrowChewronRight />
    </IconWrapper>
  ),
  ArrowChewronRightBlack: () => (
    <IconWrapper>
      <ArrowChewronRightBlack />
    </IconWrapper>
  ),
  ArrowChewronUp: () => (
    <IconWrapper>
      <ArrowChewronUp />
    </IconWrapper>
  ),
  ArrowChewronDown: () => (
    <IconWrapper>
      <ArrowChewronDown />
    </IconWrapper>
  ),
  ArrowExport: () => (
    <IconWrapper>
      <ArrowExport />
    </IconWrapper>
  ),
  ArrowLogIn: () => (
    <IconWrapper>
      <ArrowLogIn />
    </IconWrapper>
  ),
  ArrowOfTime: () => (
    <IconWrapper>
      <ArrowOfTime />
    </IconWrapper>
  ),
  ArrowOpenMiniCalendar: () => (
    <IconWrapper>
      <ArrowOpenMiniCalendar />
    </IconWrapper>
  ),
  ArrowRight: () => (
    <IconWrapper>
      <ArrowRight />
    </IconWrapper>
  ),
  ArrowSwitchCalendar: () => (
    <IconWrapper>
      <ArrowSwitchCalendar />
    </IconWrapper>
  ),
  Bell: () => (
    <IconWrapper>
      <Bell />
    </IconWrapper>
  ),
  BellPlus: () => (
    <IconWrapper>
      <BellPlus />
    </IconWrapper>
  ),
  Board: () => (
    <IconWrapper>
      <Board />
    </IconWrapper>
  ),
  Bookmark: () => (
    <IconWrapper>
      <Bookmark />
    </IconWrapper>
  ),
  BookmarkChecked: () => (
    <IconWrapper>
      <BookmarkChecked />
    </IconWrapper>
  ),
  Building: () => (
    <IconWrapper>
      <Building />
    </IconWrapper>
  ),
  Calendar: () => (
    <IconWrapper>
      <Calendar />
    </IconWrapper>
  ),
  CalendarSideBar: () => (
    <IconWrapper>
      <CalendarSideBar />
    </IconWrapper>
  ),
  CalendarWithSquare: () => (
    <IconWrapper>
      <CalendarWithSquare />
    </IconWrapper>
  ),
  CheckMark: () => (
    <IconWrapper>
      <CheckMark />
    </IconWrapper>
  ),
  Clock: () => (
    <IconWrapper>
      <Clock />
    </IconWrapper>
  ),
  ClockNotification: () => (
    <IconWrapper>
      <ClockNotification />
    </IconWrapper>
  ),
  Close: () => (
    <IconWrapper>
      <Close />
    </IconWrapper>
  ),
  ContentUp: () => (
    <IconWrapper>
      <ContentUp />
    </IconWrapper>
  ),
  Cross: () => (
    <IconWrapper>
      <Cross />
    </IconWrapper>
  ),
  CrossOption: () => (
    <IconWrapper>
      <CrossOption />
    </IconWrapper>
  ),
  CrossParticipantOfEvent: () => (
    <IconWrapper>
      <CrossParticipantOfEvent />
    </IconWrapper>
  ),
  Edit: () => (
    <IconWrapper>
      <Edit />
    </IconWrapper>
  ),
  EventPlace: () => (
    <IconWrapper>
      <EventPlace />
    </IconWrapper>
  ),
  EventTime: () => (
    <IconWrapper>
      <EventTime />
    </IconWrapper>
  ),
  EyeOff: () => (
    <IconWrapper>
      <EyeOff />
    </IconWrapper>
  ),
  EyeOn: () => (
    <IconWrapper>
      <EyeOn />
    </IconWrapper>
  ),
  File: () => (
    <IconWrapper>
      <File />
    </IconWrapper>
  ),
  FilePlus: () => (
    <IconWrapper>
      <FilePlus />
    </IconWrapper>
  ),
  FileProfile: () => (
    <IconWrapper>
      <FileProfile />
    </IconWrapper>
  ),
  Filter: () => (
    <IconWrapper>
      <Filter />
    </IconWrapper>
  ),
  GitHub: () => (
    <IconWrapper>
      <GitHub />
    </IconWrapper>
  ),
  HeadHunter: () => (
    <IconWrapper>
      <HeadHunter />
    </IconWrapper>
  ),
  Java: () => (
    <IconWrapper>
      <Java />
    </IconWrapper>
  ),
  Link: () => (
    <IconWrapper>
      <Link />
    </IconWrapper>
  ),
  LinkedIn: () => (
    <IconWrapper>
      <LinkedIn />
    </IconWrapper>
  ),
  Lock: () => (
    <IconWrapper>
      <Lock />
    </IconWrapper>
  ),
  Logo: () => (
    <IconWrapper>
      <Logo />
    </IconWrapper>
  ),
  LogoTitled: () => (
    <IconWrapper>
      <LogoTitled />
    </IconWrapper>
  ),
  Mail: () => (
    <IconWrapper>
      <Mail />
    </IconWrapper>
  ),
  MailLightGrey: () => (
    <IconWrapper>
      <MailLightGrey />
    </IconWrapper>
  ),
  MailOpen: () => (
    <IconWrapper>
      <MailOpen />
    </IconWrapper>
  ),
  MapPin: () => (
    <IconWrapper>
      <MapPin />
    </IconWrapper>
  ),
  MoreVertical: () => (
    <IconWrapper>
      <MoreVertical />
    </IconWrapper>
  ),
  Phone: () => (
    <IconWrapper>
      <Phone />
    </IconWrapper>
  ),
  Plus: () => (
    <IconWrapper>
      <Plus />
    </IconWrapper>
  ),
  PlusMini: () => (
    <IconWrapper>
      <PlusMini />
    </IconWrapper>
  ),
  Recipients: () => (
    <IconWrapper>
      <Recipients />
    </IconWrapper>
  ),
  ResponsibleHr: () => (
    <IconWrapper>
      <ResponsibleHr />
    </IconWrapper>
  ),
  SettingsSlider: () => (
    <IconWrapper>
      <SettingsSlider />
    </IconWrapper>
  ),
  SortAscending: () => (
    <IconWrapper>
      <SortAscending />
    </IconWrapper>
  ),
  SortBy: () => (
    <IconWrapper>
      <SortBy />
    </IconWrapper>
  ),
  SortDescending: () => (
    <IconWrapper>
      <SortDescending />
    </IconWrapper>
  ),
  Stack: () => (
    <IconWrapper>
      <Stack />
    </IconWrapper>
  ),
  Statistics: () => (
    <IconWrapper>
      <Statistics />
    </IconWrapper>
  ),
  Success: () => (
    <IconWrapper>
      <Success />
    </IconWrapper>
  ),
  Telegram: () => (
    <IconWrapper>
      <Telegram />
    </IconWrapper>
  ),
  Trash: () => (
    <IconWrapper>
      <Trash />
    </IconWrapper>
  ),
  UserChecked: () => (
    <IconWrapper>
      <UserChecked />
    </IconWrapper>
  ),
  UserDefault: () => (
    <IconWrapper>
      <UserDefault />
    </IconWrapper>
  ),
  WhiteUserDefault: () => (
    <IconWrapper>
      <UserDefault strokeColor='white' />
    </IconWrapper>
  ),
  UserPlus: () => (
    <IconWrapper>
      <UserPlus />
    </IconWrapper>
  ),
  Vk: () => (
    <IconWrapper>
      <Vk />
    </IconWrapper>
  ),
  WhatsApp: () => (
    <IconWrapper>
      <WhatsApp />
    </IconWrapper>
  ),
  XMarkCircle: () => (
    <IconWrapper>
      <XMarkCircle />
    </IconWrapper>
  ),
  VacancyPageIcon: () => (
    <IconWrapper>
      <VacancyPageIcon />
    </IconWrapper>
  ),
  ArrowLogOut: () => (
    <IconWrapper>
      <ArrowLogOut />
    </IconWrapper>
  ),
  AddVacancy: () => (
    <IconWrapper>
      <AddVacancy />
    </IconWrapper>
  ),
}

export default Icon
